// Core types for Suvidha POS system

export type UserRole = 'admin' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  categoryId: string;
  category?: Category;
  costPrice: number;
  sellPrice: number;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SaleItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  subtotal: number;
  profit: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  totalAmount: number;
  totalCost: number;
  totalProfit: number;
  soldById: string;
  soldBy?: User;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  dailyRevenue: number;
  dailyProfit: number;
  lowStockCount: number;
  totalOrders: number;
}

export interface ReportData {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
}

export interface BalanceSheetLine {
  date: string;
  saleId: string;
  productName: string;
  quantity: number;
  revenue: number;
  cost: number;
  profit: number;
  soldBy: string;
}

export interface BalanceSheet {
  from: string;
  to: string;
  lines: BalanceSheetLine[];
  totals: {
    revenue: number;
    cost: number;
    profit: number;
  };
}

export interface Settings {
  lowStockThreshold: number;
  shopName: string;
  shopAddress: string;
  taxRate: number;
}
