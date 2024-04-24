import Work from "@mui/icons-material/Work";
import {
  Autocomplete,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Copyright from "../components/common/Copyright";
import * as recruiterClient from "../recruiters/client";
import * as userClient from "../users/client";
import commonUtil from "../utils/commonUtil";
import * as client from "./client";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateJobPosting() {
  let [company, setCompany] = React.useState("");
  let [title, setTitle] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [city, setCity] = React.useState("");
  let [state, setState] = React.useState("");
  let [country, setCountry] = React.useState("");
  let [salary, setSalary] = React.useState(0);
  let [industry, setIndustry] = React.useState("");
  let [openings, setOpenings] = React.useState(0);
  let [remote, setRemote] = React.useState(false);
  let [hybrid, setHybrid] = React.useState(false);
  let [fullTime, setFullTime] = React.useState(false);
  let [skills, setSkills] = React.useState([]);
  let [experience, setExperience] = React.useState(0);
  let [recruiterId, setRecruiterId] = React.useState("");

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [countries, setCountries] = React.useState([]);

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let jobPosting = {
      company: company,
      title: title,
      description: description,
      city: city,
      state: state,
      country: country,
      salary: salary,
      industry: industry,
      openings: openings,
      remote: remote,
      hybrid: hybrid,
      fullTime: fullTime,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      skills: skills,
      experience: experience,
      recruiterId: recruiterId,
    };

    console.log(jobPosting);

    try {
      const response = await client.createJobPosting(jobPosting);
      if (response) {
        handleSnackbar("Congratulations, the job has been posted.", "success");
        navigate("/recruiters/dashboard");
      }
    } catch (error) {
      handleSnackbar("Error posting the job. Please try again.", "error");
      console.log("Oops, there was an error:", error);
    }
  };
  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const industryOptions = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Hospitality",
    "Automotive",
  ];

  const handleCancel = () => {
    navigate(`/recruiters/dashboard`);
};

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const formattedCountries = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const CC_LOGIN_TOKENS = commonUtil.getLoginTokens();
        let user_id = null;

        if (CC_LOGIN_TOKENS && CC_LOGIN_TOKENS.length > 0) {
          const key = CC_LOGIN_TOKENS[0];
          user_id = Object.keys(key)[0];
        } else {
          console.log("Not enough tokens present in auth");
          return;
        }

        if (user_id) {
          const userResponse = await userClient.getUserById(user_id);

          if (userResponse && userResponse._id === user_id) {
            const queryParams = {
              userIds: user_id,
            };

            const queryString = new URLSearchParams(queryParams).toString();

            const recruiterResponse = await recruiterClient.getRecruitersByFilter(queryString);

            if (Array.isArray(recruiterResponse) && recruiterResponse.length > 0) {
              setRecruiterId(recruiterResponse[0]._id);
            } else {
              console.log("Recruiter response is empty or not an array.");
            }
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Work />
          </Avatar>
          <Typography component="h1" variant="h5">
            Post a Job
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Company Name"
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  autoFocus
                  value={company || ""}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Job Title"
                  label="Job Title"
                  name="jobTitle"
                  value={title || ""}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="Job Description"
                  label="Job Description"
                  name="description"
                  value={description || ""}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="city"
                  name="city"
                  value={city || ""}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="state"
                  type="state"
                  id="state"
                  value={state || ""}
                  onChange={(event) => setState(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    value={country || ""}
                    label="Country"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="industry"
                  options={industryOptions}
                  value={industry}
                  onChange={(event, newValue) => {
                    setIndustry(newValue || "");
                  }}
                  renderInput={(params) => <TextField {...params} label="Industry" />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  type="number"
                  value={salary === 0 ? "" : salary}
                  onChange={(event) => setSalary(Number(event.target.value))}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="openings"
                  label="Openings"
                  type="number"
                  value={openings === 0 ? "" : openings}
                  onChange={(event) => setOpenings(Number(event.target.value))}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="experience"
                  label="Experience (years)"
                  type="number"
                  value={experience === 0 ? "" : experience}
                  onChange={(event) => setExperience(Number(event.target.value))}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="skills"
                  label="Skills (comma-separated)"
                  value={skills.join(",")}
                  onChange={(event) => setSkills(event.target.value.split(","))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}
                >
                  <FormLabel id="demo-radio-buttons-group-label" sx={{ marginRight: "16px" }}>
                    Remote Job
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={false}
                    name="radio-buttons-group"
                    value={remote.toString()}
                    onChange={(event) => setRemote(event.target.value === "true")}
                  >
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}
                >
                  <FormLabel id="hybrid-job-label" sx={{ marginRight: "16px" }}>
                    Hybrid Job
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="hybrid-job-label"
                    defaultValue={false}
                    name="hybrid-radio-buttons-group"
                    value={hybrid.toString()}
                    onChange={(event) => setHybrid(event.target.value === "true")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    </div>
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <FormLabel id="full-time-job-label" sx={{ marginRight: "16px" }}>
                    Full-Time Job
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="full-time-job-label"
                    defaultValue={true}
                    name="full-time-radio-buttons-group"
                    value={fullTime.toString()}
                    onChange={(event) => setFullTime(event.target.value === "true")}
                  >
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
            <Button onClick={handleCancel} fullWidth color="error" variant="contained" sx={{ mt: 2, mb: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
