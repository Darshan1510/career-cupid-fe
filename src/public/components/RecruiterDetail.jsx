import React, { useEffect, useState } from "react";
import commonUtil from "../../utils/commonUtil.js";
import * as recruiterClient from "../../recruiters/client.ts";
import * as userClient from "../../users/client.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Grid, Box, Typography, Avatar, Card, CardContent, IconButton, CardActions, Link } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Copyright from "../../components/common/Copyright";





export default function RecruiterDetail({ username }) {
  const [expanded, setExpanded] = React.useState(false);
  const defaultTheme = createTheme();
  const [recruiterData, setRecruiterData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userBool, setUserBool] = React.useState(false);
  

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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 

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
          
        }
          const userParams = {
            username: username,
          };
          const userQueryString = new URLSearchParams(userParams);

          let userResponse = await userClient.getUsersByFilter(userQueryString);

          console.log("userResponse",userResponse);
          if (userResponse) {
            const queryParams = {
              user: userResponse[0]._id,
            };
            
            const queryString = new URLSearchParams(queryParams);

            let recruiterResponse = await recruiterClient.getRecruitersByFilter(
              queryString
            );
            console.log("user_id",user_id);           
             console.log("user_id2",userResponse[0]._id);


            if(user_id===userResponse[0]._id) {
              setUserBool(true);
            }
          
            setRecruiterData(recruiterResponse[0]);
            setFirstName(userResponse[0].firstname);
            setLastName(userResponse[0].lastname);
            console.log(recruiterData);
          }
        }  catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          pt={10}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card raised={true} style={{ height: "100%",paddingTop:30 }}>

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
              <CardActions disableSpacing>
                  {userBool && ( 
                    <IconButton href="/recruiters/edit">  
                      <EditNoteOutlinedIcon /> 
                    </IconButton>
                  )}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" paragraph textAlign="justify">
                    {recruiterData && recruiterData.bio}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
