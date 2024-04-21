import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createSeeker } from "./client";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const defaultTheme = createTheme();

export default function CreateSeeker() {
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        city: "",
        state: "",
        country: "",
        job_titles: "",
        skills: "",
        experience: "",
        education: "",
        resume: "",
        bio: "",
        profile_picture: "",
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // Split the comma-separated string into an array
        const jobTitlesArray = formData.job_titles.split(',').map(item => item.trim());
        const skillsArray = formData.skills.split(',').map(item => item.trim());

        // Update the form data with the array
        const updatedFormData = {
            ...formData,
            job_titles: jobTitlesArray,
            skills: skillsArray,
        };

        try {
            const createdSeeker = await createSeeker(updatedFormData);
            if (createdSeeker !== undefined) {
                alert("Seeker profile completion successful!");
                // TODO: Redirect to the dashboard or next step after successful profile completion
            }
        } catch (error) {
            console.error("Error completing seeker profile:", error);
            // Handle error here, e.g., display error message to the user
            alert("Error completing seeker profile. Please try again.");
        }
    };

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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Seeker Profile Completion
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="address-level2"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"
                                    autoComplete="address-level1"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        id="country"
                                        value={formData.country}
                                        label="Country"
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    >
                                        <MenuItem value="US">US</MenuItem>
                                        <MenuItem value="IN">IN</MenuItem>
                                        <MenuItem value="CA">CA</MenuItem>
                                    </Select>
                                    <FormHelperText>Enter two-letter abbreviation for country</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="job_titles"
                                    label="Job Titles"
                                    name="job_titles"
                                    value={formData.job_titles}
                                    onChange={handleChange}
                                    helperText="Enter comma-separated job titles"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="skills"
                                    label="Skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    helperText="Enter comma-separated skills"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="experience"
                                    label="Experience (years)"
                                    name="experience"
                                    type="number"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="education"
                                    label="Education"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="resume"
                                    label="Resume URL"
                                    name="resume"
                                    value={formData.resume}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="bio"
                                    label="Bio"
                                    name="bio"
                                    multiline
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="profile_picture"
                                    label="Profile Picture URL"
                                    name="profile_picture"
                                    value={formData.profile_picture}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Complete Profile
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
