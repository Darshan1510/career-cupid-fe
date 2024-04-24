import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Copyright from "../../components/common/Copyright";
import * as recruiterClient from "../../recruiters/client.ts";
import * as userClient from "../../users/client.ts";
import commonUtil from "../../utils/commonUtil.js";

export default function RecruiterDetail({ username }) {
  const [expanded, setExpanded] = React.useState(false);
  const defaultTheme = createTheme();
  const [recruiterData, setRecruiterData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userBool, setUserBool] = React.useState(false);
  const authUser = React.useContext(AuthContext);
  const navigate = useNavigate();

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLogin = () => {
    navigate(`/signin?redirectUrl=${window.location.pathname}`);
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
        }
        const userParams = {
          username: username,
        };
        const userQueryString = new URLSearchParams(userParams);

        let userResponse = await userClient.getUsersByFilter(userQueryString);

        if (userResponse) {
          const queryParams = {
            userIds: userResponse[0]._id,
          };

          const queryString = new URLSearchParams(queryParams);

          let recruiterResponse = await recruiterClient.getRecruitersByFilter(queryString);

          if (user_id === userResponse[0]._id) {
            setUserBool(true);
          }

          setRecruiterData(recruiterResponse[0]);
          setFirstName(userResponse[0].firstname);
          setLastName(userResponse[0].lastname);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [username]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid container spacing={2} justifyContent="center" alignItems="center" pt={10}>
          <Grid item xs={12} sm={6} md={4}>
            {authUser && authUser.hasOwnProperty("email") ? (
              <Card raised={true} style={{ height: "100%", paddingTop: 30 }}>
                <Avatar
                  sx={{ height: "120px", width: "120px", margin: "auto" }}
                  src={recruiterData && recruiterData.profile_picture}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {firstName} {lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    Recruiter at {recruiterData && recruiterData.company}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 3, justifyContent: "center" }}
                  >
                    <LocationOnOutlinedIcon
                      color="secondary"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Typography variant="body2">
                      {recruiterData && recruiterData.city}, {recruiterData && recruiterData.state},{" "}
                      {recruiterData && recruiterData.country}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 2, justifyContent: "center" }}
                  >
                    <EmailOutlinedIcon color="secondary" fontSize="small" sx={{ marginRight: 1 }} />
                    <Link
                      href={`mailto:${recruiterData && recruiterData.email}`}
                      color="inherit"
                      underline="hover"
                    >
                      {recruiterData && recruiterData.email}
                    </Link>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 2, justifyContent: "center" }}
                  >
                    <LanguageOutlinedIcon
                      color="secondary"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Link
                      href={recruiterData && recruiterData.website}
                      color="inherit"
                      underline="hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
            ) : (
              <Card raised={true} style={{ height: "100%", paddingTop: 30 }}>
                <Avatar sx={{ height: "120px", width: "120px", margin: "auto" }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {firstName} {lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    Recruiter at {recruiterData && recruiterData.company}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 3, justifyContent: "center" }}
                  >
                    <LocationOnOutlinedIcon
                      color="secondary"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Typography variant="body2">
                      {recruiterData && recruiterData.city}, {recruiterData && recruiterData.state},{" "}
                      {recruiterData && recruiterData.country}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 2, justifyContent: "center" }}
                  >
                    <LanguageOutlinedIcon
                      color="secondary"
                      fontSize="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Link
                      href={recruiterData && recruiterData.website}
                      color="inherit"
                      underline="hover"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {recruiterData && recruiterData.website}
                    </Link>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "block",
                      margin: "auto",
                      mt: 2,
                    }}
                  >
                    Sign In to view more
                  </Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
