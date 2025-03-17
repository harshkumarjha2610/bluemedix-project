import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Tooltip,
  Pagination
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://fakestoreapi.com/products/categories")
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => category === "all" || product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InventoryIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Products
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 2,
              fontWeight: "medium"
            }}
          >
            Add New Product
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={category}
                onChange={handleCategoryChange}
                label="Category"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon color="action" fontSize="small" />
                  </InputAdornment>
                }
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon color="action" fontSize="small" />
                  </InputAdornment>
                }
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price_low">Price (Low to High)</MenuItem>
                <MenuItem value="price_high">Price (High to Low)</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": { 
                          transform: "translateY(-5px)", 
                          boxShadow: 6 
                        }
                      }}
                    >
                      <CardActionArea 
                        component={Link} 
                        to={`/products/${product.id}`}
                        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                      >
                        <Box sx={{ position: "relative", pt: "75%", width: "100%" }}>
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
                              p: 2
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Chip
                            label={product.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="subtitle1" component="h2" fontWeight="medium">
                            {truncateText(product.title, 50)}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Rating
                              value={product.rating.rate}
                              readOnly
                              size="small"
                              precision={0.1}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({product.rating.count})
                            </Typography>
                          </Box>
                          <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                            ${product.price.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            component={Link}
                            to={`/products/${product.id}`}
                            size="small"
                            sx={{ color: "info.main" }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Product">
                          <IconButton
                            component={Link}
                            to={`/products/edit/${product.id}`}
                            size="small"
                            sx={{ color: "success.main" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Product">
                          <IconButton
                            size="small"
                            sx={{ color: "error.main" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">
                      No products found matching your criteria
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
            
            {pageCount > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProductsPage;