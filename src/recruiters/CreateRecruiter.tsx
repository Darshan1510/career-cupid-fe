import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Snackbar, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createRecruiter } from "./client";
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from "../AuthContext";

const defaultTheme = createTheme();

const RecruiterSignUp = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const user: any = React.useContext(AuthContext);

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
            formData.user = user._id;
            formData.email = user.email;
            const createdUser = await createRecruiter(formData);
            if (createdUser) {
                handleSnackbar("Thank you for filling out the form, we shall update you once you are approved/rejected.", "success");
                window.location.href= "/recruiters/dashboard";
            }
        } catch (error) {
            console.error("Error registering user:", error);
            handleSnackbar("Error registering user. Please try again.", "error");
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
                        <AssignmentIndIcon />
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
