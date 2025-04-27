import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { createProduct, updateProduct, getProduct, Product } from '../services/api';

interface ProductFormProps {
  productId?: number | null;
  onSaved?: () => void;
}

const ProductForm = ({ productId, onSaved }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const isEdit = !!productId;

  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    available: true,
  });

  const { data: existingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(Number(productId)),
    enabled: isEdit
  });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  useEffect(() => {
    if (!productId) {
      setProduct({
        name: '',
        description: '',
        price: 0,
        available: true,
      });
    }
  }, [productId]);

  const mutation = useMutation({
    mutationFn: isEdit 
      ? (data: Partial<Product>) => updateProduct(Number(productId), data)
      : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSaved) onSaved();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(product as any);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        height: '100%',
        bgcolor: 'transparent'
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          mb: 4,
          color: 'primary.main',
          fontWeight: 'medium'
        }}
      >
        {isEdit ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!product.available}
                onChange={handleCheckboxChange}
                name="available"
                color="primary"
              />
            }
            label="Available"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ 
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              {isEdit ? 'Update Product' : 'Create Product'}
            </Button>
            {isEdit && (
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => onSaved?.()}
                sx={{ 
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductForm; 