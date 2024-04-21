import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Work from "@mui/icons-material/Work";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as client from "./client";
import commonUtil from "../utils/commonUtil";
import { useNavigate } from "react-router-dom";
import Copyright from "../components/common/Copyright";
import { Autocomplete, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { AnyARecord } from "dns";
import { useEffect } from "react";


interface JobPosting {
    company: string;
    title: string;
    description: string;
    city: string;
    state: string;
    country: string;
    salary: number;
    industry: string;
    openings: number;
    remote: boolean;
    hybrid: boolean;
    fullTime: boolean;
    createdAt: number;
    updatedAt: number;
    skills: string[];
    experience: number;
  }
  
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
  let [createdAt, setCreatedAt] = React.useState<number>(Date.now());
  let [updatedAt, setUpdatedAt] = React.useState<number>(Date.now());
  let [skills, setSkills] =  React.useState<string[]>([]);
  let [experience, setExperience] =  React.useState(0);

  const [countries, setCountries] = React.useState([]);
  
  let navigate = useNavigate();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    let jobPosting: JobPosting = {
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
        createdAt: createdAt,
        updatedAt: updatedAt,
        skills: skills,
        experience: experience
      };


    console.log(jobPosting);

    try {
     
      let response = await client.createJobPosting(jobPosting);

    } catch (error) {
      console.error("Oops, there was an error:", error);
    }
    
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


  useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            const formattedCountries = data.map((country: any) => ({
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
  return (

    <ThemeProvider theme={defaultTheme}>
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
                    onChange={(e) => setCountry( e.target.value )}
                    >
                    {countries.map((country: any) => (
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
                  onChange={(event:any, newValue:any) => {
                    setIndustry(newValue || "");
                  }}
                  renderInput={(params:any) => <TextField {...params} label="Industry" />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  type="number"
                  value={salary === 0 ? '' : salary}
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
                  value={openings === 0 ? '' : openings}
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
                  value={experience === 0 ? '' : experience}
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
                  value={skills.join(',')} 
                  onChange={(event) => setSkills(event.target.value.split(','))} 
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
                  value={remote.toString()} 
                  onChange={(event) => setRemote(event.target.value === "true")}
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
                value={hybrid.toString()} 
                onChange={(event) => setHybrid(event.target.value === "true")}
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
