import React, { useState } from "react";
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
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Tooltip, FormHelperText } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createRecruiter } from "./client";

const defaultTheme = createTheme();

const RecruiterSignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        company: "",
        city: "",
        state: "",
        country: "",
        website: "",
        bio: "",
        profile_picture: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            // Call the register function from client.ts
            const createdUser = await createRecruiter(formData);
            if (createdUser) {
                alert("Thank you for filling out the form, we shall update you once you are approved/rejected.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            // Handle error here, e.g., display error message to the user
            alert("Error registering user. Please try again.");
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
                        Recruiter Approval Request Form
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="company"
                                    label="Company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip title="Enter two-letter abbreviation for state">
                                                    <HelpOutlineIcon color="action" />
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    id="website"
                                    label="Website"
                                    name="website"
                                    value={formData.website}
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
                                    label="Profile Picture Link"
                                    name="profile_picture"
                                    value={formData.profile_picture}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Request Review
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default RecruiterSignUp;
