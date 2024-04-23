import React from "react";
import * as seekerClient from "../../seekers/client";
import * as userClient from "../../users/client";
import { Card, CardContent, Typography, Avatar, Chip } from "@mui/material";

export default function SeekerList() {
  let [seekerProfiles, setSeekerProfiles] = React.useState([]);

  React.useEffect(() => {
    const fetchSeekerProfiles = async () => {
      const seekers = await seekerClient.getSeekersByFilter(new URLSearchParams());

      const userIds = seekers.map((seeker) => seeker.user);
      const users = await userClient.getUsersByFilter(
        new URLSearchParams(`userIds=${userIds.join(",")}`)
      );
      const userMap = {};
      users.forEach((user) => (userMap[user._id] = user));
      const seekerList = seekers.map((seeker) => {
        const user = userMap[seeker.user];
        delete user._id;
        return { ...seeker, ...user };
      });

      setSeekerProfiles(seekerList);
    };

    fetchSeekerProfiles();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Seekers</h2>
      <div className="row">
        {seekerProfiles && seekerProfiles.length > 0 ? (
          seekerProfiles.map((seeker, index) => (
            <div key={index} className="col-md-6 mb-4">
              <SeekerProfile seeker={seeker} />
            </div>
          ))
        ) : (
          <div>No seekers found</div>
        )}
      </div>
    </div>
  );
}

const SeekerProfile = ({ seeker }) => {
  return (
    <Card sx={{ maxWidth: 600, marginBottom: 2, height: "100%" }}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <Avatar src={seeker.profile_picture} alt={seeker.email} />
          <Typography variant="h6" component="div" sx={{ marginLeft: 1 }}>
            {seeker.firstname} {seeker.lastname}
          </Typography>
        </div>
        <Typography variant="body1" gutterBottom>
          <b>Email:</b> {seeker.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b> Location:</b> {seeker.city}, {seeker.state}, {seeker.country}
        </Typography>
       
        <Typography variant="body1" gutterBottom>
          <b> Education:</b> {seeker.education}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b> Experience:</b> {seeker.experience} years
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b> Bio:</b> {seeker.bio}
        </Typography>
        <div>
          <b> Skills: </b>
          {seeker.skills.map((skill, index) => (
            <Chip key={index} label={skill} variant="outlined" style={{ marginRight: 5 }} />
          ))}
        </div>
        <div className="mt-1">
          <b> Job Titles: </b>
          {seeker.job_titles.map((title, index) => (
            <Chip key={index} label={title} variant="outlined" style={{ marginRight: 5 }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
