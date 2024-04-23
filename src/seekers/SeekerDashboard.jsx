import React, { useEffect, useState } from "react";
import commonUtil from "../utils/commonUtil.js";
import * as seekerClient from "../seekers/client.ts";
import * as userClient from "../users/client.ts";
import * as jobPostingClient from "../jobPostings/client.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Grid, Box, Typography, Avatar, Card, CardContent, Chip, CardHeader, Link, IconButton,CardActions } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GroupIcon from '@mui/icons-material/Group';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default function SeekerDashboard() {
  const defaultTheme = createTheme();
  const [seekerData, setSeekerData] = React.useState([]);
  const [firstName,setFirstName] = React.useState("");
  const [lastName,setLastName] = React.useState("");
  const [jobPostingFormData, setJobPostingFormData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const[userID,setUserID] = React.useState("");

  const handleExpandClick = (index) => {
    
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        
        
        let CC_LOGIN_TOKENS = commonUtil.getLoginTokens();
        let user_id = null;

        if (CC_LOGIN_TOKENS && CC_LOGIN_TOKENS.length > 0) {
          const key = CC_LOGIN_TOKENS[0];
          user_id = Object.keys(key)[0];
        } else {
          console.error("Not enough tokens present in auth");
          return;
        }
        setUserID(user_id);
        if (user_id) {
          let userResponse = await userClient.getUserById(user_id);
          console.log(user_id);

  
        if (userResponse && userResponse._id === user_id) {
          const queryParams = {
            user: user_id,
          };
          const queryString = new URLSearchParams(queryParams);
  
          let seekerResponse = await seekerClient.getSeekersByFilter(queryString);
  
          setSeekerData(seekerResponse[0]);
          setFirstName(userResponse.firstname);
          setLastName(userResponse.lastname);
          

          const jobQueryParams = {
            applicants: seekerResponse[0]._id
          };
          console.log("jobQueryParams", jobQueryParams);
          const jobPostingQueryString = new URLSearchParams(jobQueryParams).toString();

          let jobPostingResponse = await jobPostingClient.getJobPostingsByFilter(jobPostingQueryString);
          setJobPostingFormData(jobPostingResponse);
          console.log(jobPostingResponse);
          setExpanded(new Array(jobPostingResponse.length).fill(false));
  
         } 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [userID]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {/* <Grid container spacing={2} alignItems="center" pt={5}> */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card raised="true" style={{ padding: "40px", height: "100%" }}>
              <Avatar 
                sx={{ height: "120px", width: "120px", margin: "auto" }}
                src={seekerData && seekerData.profile_picture}
              />
              <CardContent>             
              <Typography gutterBottom variant="h5" component="div">
               {firstName} {lastName}
               </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft:'65px' }}>
                  <LocationOnOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} /> 
                  <Typography variant="body2" color="text.secondary">
                    {seekerData && seekerData.city}, {seekerData && seekerData.state}, {seekerData && seekerData.country}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}> 
                <Typography variant="body2" color="text.secondary" textAlign="justify">
                  {seekerData && seekerData.bio}
                </Typography>
              </Box>
          </CardContent>
            </Card>
          </Grid>
          {jobPostingFormData.map((jobPosting, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card raised={true} style={{ height: "100%", paddingTop: 10 }}>
                <CardHeader title={jobPosting.title+', ' +jobPosting.company} subheader={jobPosting.city + ', ' + jobPosting.state + ', ' + jobPosting.country} />
                <CardContent sx={{ paddingTop: 0 }}>
                  <Chip icon={<LocalAtmIcon />} size="small" label={jobPosting.salary} color="success" />
                  {jobPosting.full_time && (
                    <Chip icon={<WorkOutlineIcon />} sx={{ marginLeft: 1 }} color="primary" size="small" label="Full Time" />
                  )}
                  {jobPosting.remote && (
                    <Chip sx={{ marginLeft: 1 }} color="warning" size="small" label="Remote" />
                  )}
                  {jobPosting.hybrid && (
                    <Chip sx={{ marginLeft: 1 }} color="default" size="small" label="Hybrid" />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
                    <Typography variant="body2" > Openings: {jobPosting.openings}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
                    <Typography variant="body2" > Experience: {jobPosting.experience}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleExpandClick(index)} aria-expanded={expanded[index]} aria-label="show more">
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" paragraph textAlign="justify">
                  <strong>Description:</strong> {jobPosting.description}
                </Typography>
                <Typography variant="body2" paragraph textAlign="justify">
                  <strong>Skills:</strong> {jobPosting.skills.join(',')}
                </Typography>
              </CardContent>
            </Collapse>

              </Card>
            </Grid>
          ))}
        {/* </Grid> */}
      </Container>
    </ThemeProvider>
  );
}
