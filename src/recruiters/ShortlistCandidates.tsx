import React, { useState, useEffect } from "react";
import { shortlistSeeker, getSeekers } from "./client";
import { List, ListItem, ListItemText, Typography, Paper, Button, ListItemAvatar, Avatar } from "@mui/material";

const ShortlistCandidates = () => {
    const [seekers, setSeekers] = useState([]);
    const [selectedSeeker, setSelectedSeeker] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seekersData: any = await getSeekers();
                setSeekers(seekersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleJobClick = (job: any) => {
        setSelectedSeeker(job);
    };

    const handleShortlistClick = () => {
        // console.log("Shortlisting for job:", selectedSeeker);
        shortlistSeeker(selectedSeeker._id);
        alert("Shortlisted the selected candidate!");
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Left pane for job listings */}
            <div style={{ flex: "0 1 20%", overflow: "auto" }}>
                <Typography style={{ color: "grey" }} variant="h6">Click on a seeker to view details</Typography>
                <List>
                    {seekers.map((seeker: any) => (
                        <ListItem key={seeker._id} button onClick={() => handleJobClick(seeker)}>
                            <ListItemAvatar>
                                <Avatar alt={seeker.firstname} src={seeker.profile_picture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${seeker.firstname} ${seeker.lastname}`}
                                secondary={`${seeker.city}, ${seeker.state}, ${seeker.country}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Right pane for detailed job preview */}
            <div style={{ flex: 1, marginLeft: 20 }}>
                {!selectedSeeker && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Typography variant="body1" style={{ color: "grey" }}>Please select a candidate to view details.</Typography>
                    </div>
                )}
                {selectedSeeker && (
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h4">{selectedSeeker.firstname} {selectedSeeker.lastname}</Typography>
                        <Typography variant="subtitle1">{selectedSeeker.city}, {selectedSeeker.state}, {selectedSeeker.country}</Typography>
                        <br />
                        <Typography variant="body1">
                            {selectedSeeker.bio}
                        </Typography>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>{selectedSeeker.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Seeking roles:</strong></td>
                                    <td>{selectedSeeker.job_titles.join(", ")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Skillset:</strong></td>
                                    <td>{selectedSeeker.skills.join(", ")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Education:</strong></td>
                                    <td>{selectedSeeker.education}</td>
                                </tr>
                                <tr>
                                    <td><strong>Experience:</strong></td>
                                    <td>{selectedSeeker.experience} years</td>
                                </tr>
                                <tr>
                                    <td><strong>Link to detailed resume:</strong></td>
                                    <td><a href={selectedSeeker.resume} rel="noreferrer" target="_blank">Resume</a></td>
                                </tr>
                            </tbody>
                        </table>

                        <Button variant="contained" color="primary" onClick={handleShortlistClick} style={{ marginTop: 20 }}>
                            Shortlist
                        </Button>
                    </Paper>
                )}

            </div>
        </div>
    );
}

export default ShortlistCandidates;
