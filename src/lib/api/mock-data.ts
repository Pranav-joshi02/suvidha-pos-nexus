// Mock data for development
import { User, Product, Sale, Category, Settings } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Food & Beverages' },
  { id: '4', name: 'Home & Garden' },
  { id: '5', name: 'Sports' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@suvidha.com',
    name: 'Nirmal Kumar',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'staff@suvidha.com',
    name: 'Staff Member',
    role: 'staff',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24',
    sku: 'SAM-S24-BLK',
    categoryId: '1',
    costPrice: 45000,
    sellPrice: 55000,
    stock: 15,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    sku: 'APL-IP15P-BLU',
    categoryId: '1',
    costPrice: 95000,
    sellPrice: 125000,
    stock: 5,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    sku: 'CLO-TSH-WHT',
    categoryId: '2',
    costPrice: 200,
    sellPrice: 500,
    stock: 150,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    sku: 'ELC-MSE-BLK',
    categoryId: '1',
    costPrice: 300,
    sellPrice: 600,
    stock: 3,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Coffee Beans 1kg',
    sku: 'FOD-COF-1KG',
    categoryId: '3',
    costPrice: 800,
    sellPrice: 1200,
    stock: 45,
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockSales: Sale[] = [
  {
    id: 'SAL-001',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 1,
        unitPrice: 55000,
        costPrice: 45000,
        subtotal: 55000,
        profit: 10000,
      },
    ],
    totalAmount: 55000,
    totalCost: 45000,
    totalProfit: 10000,
    soldById: '1',
    createdAt: new Date().toISOString(),
  },
];

export const mockSettings: Settings = {
  lowStockThreshold: 10,
  shopName: 'Suvidha Store',
  shopAddress: '123 Market Street, City, State 123456',
  taxRate: 18,
};

// Auth credentials for testing
export const mockCredentials = {
  admin: { email: 'admin@suvidha.com', password: 'admin123' },
  staff: { email: 'staff@suvidha.com', password: 'staff123' },
};
