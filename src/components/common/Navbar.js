import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Users", path: "/users", icon: <PeopleIcon /> },
    { label: "Products", path: "/products", icon: <InventoryIcon /> },
    { label: "Analytics", path: "/analytics", icon: <AnalyticsIcon /> },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={1}
        sx={{ 
          backgroundColor: "white", 
          color: "text.primary"
        }}
      >
        <Toolbar>
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              flexGrow: 1 
            }}
          >
            <DashboardIcon 
              sx={{ 
                display: { xs: "none", sm: "flex" }, 
                mr: 1, 
                color: "primary.main" 
              }} 
            />
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: "none", 
                color: "primary.main",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center"
              }}
            >
              Admin Portal
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 3,
                  sx: { mt: 1, width: 200 }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={handleClose}
                    selected={isActive(item.path)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "primary.light",
                        "&:hover": {
                          backgroundColor: "primary.light",
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive(item.path) ? "primary.main" : "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <Typography variant="body2">
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    mx: 0.5,
                    px: 2,
                    py: 1,
                    color: isActive(item.path) ? "primary.main" : "text.secondary",
                    fontWeight: isActive(item.path) ? "medium" : "normal",
                    borderBottom: isActive(item.path)
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderBottom: isActive(item.path)
                        ? `2px solid ${theme.palette.primary.main}`
                        : `2px solid ${theme.palette.grey[300]}`,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Boolean(userMenuAnchorEl) ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(userMenuAnchorEl) ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>A</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={userMenuAnchorEl}
            id="account-menu"
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                width: 200,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={Link} to="/profile">
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />  {/* This empty Toolbar creates space under the fixed AppBar */}
    </Box>
  );
};

export default Navbar;