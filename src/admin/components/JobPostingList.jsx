import React from "react";
import { Card, CardContent, Typography, Avatar, Chip } from "@mui/material";
import * as client from "../../jobPostings/client";

export default function JobPostingList() {
  let [jobPostings, setJobPostings] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let jobPostings = await client.getAllJobPostings();
      setJobPostings(jobPostings);
    })();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Job Postings</h2>
      <div className="row">
        {jobPostings && jobPostings.length > 0 ? (
          jobPostings.map((job, index) => (
            <div key={index} className="col-md-6 mb-4">
              <JobPosting job={job} />
            </div>
          ))
        ) : (
          <div className="text-center">No job postings found</div>
        )}
      </div>
    </div>
  );
}

const JobPosting = ({ job }) => {
  return (
    <Card sx={{ maxWidth: 600, marginBottom: 2, height: "100%" }}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <Avatar src={job.company_logo} alt={job.company} />
          <Typography variant="h6" component="div" sx={{ marginLeft: 1 }}>
            {job.company}
          </Typography>
        </div>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
          {job.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Location:</b> {job.city}, {job.state}, {job.country}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Salary:</b> ${job.salary}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Industry:</b> {job.industry}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Openings:</b> {job.openings}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Remote:</b> {job.remote ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Full Time:</b> {job.full_time ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Hybrid:</b> {job.hybrid ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <b>Experience:</b> {job.experience} years
        </Typography>
        <div>
          <b>Skills: </b>
          {job.skills.map((skill, index) => (
            <Chip key={index} label={skill} variant="outlined" style={{ marginRight: 5 }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
