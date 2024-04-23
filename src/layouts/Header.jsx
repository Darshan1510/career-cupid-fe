import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBox from "../components/common/SearchBox";
import { Logout } from "@mui/icons-material";
import commonUtil from "../utils/commonUtil";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileSigninAnchorEl, setMobileSigninAnchorEl] = React.useState(null);
  const user = React.useContext(AuthContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileSigninMenuOpen = Boolean(mobileSigninAnchorEl);

  const getProfileUrl = () => {
    if (user) {
      if (user.role === "RECRUITER") {
        return `/recruiters/${user.username}`;
      } else if (user.role === "SEEKER") {
        return `/seekers/${user.username}`;
      }
    }
  };

  const getAccountUrl = () => {
    if (user) {
      if (user.role === "RECRUITER") {
        return "/recruiters/dashboard";
      } else if (user.role === "SEEKER") {
        return "/seekers/dashboard";
      }
    }
  };

  const accountUrl = getAccountUrl();

  const profileUrl = getProfileUrl();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileSiginMenuOpen = (event) => {
    setMobileSigninAnchorEl(event.currentTarget);
  };

  const handleMobileSiginMenuClose = () => {
    setMobileSigninAnchorEl(null);
  };

  const removeLogin = async (userId) => {
    const ok = await window.confirm("Are you sure?");
    if (!ok) return;
    commonUtil.removeCurrentLogin(userId);

    if (commonUtil.getLoginTokens() && commonUtil.getLoginTokens().length > 0)
      window.location.reload();
    else window.location.href = "/signin";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <a href={profileUrl} style={{ textDecoration: "none" }}>
          Profile
        </a>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <a href={accountUrl} style={{ textDecoration: "none" }}>
          My account
        </a>
      </MenuItem>
      <MenuItem onClick={removeLogin}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <a href={profileUrl} style={{ textDecoration: "none" }}>
          Profile
        </a>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <a href={accountUrl} style={{ textDecoration: "none" }}>
          My account
        </a>
      </MenuItem>
      <MenuItem onClick={removeLogin}>
        <IconButton
          size="large"
          aria-label="logout of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Logout />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileSignInMenuId = "primary-search-account-signin-menu-mobile";
  const renderMobileSignInMenu = (
    <Menu
      anchorEl={mobileSigninAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileSignInMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileSigninMenuOpen}
      onClose={handleMobileSiginMenuClose}
    >
      <MenuItem onClick={handleMobileSiginMenuOpen}>
        <a href="/signin" style={{ textDecoration: "none" }}>
          Sign in
        </a>
      </MenuItem>
      <MenuItem onClick={handleMobileSiginMenuOpen}>
        <a href="/signup" style={{ textDecoration: "none" }}>
          Sign up
        </a>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "white" }} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "bolder",
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Career Cupid
          </Typography>
          <Box>
            <SearchBox />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {user && user.hasOwnProperty("email") ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <a href="/signin" className="btn btn-primary btn-sm">
                  Sign in
                </a>
                &nbsp;
                <a href="/signup" className="btn btn-success btn-sm">
                  Sign up
                </a>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileSignInMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileSiginMenuOpen}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMobileSignInMenu}
    </Box>
  );
}
