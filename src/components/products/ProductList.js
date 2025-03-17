import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  // CircularProgress,
  Skeleton,
  Rating,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ pt: '75%', position: 'relative' }}>
                <Skeleton 
                  variant="rectangular" 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }} 
                />
              </Box>
              <CardContent>
                <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { 
                transform: 'translateY(-5px)', 
                boxShadow: 6 
              }
            }}
          >
            <CardActionArea 
              component={Link} 
              to={`/products/${product.id}`}
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ position: 'relative', pt: '75%', width: '100%' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
              <Tooltip title="View Details">
                <IconButton
                  component={Link}
                  to={`/products/${product.id}`}
                  size="small"
                  sx={{ color: 'info.main' }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Product">
                <IconButton
                  component={Link}
                  to={`/products/edit/${product.id}`}
                  size="small"
                  sx={{ color: 'success.main' }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Product">
                <IconButton
                  size="small"
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;