import React, { useEffect } from "react";
import commonUtil from "../utils/commonUtil.js";
import * as recruiterClient from "../recruiters/client.ts";
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
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from "react-router-dom"; 

export default function RecruiterDashboard() {
  const defaultTheme = createTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [jobPostingFormData, setJobPostingFormData] = React.useState([]);
  const [recruiterData, setRecruiterData] = React.useState([]);
  let navigate = useNavigate();
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  const handleExpandClick = (index) => {
    
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const handleEditClick = (jobPostingId) =>{
    navigate(`/job-posting/${jobPostingId}`);
  }
  
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

        if (user_id) {
          let userResponse = await userClient.getUserById(user_id);
          console.log(user_id);

          if (userResponse && userResponse._id === user_id) {
            const queryParams = {
              user: user_id,
            };
            const queryString = new URLSearchParams(queryParams).toString();

            let recruiterResponse = await recruiterClient.getRecruitersByFilter(queryString);

            setRecruiterData(recruiterResponse[0]);
            setFirstName(userResponse.firstname);
            setLastName(userResponse.lastname);

            const jobQueryParams = {
              recruiterIds: recruiterResponse[0]._id
            };
            console.log("jobQueryParam",jobQueryParams);
            const jobPostingQueryString = new URLSearchParams(jobQueryParams);

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
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {/* <Grid container spacing={2} alignItems="center" pt={5}> */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card raised={true} style={{ padding: "40px", height: "100%",marginTop:4  }}>
              <Avatar
                sx={{ height: "120px", width: "120px", margin: "auto" }}
                src={recruiterData && recruiterData.profile_picture}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {firstName} {lastName}
                </Typography>
                <Typography color="text.secondary">Recruiter at {recruiterData && recruiterData.company}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
                  <LocationOnOutlinedIcon color="secondary" fontSize="small" sx={{ marginRight: 1 }} />
                  <Typography variant="body2" >
                    {recruiterData && recruiterData.city}, {recruiterData && recruiterData.state}, {recruiterData && recruiterData.country}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
                  <EmailOutlinedIcon color="secondary" fontSize="small" sx={{ marginRight: 1 }} />
                  <Link href={`mailto:${recruiterData && recruiterData.email}`} color="inherit" underline="hover">
                    {recruiterData && recruiterData.email}
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
                  <LanguageOutlinedIcon color="secondary" fontSize="small" sx={{ marginRight: 1 }} />
                  <Link href={recruiterData && recruiterData.website} color="inherit" underline="hover" target="_blank" rel="noopener noreferrer">
                    {recruiterData && recruiterData.website}
                  </Link>
                </Box>
              </CardContent>
              <CardActions>
                    <IconButton href="/recruiters/edit">  
                      <EditNoteOutlinedIcon /> 
                    </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Typography sx={{paddingTop:2,marginLeft:1}} variant="h5">Jobs Posted</Typography>
             <Grid container spacing={2} alignItems="left" pt={3}>
          {jobPostingFormData.map((jobPosting, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card raised={true} style={{ height: "100%", paddingTop: 7,paddingLeft:3 }}>
                <CardHeader title={jobPosting.title} subheader={jobPosting.city + ', ' + jobPosting.state + ', ' + jobPosting.country} />
                <CardContent sx={{ paddingLeft: 1,paddingTop:0 }}>
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
                    <Typography variant="body2" > <strong>Openings:</strong> {jobPosting.openings}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
                    <Typography variant="body2"> <strong>Experience: </strong> {jobPosting.experience} years
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton onClick={()=>handleEditClick(jobPosting._id)}>  
                      <EditNoteOutlinedIcon /> 
                    </IconButton>
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
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
