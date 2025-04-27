import { useState, forwardRef, useImperativeHandle } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Paper,
  List,

  Typography,

  Chip,
  Stack,
} from '@mui/material';

import InventoryIcon from '@mui/icons-material/Inventory';
import { getProducts, deleteProduct } from '../services/api';
import ProductInfoModal from './ProductInfoModal';
import ProductEditModal from './ProductEditModal';
import ProductListItem from './ProductListItem';

const ProductList = forwardRef((_, ref) => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'available' | 'unavailable'>('all');

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

  const handleOpenInfoModal = (productId: number) => {
    setSelectedProduct(productId);
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenEditModal = (productId: number | null) => {
    setSelectedProduct(productId);
    setModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  useImperativeHandle(ref, () => ({
    openAddProductModal: () => handleOpenEditModal(null)
  }));

  const selectedProductObj = products.find(p => p.id === selectedProduct);

  const filteredProducts = products.filter(product => {
    if (filterAvailable === 'all') return true;
    if (filterAvailable === 'available') return product.available;
    if (filterAvailable === 'unavailable') return !product.available;
    return true;
  });

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 6 }}>
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: 'primary.main', color: 'white' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InventoryIcon />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Product Inventory
            </Typography>
            <Chip
              label={`${products.length} items`}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '& .MuiChip-label': { px: 2 },
                height: 40,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}
            />
          </Stack>
        </Box>
        <Box sx={{ px: 3, pt: 2 }}>
          <select
            value={filterAvailable}
            onChange={e => setFilterAvailable(e.target.value as 'all' | 'available' | 'unavailable')}
            style={{ padding: '6px 12px', borderRadius: 4 }}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </Box>
        <List sx={{
          maxHeight: 600,
          overflow: 'auto',
          '& .MuiListItem-root': {
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }
        }}>
          {filteredProducts.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onClick={() => handleOpenInfoModal(product.id)}
              onEdit={() => handleOpenEditModal(product.id)}
              onDelete={() => {
                if (window.confirm('Delete this product?')) {
                  deleteMutation.mutate(product.id);
                }
              }}
            />
          ))}
        </List>
      </Paper>
      <ProductInfoModal
        open={infoModalOpen}
        onClose={handleCloseInfoModal}
        product={selectedProductObj || null}
      />
      <ProductEditModal
        open={modalOpen}
        onClose={handleCloseEditModal}
        productId={selectedProduct}
      />
    </Box>
  );
});

export default ProductList; 