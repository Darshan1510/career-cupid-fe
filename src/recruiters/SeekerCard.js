import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { getSeekers } from "./client";

function SeekerCard() {
    const [seekers, setSeekers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(seekers.length - 1);
    const [lastDirection, setLastDirection] = useState();
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(seekers.length)
                .fill(0)
                .map((i) => React.createRef()),
        [seekers.length]
    );

    React.useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                setSeekers(await getSeekers());
                setCurrentIndex(seekers.length - 1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [seekers.length]);

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < seekers.length - 1;

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
        if (canSwipe && currentIndex < seekers.length) {
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
                {seekers.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={character.email}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                        <br />
                        <div>
                            <div
                                style={{ backgroundImage: 'url(' + character.profile_picture + ')' }}
                                className='card'
                            >
                                <h3>{character.name}</h3>
                            </div>
                            <br />
                            <div style={{ textAlign: 'left', backgroundColor: 'lightgrey' }}>
                                {/* Job titles should be separated by comma */}
                                <h4>{character.firstname} {character.lastname}</h4>
                                <h5>Seeking roles: {character.job_titles.join(", ")}</h5>
                                <h5>Email: <a target='blank' href={`mailto:${character.email}`}>{character.email}</a></h5>
                                <h5>{character.city}, {character.state}, {character.country}</h5>
                                <h5>Years of Experience: {character.experience}</h5>
                                <h5>Skills: {character.skills.join(", ")}</h5>
                                <h5>Education: {character.education}</h5>
                                <h6>{character.bio}</h6>
                                <h6><a href={character.resume}>View Full Resume</a></h6>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='buttons'>
                <button style={{ backgroundColor: canSwipe ? undefined : '#c3c4d3', color: canSwipe ? 'red' : undefined }} onClick={() => swipe('left')}>Reject</button>
                <button style={{ backgroundColor: canGoBack ? undefined : '#c3c4d3', color: canGoBack ? '#333' : undefined }} onClick={() => goBack()}>Undo</button>
                <button style={{ backgroundColor: canSwipe ? undefined : '#c3c4d3', color: canSwipe ? 'green' : undefined }} onClick={() => swipe('right')}>Accept</button>
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

export default SeekerCard;
