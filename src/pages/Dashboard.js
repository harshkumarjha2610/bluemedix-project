import React from "react";
import { Link } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Divider
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";

const Dashboard = () => {
  const menuItems = [
    { title: "Manage Users", icon: <PeopleIcon sx={{ fontSize: 40 }} />, link: "/users", description: "Add, edit, or remove user accounts" },
    { title: "Manage Products", icon: <InventoryIcon sx={{ fontSize: 40 }} />, link: "/products", description: "Create and organize product listings" },
    { title: "Analytics", icon: <AnalyticsIcon sx={{ fontSize: 40 }} />, link: "/analytics", description: "View site performance and statistics" },
    { title: "Settings", icon: <SettingsIcon sx={{ fontSize: 40 }} />, link: "/settings", description: "Configure system preferences" }
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <DashboardIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Admin Dashboard
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
          Welcome back, Admin! Here's what you can manage:
        </Typography>
        
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: "100%", 
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { 
                    transform: "translateY(-5px)", 
                    boxShadow: 6 
                  }
                }}
              >
                <CardActionArea component={Link} to={item.link} sx={{ height: "100%" }}>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Box sx={{ color: "primary.main", mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;