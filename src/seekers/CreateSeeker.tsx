import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createSeeker } from "./client";
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from "../AuthContext";

const defaultTheme = createTheme();

export default function CreateSeeker() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const user:any = React.useContext(AuthContext);

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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const [formData, setFormData] = useState({
        user: "",
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
            user: user._id,
            email: user.email,
        };

        try {
            const createdSeeker = await createSeeker(updatedFormData);
            if (createdSeeker !== undefined) {
                handleSnackbar("Seeker profile completion successful!", "success");
                window.location.href= "/seekers/dashboard";
            }
        } catch (error) {
            console.error("Error completing seeker profile:", error);
            handleSnackbar("Error completing seeker profile. Please try again.", "error");
        }
    };

    const handleSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

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
                        <PersonSearchIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Seeker Profile Completion
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
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
                                        disabled={loading}
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
