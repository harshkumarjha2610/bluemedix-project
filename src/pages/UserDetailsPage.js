import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mt: 4, mb: 2 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Dashboard
        </Link>
        <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
          Users
        </Link>
        <Typography color="text.primary">User Details</Typography>
      </Breadcrumbs>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              User Details
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              to="/users"
              startIcon={<ArrowBackIcon />}
              sx={{ mr: 2 }}
            >
              Back to Users
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              component={Link}
              to={`/users/edit/${id}`}
            >
              Edit User
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.light",
                    color: "primary.main",
                    fontSize: "3rem"
                  }}
                >
                  {user.name?.firstname[0]}
                  {user.name?.lastname[0]}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {user.name?.firstname} {user.name?.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Chip
                  label="Active User"
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "primary.main" }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={user.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Number"
                      secondary={user.phone}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={`${user.address?.number} ${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium", color: "primary.main" }}>
                  User Activity
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: "flex", justifyContent: "space-around", textAlign: "center", py: 2 }}>
                  <Box>
                    <ShoppingCartIcon sx={{ fontSize: 40, color: "primary.light", mb: 1 }} />
                    <Typography variant="h5">3</Typography>
                    <Typography variant="body2" color="text.secondary">Orders</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="h5">${Math.floor(Math.random() * 1000)}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Spent</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box>
                    <Typography variant="h5">{Math.floor(Math.random() * 365)}</Typography>
                    <Typography variant="body2" color="text.secondary">Days Active</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDetailsPage;