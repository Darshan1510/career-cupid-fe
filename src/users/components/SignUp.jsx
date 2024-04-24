import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import * as React from "react";

import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Copyright from "../../components/common/Copyright";
import Spinner from "../../components/common/Spinner";
import useLoading from "../../hooks/useLoading";
import * as client from "../client";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  let [firstname, setFirstname] = React.useState();
  let [lastname, setLastname] = React.useState();
  let [password, setPassword] = React.useState();
  let [email, setEmail] = React.useState();
  let [role, setRole] = React.useState("RECRUITER");
  let [username, setUsername] = React.useState();

  let navigate = useNavigate();
  const [loading, withLoading] = useLoading();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let user = {};
    user["firstname"] = firstname;
    user["lastname"] = lastname;
    user["password"] = password;
    user["email"] = email;
    user["username"] = username;
    user["role"] = role;

    let createdUser = await withLoading(client.register, user);

    if (createdUser) {
      alert("Please verify your email to proceed further");
      navigate("/signin");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading && <Spinner loading={loading} />}
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname || ""}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname || ""}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email || ""}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username || ""}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password || ""}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sign up as</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="RECRUITER"
                    name="radio-buttons-group"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <FormControlLabel value="RECRUITER" control={<Radio />} label="Recruiter" />
                    <FormControlLabel value="SEEKER" control={<Radio />} label="Seeker" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <small className="text-secondary">
                  By clicking “Sign up”, you agree to our{" "}
                  <a href="/terms" target="_blank">
                    terms of service
                  </a>{" "}
                  and{" "}
                  <a href="privacy" target="_blank">
                    privacy policy
                  </a>
                </small>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
