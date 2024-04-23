import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { getJobPostings } from "./client";

function JobPostingCard() {
    const [jobPostings, setJobPostings] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState();
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(jobPostings.length)
                .fill(0)
                .map((i) => React.createRef()),
        [jobPostings.length]
    );

    React.useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const jobPostings = await getJobPostings();
                setJobPostings(jobPostings);
                setCurrentIndex(jobPostings.length - 1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [jobPostings.length, currentIndex]);

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < jobPostings.length - 1;

    const canSwipe = currentIndex >= 0;

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name, idx) => {
        // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < jobPostings.length) {
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        await childRefs[newIndex].current.restoreCard();
    };

    return (
        <div>
            <link
                href='https://fonts.googleapis.com/css?family=Damion&display=swap'
                rel='stylesheet'
            />
            <link
                href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
                rel='stylesheet'
            />
            <div className='cardContainer'>
                {jobPostings.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={character._id}
                        onSwipe={(dir) => swiped(dir, character.company, index)}
                        onCardLeftScreen={() => outOfFrame(character.company, index)}
                    >
                        <br />
                        <div>
                            <div
                                style={{ backgroundImage: 'url(' + character.company_logo + ')' }}
                                className='card'
                            >
                            </div>
                            <br />
                            <div style={{ textAlign: 'left', backgroundColor: 'lightgrey' }}>
                                <h4>{character.company}</h4>
                                <h5>Position: {character.title} | Industry: {character.industry}</h5>
                                <h5>Location: {character.city}, {character.state}, {character.country}</h5>
                                <h5>Posted on: {character.created_at}</h5>
                                <h5>Years of Experience: {character.experience}</h5>
                                <h5>Skills: {character.skills.join(", ")}</h5>
                                <h5>Salary: {character.salary ? character.salary : "Not specified"}</h5>
                                <h5>Position Type: {character.remote ? "Remote" : ""} {character.hybrid ? "Hybrid" : ""} {character.full_time ? "Full Time" : "Part Time"}</h5>
                                <h5>Openings: {character.openings}</h5>
                                <h6>{character.description}</h6>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='buttons'>
                <button style={{ backgroundColor: canSwipe ? undefined : '#c3c4d3', color: canSwipe ? 'red' : undefined }} onClick={() => swipe('left')}>Skip</button>
                <button style={{ backgroundColor: canGoBack ? undefined : '#c3c4d3', color: canGoBack ? '#333' : undefined }} onClick={() => goBack()}>Undo</button>
                <button style={{ backgroundColor: canSwipe ? undefined : '#c3c4d3', color: canSwipe ? 'green' : undefined }} onClick={() => swipe('right')}>Apply Job</button>
            </div>
            {
                lastDirection ? (
                    <h2 key={lastDirection} className='infoText'>
                        You swiped {lastDirection}
                    </h2>
                ) : (
                    <h2 className='infoText'>
                        Swipe a card or press a button to get Restore Card button visible!
                    </h2>
                )
            }
        </div >
    );
}

export default JobPostingCard;
