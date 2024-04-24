import React, { useState, useEffect } from "react";
import { applyJob, getSeekersByFilter } from "./client";
import { getJobPostingsByFilter } from "../jobPostings/client";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import { AuthContext } from "../AuthContext";

const ApplyJobs = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const user: any = React.useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = {
        user: user._id,
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const seekers: any = await getSeekersByFilter(queryString);

      try {
        const queryParams = {
          skills: seekers[0].skills,
        };
        const queryString = new URLSearchParams(queryParams).toString();
        console.log("Query string:", queryString);
        const jobPostingsData: any = await getJobPostingsByFilter(queryString);
        setJobPostings(jobPostingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user._id]);

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  };

  const handleApplyClick = async () => {
    // console.log("Applying for job:", selectedJob);
    const seekers: any = await getSeekersByFilter(
      new URLSearchParams(`userIds=${user._id}`)
    );

    const response = await applyJob(seekers[0], selectedJob._id);
    if (response) {
      setSelectedJob(response);
    }
    alert("Thanks for applying!");
  };

  return (
    <div style={{ display: "flex" }} className="mt-3 m-5">
      {/* Left pane for job listings */}
      <div style={{ flex: "0 1 20%", overflow: "auto" }}>
        <Typography style={{ color: "grey" }} variant="h6">
          Click on a job to view details
        </Typography>
        <List>
          {jobPostings.map((jobPosting: any) => (
            <ListItem
              key={jobPosting._id}
              onClick={() => handleJobClick(jobPosting)}
              className="shadow-sm"
              component={Button}
              style={{ textTransform: "none" }}
            >
              <ListItemAvatar>
                <Avatar alt={jobPosting.company} src={jobPosting.company_logo} />
              </ListItemAvatar>
              <ListItemText
                primary={jobPosting.title}
                secondary={
                  <div>
                    {jobPosting.company}
                    <br />
                    {jobPosting.city}, {jobPosting.state}, {jobPosting.country}
                  </div>
                }
                secondaryTypographyProps={{ component: "div" }}
              />
            </ListItem>
          ))}
        </List>
      </div>

      {/* Right pane for detailed job preview */}
      <div style={{ flex: 1, marginLeft: 20 }}>
        {!selectedJob && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" style={{ color: "grey" }}>
              Please select a job to view details.
            </Typography>
          </div>
        )}
        {selectedJob && (
          <Paper style={{ padding: 20 }} className="border border-1">
            <Typography variant="h4">{selectedJob.title}</Typography>
            <Typography variant="subtitle1">{selectedJob.company}</Typography>
            <br />
            <Typography variant="body1">{selectedJob.description}</Typography>
            <br />
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Location:</strong>
                  </td>
                  <td>
                    {selectedJob.city}, {selectedJob.state}, {selectedJob.country}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Salary:</strong>
                  </td>
                  <td>{selectedJob.salary ? selectedJob.salary : "Not specified"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Remote:</strong>
                  </td>
                  <td>{selectedJob.remote ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hybrid:</strong>
                  </td>
                  <td>{selectedJob.hybrid ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Full-time:</strong>
                  </td>
                  <td>{selectedJob.full_time ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Number of Openings:</strong>&nbsp;
                  </td>
                  <td>{selectedJob.openings ? selectedJob.openings : "Not specified"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Posted on:</strong>
                  </td>
                  <td>{new Date(selectedJob.created_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Skills:</strong>
                  </td>
                  <td>
                    {selectedJob.skills.map((skill: any, index: number) => (
                      <Chip
                        key={index}
                        label={skill}
                        variant="outlined"
                        style={{ marginRight: 5 }}
                      />
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Minimum Experience:</strong>
                  </td>
                  <td>{selectedJob.experience} years</td>
                </tr>
              </tbody>
            </table>
            {/* Apply button - enabled only if the seeker hasn't applied */}
            {!selectedJob.applicants.includes(user._id) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyClick}
                style={{ marginTop: 20, textTransform: "none" }}
                disableElevation
              >
                Apply
              </Button>
            ) : <button
              className="btn btn-primary btn-outlined"
              disabled

              style={{ marginTop: 20 }}
            >
              Applied
            </button>}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default ApplyJobs;
