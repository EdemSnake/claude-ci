import { Dialog, DialogTitle, DialogContent, Box, Typography, Chip, IconButton } from '@mui/material';

interface ProductInfoModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    available: boolean;
    description?: string;
  } | null;
}

const ProductInfoModal = ({ open, onClose, product }: ProductInfoModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle sx={{ p: 0, m: 0, border: 0, bgcolor: 'transparent' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 0 }}>
        <IconButton
          onClick={onClose}
          size="large"
          sx={{
            background: 'none !important',
            boxShadow: 'none !important',
            '&:hover': {
              background: 'none !important',
              boxShadow: 'none !important',
            }
          }}
        >
          <span style={{ fontSize: 28, color: '#888', fontWeight: 700, fontFamily: 'inherit' }}>×</span>
        </IconButton>
      </Box>
    </DialogTitle>
    <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', minHeight: 350 }}>
      {product && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            mx: 'auto',
            my: 2,
            p: 0,
            borderRadius: 4,
            boxShadow: 3,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 260,
              bgcolor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: { sm: '1px solid #f0f0f0', xs: 'none' },
              minHeight: 320,
            }}
          >
            <Typography sx={{ fontSize: 64, color: '#bdbdbd', fontWeight: 700 }}>?</Typography>
          </Box>
          <Box
            sx={{
              flex: 2,
              p: { xs: 3, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-start' },
              minWidth: 300,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
              {product.name}
            </Typography>
            <Chip
              label={product.available ? 'Available' : 'Unavailable'}
              color={product.available ? 'success' : 'error'}
              sx={{ mb: 3, fontWeight: 500, fontSize: '1rem', px: 2, py: 1, borderRadius: 2 }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: '2.5rem', color: 'primary.main', mb: 3, textAlign: { xs: 'center', sm: 'left' } }}>
              ${Number(product.price).toFixed(2)}
            </Typography>
            {product.description && (
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', textAlign: { xs: 'center', sm: 'left' } }}>
                {product.description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </DialogContent>
  </Dialog>
);

export default ProductInfoModal; 