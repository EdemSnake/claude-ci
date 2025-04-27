import { ListItem, ListItemText, IconButton, Typography, Stack, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductListItemProps {
  product: {
    id?: number;
    name: string;
    description?: string;
    price: number;
  };
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductListItem = ({ product, onClick, onEdit, onDelete }: ProductListItemProps) => (
  <>
    <ListItem
      sx={{ px: 3, py: 2, cursor: 'pointer' }}
      onClick={onClick}
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
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
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
            onEdit();
          }}
          sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.light' } }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.light' } }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </ListItem>
    <Divider />
  </>
);

export default ProductListItem; 