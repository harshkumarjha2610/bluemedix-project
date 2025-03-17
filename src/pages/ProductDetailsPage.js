import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Card,
  // CardContent,
  CardMedia,
  Chip,
  Rating,
  Breadcrumbs,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Alert,
  Tooltip,
  Tabs,
  Tab
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import ReviewsIcon from "@mui/icons-material/Reviews";
import axios from "axios";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Generate some random specifications for the product
  const specifications = {
    "Brand": product.category.includes("clothing") ? "Fashion Brand" : "Tech Brand",
    "Model": `${product.category.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    "Weight": `${(Math.random() * 2 + 0.1).toFixed(2)} kg`,
    "Dimensions": `${Math.floor(Math.random() * 30 + 10)} x ${Math.floor(Math.random() * 20 + 5)} x ${Math.floor(Math.random() * 10 + 1)} cm`,
    "Material": product.category.includes("clothing") ? "Cotton, Polyester" : "Aluminum, Plastic",
    "Warranty": `${Math.floor(Math.random() * 24 + 12)} Months`
  };

  return (
    <Container maxWidth="lg">
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mt: 4, mb: 2 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Dashboard
        </Link>
        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          Products
        </Link>
        <Typography color="text.primary">Product Details</Typography>
      </Breadcrumbs>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InventoryIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Product Details
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              to="/products"
              startIcon={<ArrowBackIcon />}
              sx={{ mr: 2 }}
            >
              Back to Products
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
              to={`/products/edit/${id}`}
            >
              Edit Product
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card elevation={2} sx={{ mb: 3 }}>
              <Box sx={{ position: "relative", pt: "100%", width: "100%" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    p: 4
                  }}
                />
              </Box>
            </Card>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Tooltip title="Add to Favorites">
                <IconButton sx={{ border: 1, borderColor: "grey.300" }}>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share Product">
                <IconButton sx={{ border: 1, borderColor: "grey.300" }}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={product.category}
                size="small"
                color="primary"
                sx={{ mb: 1 }}
              />
              <Typography variant="h4" component="h2" gutterBottom>
                {product.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={product.rating.rate}
                  readOnly
                  precision={0.1}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: "bold" }}>
                ${product.price.toFixed(2)}
              </Typography>
              <Chip 
                icon={<VerifiedIcon fontSize="small" />} 
                label="In Stock" 
                color="success" 
                variant="outlined" 
                size="small"
                sx={{ mt: 1 }} 
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                fullWidth
                sx={{ mb: 2, py: 1.5, borderRadius: 2 }}
              >
                Add to Cart
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Alert 
                icon={<LocalShippingIcon fontSize="inherit" />} 
                severity="info"
                sx={{ mb: 2 }}
              >
                Free shipping on orders over $50
              </Alert>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ 
              '& .MuiTab-root': { py: 2 },
              '& .Mui-selected': { fontWeight: 'bold' } 
            }}
          >
            <Tab icon={<DescriptionIcon />} label="Description" iconPosition="start" />
            <Tab icon={<InfoIcon />} label="Specifications" iconPosition="start" />
            <Tab icon={<ReviewsIcon />} label="Reviews" iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ p: 4 }}>
          {tabValue === 0 && (
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          )}
          {tabValue === 1 && (
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="product specifications">
                <TableBody>
                  {Object.entries(specifications).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ fontWeight: 'bold', width: '30%', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}
                      >
                        {key}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tabValue === 2 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <StarIcon sx={{ color: 'warning.main', mr: 1 }} />
                <Typography variant="h6">
                  {product.rating.rate.toFixed(1)} out of 5
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating.count} customer ratings)
                </Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                Customer reviews are not available in this demo version.
              </Alert>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetailsPage;