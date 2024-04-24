import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Copyright from "../../components/common/Copyright";
import * as client from "../../users/client";
import commonUtil from "../../utils/commonUtil";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AdminSignIn() {
  let [showPassword, setShowPassword] = React.useState();
  let [email, setEmail] = React.useState();
  let [password, setPassword] = React.useState();

  let navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    let session = await client.login({
      email: email,
      password: password,
      role: "ADMIN",
    });

    if (session) {
      saveLoginToken(session);
    }
  };

  const saveLoginToken = async (session) => {
    let user = session.user;

    if (!user) {
      let users = await client.getUsersByFilter(new URLSearchParams(`emails=${email}`));
      if (users && users.length > 0) user = users[0];
    }

    if (!user) {
      alert("User login err. Contact support@career-cupid.com");
      return;
    }

    commonUtil.setLoginToken(user._id, session.token);

    let params = new URLSearchParams(window.location.search);
    let redirectUrl = params.get("redirectUrl");

    if (redirectUrl) {
      navigate(redirectUrl);
      return;
    }
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
    window.location.href = "/admin/dashboard";
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            Sign in as admin
          </Typography>
          <Box component="form" onSubmit={loginHandler} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePasswordVisibility}
                      edge="end"
                      style={{ outline: "none" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
