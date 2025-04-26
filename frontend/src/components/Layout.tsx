import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Inventory Manager
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/products/new"
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