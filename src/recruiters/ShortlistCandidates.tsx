import React, { useState, useEffect } from "react";
import { shortlistSeeker } from "../jobPostings/client";
import { getSeekersByFilter } from "../seekers/client";
import * as userClient from "../users/client";
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
import { useParams } from "react-router-dom";
import { getJobPostingById } from "../jobPostings/client";

const ShortlistCandidates = () => {
  const [seekers, setSeekers] = useState([]);
  const [selectedSeeker, setSelectedSeeker] = useState<any>(null);
  const [lastJob, setLastJob] = useState<any>(null);
  const { jobPostingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const job: any = await getJobPostingById(String(jobPostingId));
        console.log("Job posting:", job)
        setLastJob(job);
        const seekersData: any = await getSeekersByFilter(new URLSearchParams(`seekerIds=${job.applicants}`));
        console.log("Seekers data:", seekersData);
        const userIds = seekersData.map((seeker: any) => seeker.user);
        console.log("User IDs:", userIds);
        const users: any = await userClient.getUsersByFilter(
          new URLSearchParams(`userIds=${userIds.join(",")}`)
        );
        const userMap: any = {};
        users.forEach((user: any) => (userMap[user._id] = user));
        const seekerList: any = seekersData.map((seeker: any) => {
          const user = userMap[seeker.user];
          delete user._id;
          return { ...seeker, ...user };
        });
        setSeekers(seekerList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobPostingId]);

  const handleJobClick = (job: any) => {
    setSelectedSeeker(job);
  };

  const handleShortlistClick = async () => {
    // console.log("Shortlisting for job:", selectedSeeker);
    const response: any = await shortlistSeeker(selectedSeeker._id, jobPostingId);
    if (response) {
      setLastJob(response);
    }
    alert("Shortlisted the selected candidate!");
  };

  return (
    <div style={{ display: "flex" }} className="mt-3 m-5">
      {/* Left pane for job listings */}
      <div style={{ flex: "0 1 20%", overflow: "auto" }}>
        <Typography style={{ color: "grey" }} variant="h6">
          Click on a seeker to view details
        </Typography>
        <List>
          {seekers.map((seeker: any) => (
            <ListItem
              key={seeker._id}
              onClick={() => handleJobClick(seeker)}
              className="shadow-sm"
              component={Button}
              style={{ textTransform: "none" }}
            >
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" style={{ color: "grey" }}>
              Please select a candidate to view details.
            </Typography>
          </div>
        )}
        {selectedSeeker && (
          <Paper style={{ padding: 20 }}>
            <Typography variant="h4">
              {selectedSeeker.firstname} {selectedSeeker.lastname}
            </Typography>
            <Typography variant="subtitle1">
              {selectedSeeker.city}, {selectedSeeker.state}, {selectedSeeker.country}
            </Typography>
            <br />
            <Typography variant="body1">{selectedSeeker.bio}</Typography>
            <br />
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{selectedSeeker.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Seeking roles:</strong>
                  </td>
                  <td>{selectedSeeker.job_titles.join(", ")}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Skillset:</strong>
                  </td>
                  <td>
                    {selectedSeeker.skills.map((skill: any, index: number) => (
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
                    <strong>Education:</strong>
                  </td>
                  <td>{selectedSeeker.education}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Experience:</strong>
                  </td>
                  <td>{selectedSeeker.experience} years</td>
                </tr>
                <tr>
                  <td>
                    <strong>Link to detailed resume:</strong>&nbsp;
                  </td>
                  <td>
                    <a href={selectedSeeker.resume} rel="noreferrer" target="_blank">
                      Resume
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Shortlist button - enabled only if the seeker hasn't been shortlisted */}
            {lastJob && !lastJob.shortlisted_applicants.includes(selectedSeeker._id) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleShortlistClick}
                style={{ marginTop: 20, textTransform: "none" }}
                disableElevation
              >
                Shortlist
              </Button>) : <button
                className="btn btn-primary btn-outlined"
                disabled
                style={{ marginTop: 20 }}
              >
              Shortlisted
            </button>}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default ShortlistCandidates;
