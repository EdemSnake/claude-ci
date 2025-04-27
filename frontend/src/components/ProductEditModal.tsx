import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ProductForm from './ProductForm';

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  productId: number | null;
}

const ProductEditModal = ({ open, onClose, productId }: ProductEditModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{productId ? 'Edit Product' : 'Add Product'}</DialogTitle>
    <DialogContent>
      <ProductForm productId={productId} onSaved={onClose} />
    </DialogContent>
  </Dialog>
);

export default ProductEditModal; 