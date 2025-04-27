import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

interface LayoutProps {
  children: ReactNode;
  onAddProduct?: () => void;
}

const Layout = ({ children, onAddProduct }: LayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Inventory Manager
          </Typography>
          <Button
            color="inherit"
            onClick={onAddProduct}
            startIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout; 