import React, { useState, useEffect } from "react";
import { applyJob, getJobPostings } from "./client";
import { List, ListItem, ListItemText, Typography, Paper, Button, ListItemAvatar, Avatar } from "@mui/material";

const ApplyJobs = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobPostingsData: any = await getJobPostings();
                setJobPostings(jobPostingsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleJobClick = (job: any) => {
        setSelectedJob(job);
    };

    const handleApplyClick = () => {
        // console.log("Applying for job:", selectedJob);
        applyJob(selectedJob._id);
        alert("Thanks for applying!");
    };

    return (
        <div style={{ display: "flex" }}>
            {/* Left pane for job listings */}
            <div style={{ flex: "0 1 20%", overflow: "auto" }}>
                <Typography style={{ color: "grey" }} variant="h6">Click on a job to view details</Typography>
                <List>
                    {jobPostings.map((jobPosting: any) => (
                        <ListItem key={jobPosting._id} button onClick={() => handleJobClick(jobPosting)}>
                            <ListItemAvatar>
                                <Avatar alt={jobPosting.company} src={jobPosting.company_logo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={jobPosting.title}
                                secondary={`${jobPosting.company} - ${jobPosting.city}, ${jobPosting.state}, ${jobPosting.country}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Right pane for detailed job preview */}
            <div style={{ flex: 1, marginLeft: 20 }}>
                {!selectedJob && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Typography variant="body1" style={{ color: "grey" }}>Please select a job to view details.</Typography>
                    </div>
                )}
                {selectedJob && (
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h4">{selectedJob.title}</Typography>
                        <Typography variant="subtitle1">{selectedJob.company}</Typography>
                        <br />
                        <Typography variant="body1">
                            {selectedJob.description}
                        </Typography>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Location:</strong></td>
                                    <td>{selectedJob.city}, {selectedJob.state}, {selectedJob.country}</td>
                                </tr>
                                <tr>
                                    <td><strong>Salary:</strong></td>
                                    <td>{selectedJob.salary ? selectedJob.salary : "Not specified"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Remote:</strong></td>
                                    <td>{selectedJob.remote ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Hybrid:</strong></td>
                                    <td>{selectedJob.hybrid ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Full-time:</strong></td>
                                    <td>{selectedJob.full_time ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Number of Openings:</strong></td>
                                    <td>{selectedJob.openings ? selectedJob.openings : "Not specified"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Posted on:</strong></td>
                                    <td>{selectedJob.created_at}</td>
                                </tr>
                                <tr>
                                    <td><strong>Skills:</strong></td>
                                    <td>{selectedJob.skills.join(", ")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Minimum Experience:</strong></td>
                                    <td>{selectedJob.experience} years</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Apply button */}
                        <Button variant="contained" color="primary" onClick={handleApplyClick} style={{ marginTop: 20 }}>
                            Apply
                        </Button>
                    </Paper>
                )}

            </div>
        </div>
    );
}

export default ApplyJobs;
