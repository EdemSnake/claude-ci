import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './ProductList';
import { getProducts } from '../services/api';

// Mock the API
jest.mock('../services/api', () => ({
  getProducts: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    description: 'Test Description 1',
    price: 10.99,
    stock_quantity: 100,
    available: true,
  },
  {
    id: 2,
    name: 'Test Product 2',
    description: 'Test Description 2',
    price: 20.99,
    stock_quantity: 50,
    available: false,
  },
];

describe('ProductList', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders product list correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );

    // Check if loading state is shown
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for products to load
    const product1 = await screen.findByText('Test Product 1');
    const product2 = await screen.findByText('Test Product 2');

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
    expect(screen.getByText('$20.99')).toBeInTheDocument();
  });

  it('toggles available filter', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    );

    // Wait for products to load
    await screen.findByText('Test Product 1');

    // Toggle the switch
    const switchElement = screen.getByLabelText('Show available products only');
    fireEvent.click(switchElement);

    // Verify that getProducts was called with the correct parameter
    expect(getProducts).toHaveBeenCalledWith(true);
  });
}); 