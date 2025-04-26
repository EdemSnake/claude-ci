import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import { getProducts, deleteProduct } from '../services/api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSelectedProduct(null);
    },
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Paper 
        sx={{ 
          width: '50%', 
          borderRadius: 0,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          bgcolor: 'primary.main',
          color: 'white'
        }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InventoryIcon />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Product Inventory
            </Typography>
            <Chip 
              label={`${products.length} items`} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '& .MuiChip-label': { px: 2 }
              }} 
            />
          </Stack>
        </Box>
        <List sx={{ 
          flex: 1, 
          overflow: 'auto',
          '& .MuiListItem-root': {
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }
        }}>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem
                sx={{
                  px: 3,
                  py: 2,
                  cursor: 'pointer',
                  ...(selectedProduct === product.id && {
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light'
                    }
                  })
                }}
                onClick={() => setSelectedProduct(product.id)}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      >
                        ${Number(product.price).toFixed(2)}
                      </Typography>
                      {product.description && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {product.description}
                        </Typography>
                      )}
                    </Stack>
                  }
                />
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product.id);
                    }}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this product?')) {
                        deleteMutation.mutate(product.id);
                      }
                    }}
                    sx={{ 
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.light' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Box sx={{ width: '50%', p: 3 }}>
        <ProductForm
          productId={selectedProduct}
          onSaved={() => setSelectedProduct(null)}
        />
      </Box>
    </Box>
  );
};

export default ProductList; 