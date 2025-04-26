import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { getProduct } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id))
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Chip
            label={product.available ? 'Available' : 'Unavailable'}
            color={product.available ? 'success' : 'error'}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>
            {product.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <Typography>
            ${product.price}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/products/${id}/edit`)}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
          >
            Back to List
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetails; 