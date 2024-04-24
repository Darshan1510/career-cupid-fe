import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Work from "@mui/icons-material/Work";
import commonUtil from "../utils/commonUtil.js";
import * as recruiterClient from "../recruiters/client.ts";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as client from "./client";
import { useNavigate, useParams } from "react-router-dom";
import Copyright from "../components/common/Copyright";
import { Autocomplete, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar } from "@mui/material";
import { useEffect } from "react";
import MuiAlert from '@mui/material/Alert';

  
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function JobPostingsEdit() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [countries, setCountries] = React.useState([]);
  const [jobPostingData, setJobPostingData] = React.useState({

    title: "",
    description: "",
    city: "",
    state: "",
    country: "",
    salary: 0,
    industry: "",
    openings: 0,
    remote: false,
    hybrid: false,
    fullTime: false,
    updatedAt: Date.now(),
    skills: [],
    experience: 0,
    _id:"",
    applicants:[]
  });

  const industryOptions = [
    "Automotive",
    "Education",
    "Finance",
    "Healthcare",
    "Hospitality",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Technology",
  ];

  let navigate = useNavigate();
  const {jobPostingId} = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      jobPostingData._id=jobPostingId

      const response = await client.updateJobPosting(jobPostingData);
      if (response) {
        handleSnackbar("Congratulations, the changes have been saved.", "success");
        setTimeout(() => {
          navigate(`/recruiters/dashboard`);
      }, 1000); 
    } 
  } catch (error) {
      handleSnackbar("Error posting the job. Please try again.","error");
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

  const handleJobPostingChange = (e) => {
    const { name, value } = e.target;
    console.log("Job Posting Form Data - Name:", name, "Value:", value);
  
    setJobPostingData({
        ...jobPostingData,
        [name]: value,
    });
  };
  

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
      }

      if (user_id) {
        const recruiterQueryParams = {
            user: user_id,
          };
          const reruiterQueryString = new URLSearchParams(recruiterQueryParams);

          let recruiterResponse = await recruiterClient.getRecruitersByFilter(reruiterQueryString);
           
       
          const queryParams = {
            recruiterIds: recruiterResponse[0]._id,
            jobPostingIds : jobPostingId
          };
          
          const queryString = new URLSearchParams(queryParams);

          const jobPostingResponse  = await client.getJobPostingsByFilter(queryString);

          setJobPostingData({
            title: jobPostingResponse[0].title,
            description: jobPostingResponse[0].description,
            city: jobPostingResponse[0].city,
            state: jobPostingResponse[0].state,
            country: jobPostingResponse[0].country,
            salary: jobPostingResponse[0].salary,
            industry: jobPostingResponse[0].industry,
            openings: jobPostingResponse[0].openings,
            remote: jobPostingResponse[0].remote,
            hybrid: jobPostingResponse[0].hybrid,
            fullTime: jobPostingResponse[0].full_time,
            updatedAt: Date.now(),
            skills: jobPostingResponse[0].skills,
            experience: jobPostingResponse[0].experience,
            applicants:jobPostingResponse[0].applicants,
            shortlisted_applicants:jobPostingResponse[0].shortlisted_applicants
          });

        
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
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
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
            Edit
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="jobTitle" 
                    label="Job Title"
                    name="title" 
                    value={jobPostingData.title}
                    onChange={handleJobPostingChange}
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
                  value={jobPostingData.description}
                  onChange={handleJobPostingChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="city"
                  name="city"
                  value={jobPostingData.city}
                  onChange={handleJobPostingChange}
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
                  value={jobPostingData.state}
                  onChange={handleJobPostingChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel id="country-label">Country</InputLabel>
                    <Select
                        labelId="country-label"
                        id="country"
                        value={jobPostingData.country}
                        label="Country"
                        onChange={(e) => setJobPostingData({ ...jobPostingData, country: e.target.value })}>
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
                  value={jobPostingData.industry}
                  onChange={(e) => {
                    setJobPostingData({ ...jobPostingData, industry: e.target.value });
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
                  value={jobPostingData.salary}
                  onChange={(e) => {setJobPostingData({ ...jobPostingData, salary: Number(e.target.value) })}}
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
                  value={jobPostingData.openings}
                  onChange={(e) => {setJobPostingData({ ...jobPostingData, openings: Number(e.target.value) })}}
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
                  value={jobPostingData.experience}
                  onChange={(e) => {setJobPostingData({ ...jobPostingData, experience: Number(e.target.value) })}}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="skills"
                  label="Skills"
                  value={
                    Array.isArray(jobPostingData.skills) ? jobPostingData.skills.join(",") : ""
                  }
                  onChange={(event) =>
                    setJobPostingData({ ...jobPostingData, skills: event.target.value.split(",") })
                  }
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:'10px' }}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ marginRight: '16px' }}>Remote Job</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={false}
                  name="radio-buttons-group"
                  value={jobPostingData.remote.toString()} 
                  onChange={(event) =>  {setJobPostingData({ ...jobPostingData, remote: event.target.value === "true"})}}
                >
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , gap:'20px'}}>
              <FormLabel id="hybrid-job-label" sx={{ marginRight: '16px' }}>Hybrid Job</FormLabel>
              <RadioGroup
                row
                aria-labelledby="hybrid-job-label"
                defaultValue={false}
                name="hybrid-radio-buttons-group"
                value={jobPostingData.hybrid.toString()} 
                onChange={(event) =>  {setJobPostingData({ ...jobPostingData, hybrid: event.target.value === "true"})}}
                >
                <div style={{ display: 'flex', alignItems: 'center'}}>
                <FormControlLabel value="false" control={<Radio />} label="No" />
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <FormLabel id="full-time-job-label" sx={{ marginRight: '16px' }}>Full-Time Job</FormLabel>
              <RadioGroup
                row
                aria-labelledby="full-time-job-label"
                defaultValue={true}
                name="full-time-radio-buttons-group"
                value={jobPostingData.fullTime.toString()} 
                onChange={(event) =>  {setJobPostingData({ ...jobPostingData, fullTime: event.target.value === "true"})}}
              >
                <FormControlLabel value="false" control={<Radio />} label="No" />
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>

              
            </Grid>
            <Box sx={{ display: "flex", marginTop: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3,ml:13 }}>
                    Save
            </Button >
            
            <Button  color="error" variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
