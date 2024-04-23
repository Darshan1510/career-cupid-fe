import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Avatar,Card,CardContent, IconButton} from "@mui/material";
import commonUtil from "../../utils/commonUtil.js";
import * as seekerClient from "../../seekers/client.ts";
import * as userClient from "../../users/client.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Divider from "@mui/material/Divider";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function SeekerDetail() {
  const defaultTheme = createTheme();
  const [seekerData, setSeekerData] =  React.useState([]);
  const [firstName,setFirstName] = React.useState("");
  const [lastName,setLastName] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let CC_LOGIN_TOKENS = commonUtil.getLoginTokens();
        let user_id = null;

        if (CC_LOGIN_TOKENS && CC_LOGIN_TOKENS.length > 0) {
          const key = CC_LOGIN_TOKENS[0];
          user_id = Object.keys(key)[0];
          console.log("key", user_id);
        } else {
          console.error("Not enough tokens present in auth");
          return;
        }

        if (user_id) {
          let userResponse = await userClient.getUserById(user_id);
          console.log(user_id);

          if (userResponse && userResponse._id === user_id) {
            const queryParams = {
              user: user_id,
            };
            const queryString = new URLSearchParams(queryParams).toString();

            let seekerResponse = await seekerClient.getSeekersByFilter(
              queryString
            );

           
            setSeekerData(seekerResponse[0]);
            setFirstName(userResponse.firstname);
            setLastName(userResponse.lastname);
            console.log(seekerData);

          }
        }
        

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
  
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline /> 
        <Grid  sx={{
            marginTop: 8}} container spacing={2}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}>
            <Grid container alignItems="center">
            <Grid item xs={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
                    <AccountCircleOutlinedIcon fontSize="large" color="primary" sx={{ marginRight: 1 }} />
                    <Typography variant="h5">About</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={7} sx={{ textAlign: 'right' }}>
                  <IconButton color="primary" href="/seekerEdit">
                    <EditNoteOutlinedIcon fontSize="large" color="action" />
                  </IconButton>
                </Grid>
          </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginY: 2, borderBottom: '1px solid black', width: '80%',marginLeft:10 }} />
            </Grid>

          <Box component="form" sx={{mt: 2, border: '1px solid lightgray', 
                  padding: 2,width: '80%',marginLeft:10}}>
          
            <Grid  container spacing={1}>
            <Grid container >
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'left' }}>
                   <EmailOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}} />
                    <Typography  variant="h7">Email</Typography>
                    </Box>
                    </Grid>
                  </Grid>
                    <Grid item sx={{ marginLeft: 5.5}} >
                    <span style={{ cursor: 'default' }}>
                      <a style={{ textDecoration: 'none', color: "gray" }} href={`mailto:${seekerData && seekerData.email}`}>
                        <Typography
                          fontSize={15}
                          onMouseEnter={(e) => (e.target.style.textDecoration = 'underline', e.target.style.color = 'blue')}
                          onMouseLeave={(e) => (e.target.style.textDecoration = 'none', e.target.style.color = 'gray')} >
                          {seekerData && seekerData.email}
                        </Typography>
                      </a>
                    </span>
                  </Grid>
                </Grid> 
            </Box>


            <Box component="form" sx={{ border: '1px solid lightgray', 
                  padding: 2,width: '80%',marginLeft:10}}>
            <Grid container spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{  textAlign: 'left'}}>
                  <SchoolOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}} />
                  <Typography  variant="h7">Education</Typography>
                </Box>
              </Grid> 
          </Grid>
          <Grid item sx={{ marginLeft: 5.5}} >
          <Typography color={"GrayText"} fontSize={15}>{seekerData && seekerData.education}</Typography>

          </Grid>
        </Grid>  

    </Box>

    <Box component="form" sx={{ border: '1px solid lightgray', 
                  padding: 2,width: '80%',marginLeft:10}}>
          
            <Grid container spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{  textAlign: 'left'}}>
                  <WorkOutlineOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}}/>
                  <Typography  variant="h7">Experience</Typography>
                </Box>
              </Grid> 
          </Grid>
           <Grid item sx={{ marginLeft: 5.5}} >
            <Typography color={"GrayText"} fontSize={15} >{seekerData && seekerData.experience} years</Typography>
            </Grid>

        </Grid>  

    </Box>
    <Box component="form" sx={{ border: '1px solid lightgray', 
                  padding: 2,width: '80%',marginLeft:10}}>
          
            <Grid  container spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{  textAlign: 'left'}}>
                  <FeedOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}}/>
                  <Typography variant="h7">Resume</Typography>
                  
                </Box>
              </Grid> 
          </Grid>
                     <Grid item sx={{ marginLeft: 5.5}} >
                      <span style={{ cursor: 'default' }}>
                    <a style={{textDecoration:'none',color:"gray"}} target="_blank" rel="noopener noreferrer"
                     href={seekerData && seekerData.resume}>
                      <Typography
                        fontSize={15}
                        onMouseEnter={(e) => (e.target.style.textDecoration = 'underline',e.target.style.color='blue')}
                        onMouseLeave={(e) => (e.target.style.textDecoration = 'none',e.target.style.color='gray')} >
                        {seekerData && seekerData.resume}
                      </Typography>
                    </a>
                  </span>
                </Grid>
        </Grid>  

    </Box>
    <Box component="form" sx={{ border: '1px solid lightgray', padding: 2, width: '80%', marginLeft: 10 }}>
      <Grid container spacing={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'left' }}>
            <ListAltOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}} />
            <Typography  variant="h7">Job Titles</Typography>
          </Box>
        </Grid> 
      </Grid>

      <Grid item sx={{ marginLeft: 5.5}} >
        <Typography color={"GrayText"}  fontSize={15}>{(seekerData && seekerData.job_titles) ? seekerData.job_titles.join(', ') : ''}</Typography>
          </Grid>
      </Grid>
    </Box>


    <Box component="form" sx={{ border: '1px solid lightgray', 
                  padding: 2,width: '80%',marginLeft:10}}>
          
            <Grid container spacing={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{  textAlign: 'left'}}>
                  <EngineeringOutlinedIcon fontSize="small" color="primary" sx={{ marginRight: 2,marginLeft:2}}/>
                  <Typography variant="h7">Skills</Typography>
                </Box>
              </Grid> 
          </Grid>
          <Grid item sx={{ marginLeft: 5.5}} >

          <Typography color={"GrayText"}  fontSize={15}>{(seekerData && seekerData.skills) ? seekerData.skills.join(', ') : ''}</Typography>
            </Grid>
        </Grid>  

    </Box>
    </Box>
    </Grid>
    </Grid>
    </Container>
    </ThemeProvider>
  );
}
