import React, { useEffect, useState } from "react";
import commonUtil from "../../utils/commonUtil.js";
import * as recruiterClient from "../../recruiters/client.ts";
import * as userClient from "../../users/client.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Grid, Box, InputLabel, MenuItem, Select, Button, Typography, FormControl, IconButton, Snackbar } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import TextField from "@mui/material/TextField";



export default function RecruiterEdit() {

    const defaultTheme = createTheme();
    const [countries, setCountries] = useState([]);
    const [recruiterFormData, setRecruiterFormData] = React.useState({
      _id : "",
      company: "",
      city: "",
      state: "",
      country: "",
      website: "",
      bio: "",
      profile_picture: "",
      email:""
  });
  const [userFormData, setUserFormData] = React.useState({
    firstname : "",
    lastname : "",
    _id : ""
});

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
        ...userFormData,
        [name]: value,
    });
};
const handleRecruiterChange = (e) => {
  const { name, value } = e.target;
  console.log("Recruiter Form Data - Name:", name, "Value:", value);

  setRecruiterFormData({
      ...recruiterFormData,
      [name]: value,
  });
};
    const handleSubmit = async (event) => {
        event.preventDefault();

        
          const recruiterResponse = await recruiterClient.updateRecruiter(recruiterFormData);
          const userResponse = await userClient.updateUser(userFormData);
        
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
    
            if (user_id) {
              let userResponse = await userClient.getUserById(user_id);
              console.log(user_id);
    
              if (userResponse && userResponse._id === user_id) {
                const queryParams = {
                  user: user_id,
                };
                const queryString = new URLSearchParams(queryParams).toString();
    
                let recruiterResponse = await recruiterClient.getRecruitersByFilter(
                  queryString
                );
    
                setRecruiterFormData(
                  {
                    company: recruiterResponse[0].company,
                    city: recruiterResponse[0].city,
                    state: recruiterResponse[0].state,
                    country: recruiterResponse[0].country,
                    website: recruiterResponse[0].website,
                    bio: recruiterResponse[0].bio,
                    profile_picture: recruiterResponse[0].profile_picture,
                    email: recruiterResponse[0].email,
                    _id : recruiterResponse[0]._id
                  }
                ); 
                setUserFormData({
                  firstname : userResponse.firstname,
                  lastname : userResponse.lastname,
                  _id : userResponse._id
                });
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
              }
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);

      return(
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" paddingTop={3}>
                        Edit Profile
                    </Typography>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                value={userFormData.firstname}
                onChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                value={userFormData.lastname}
                onChange={handleUserChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={recruiterFormData.email}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="company"
                label="Company"
                id="company"
                autoComplete="company"
                value={recruiterFormData.company}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                autoComplete="city"
                value={recruiterFormData.city}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                autoComplete="state"
                value={recruiterFormData.state}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel id="country-label">Country</InputLabel>
                    <Select
                        labelId="country-label"
                        id="country"
                        value={recruiterFormData.country}
                        label="Country"
                        onChange={(e) => setRecruiterFormData({ ...recruiterFormData, country: e.target.value })}
                        
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
              <TextField
                required
                fullWidth
                name="bio"
                label="Bio"
                id="bio"
                autoComplete="bio"
                value={recruiterFormData.bio}
                multiline
                rows={6}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="website"
                label="Website URL"
                id="website"
                autoComplete="website"
                value={recruiterFormData.website}
                onChange={handleRecruiterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="profile_picture"
                label="Profile Picture"
                id="profile_picture"
                autoComplete="profile_picture"
                value={recruiterFormData.profile_picture}
                onChange={handleRecruiterChange}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ display: "flex", marginTop: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3,ml:13 }}>
                    Save
            </Button >
            
            <Button  color="error" variant="contained">
              <a href="/recruiterDetail" style={{textDecoration:"none",color:"white"}}>
            Cancel
            </a>
            </Button>
            </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </ThemeProvider>
      );
}