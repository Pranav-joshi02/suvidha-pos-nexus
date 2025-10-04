// Mock API layer using TanStack Query
import { 
  User, 
  AuthResponse, 
  Product, 
  Sale, 
  DashboardStats, 
  ReportData,
  TopProduct,
  BalanceSheet,
  Category,
  Settings,
} from '@/types';
import { 
  mockUsers, 
  mockProducts, 
  mockSales, 
  mockCategories,
  mockSettings,
  mockCredentials 
} from './mock-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      await delay(800);
      
      const user = mockUsers.find(u => u.email === email);
      
      if (user && (
        (email === mockCredentials.admin.email && password === mockCredentials.admin.password) ||
        (email === mockCredentials.staff.email && password === mockCredentials.staff.password)
      )) {
        return {
          token: `mock-jwt-token-${user.id}`,
          user,
        };
      }
      
      throw new Error('Invalid credentials');
    },
    
    me: async (token: string): Promise<User> => {
      await delay(300);
      const userId = token.split('-').pop();
      const user = mockUsers.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      return user;
    },
  },

  products: {
    list: async (): Promise<Product[]> => {
      await delay(500);
      return mockProducts.map(p => ({
        ...p,
        category: mockCategories.find(c => c.id === p.categoryId),
      }));
    },
    
    get: async (id: string): Promise<Product> => {
      await delay(300);
      const product = mockProducts.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      return {
        ...product,
        category: mockCategories.find(c => c.id === product.categoryId),
      };
    },
    
    create: async (data: Partial<Product>): Promise<Product> => {
      await delay(500);
      const newProduct: Product = {
        id: `${mockProducts.length + 1}`,
        name: data.name!,
        sku: data.sku,
        categoryId: data.categoryId!,
        costPrice: data.costPrice!,
        sellPrice: data.sellPrice!,
        stock: data.stock!,
        status: data.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      await delay(500);
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      
      mockProducts[index] = {
        ...mockProducts[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      return mockProducts[index];
    },
  },

  categories: {
    list: async (): Promise<Category[]> => {
      await delay(300);
      return mockCategories;
    },
  },

  sales: {
    create: async (data: { productId: string; quantity: number; soldById: string }): Promise<Sale> => {
      await delay(600);
      const product = mockProducts.find(p => p.id === data.productId);
      if (!product) throw new Error('Product not found');
      
      const saleItem = {
        id: '1',
        productId: product.id,
        product,
        quantity: data.quantity,
        unitPrice: product.sellPrice,
        costPrice: product.costPrice,
        subtotal: product.sellPrice * data.quantity,
        profit: (product.sellPrice - product.costPrice) * data.quantity,
      };
      
      const sale: Sale = {
        id: `SAL-${mockSales.length + 1}`.padStart(7, '0'),
        items: [saleItem],
        totalAmount: saleItem.subtotal,
        totalCost: saleItem.costPrice * data.quantity,
        totalProfit: saleItem.profit,
        soldById: data.soldById,
        soldBy: mockUsers.find(u => u.id === data.soldById),
        createdAt: new Date().toISOString(),
      };
      
      mockSales.push(sale);
      
      // Update stock
      product.stock -= data.quantity;
      
      return sale;
    },
    
    list: async (params?: { from?: string; to?: string; page?: number; limit?: number }): Promise<Sale[]> => {
      await delay(500);
      return mockSales.map(s => ({
        ...s,
        soldBy: mockUsers.find(u => u.id === s.soldById),
        items: s.items.map(item => ({
          ...item,
          product: mockProducts.find(p => p.id === item.productId),
        })),
      }));
    },
    
    get: async (id: string): Promise<Sale> => {
      await delay(300);
      const sale = mockSales.find(s => s.id === id);
      if (!sale) throw new Error('Sale not found');
      
      return {
        ...sale,
        soldBy: mockUsers.find(u => u.id === sale.soldById),
        items: sale.items.map(item => ({
          ...item,
          product: mockProducts.find(p => p.id === item.productId),
        })),
      };
    },
  },

  dashboard: {
    stats: async (): Promise<DashboardStats> => {
      await delay(400);
      
      const today = new Date().toDateString();
      const todaySales = mockSales.filter(s => new Date(s.createdAt).toDateString() === today);
      
      return {
        totalProducts: mockProducts.filter(p => p.status === 'active').length,
        dailyRevenue: todaySales.reduce((sum, s) => sum + s.totalAmount, 0),
        dailyProfit: todaySales.reduce((sum, s) => sum + s.totalProfit, 0),
        lowStockCount: mockProducts.filter(p => p.stock < mockSettings.lowStockThreshold).length,
        totalOrders: todaySales.length,
      };
    },
  },

  reports: {
    daily: async (): Promise<ReportData[]> => {
      await delay(600);
      // Generate last 7 days of data
      const data: ReportData[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          revenue: Math.random() * 100000 + 50000,
          cost: Math.random() * 60000 + 30000,
          profit: Math.random() * 40000 + 20000,
        });
      }
      return data;
    },
    
    monthly: async (): Promise<ReportData[]> => {
      await delay(600);
      // Generate last 12 months of data
      const data: ReportData[] = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        data.push({
          date: date.toISOString().split('T')[0].slice(0, 7),
          revenue: Math.random() * 3000000 + 1500000,
          cost: Math.random() * 1800000 + 900000,
          profit: Math.random() * 1200000 + 600000,
        });
      }
      return data;
    },
    
    topProducts: async (): Promise<TopProduct[]> => {
      await delay(500);
      return mockProducts.slice(0, 5).map((p, i) => ({
        productId: p.id,
        productName: p.name,
        totalSold: Math.floor(Math.random() * 100) + 50,
        revenue: (Math.random() * 500000) + 100000,
      }));
    },
    
    balanceSheet: async (from: string, to: string): Promise<BalanceSheet> => {
      await delay(700);
      
      const lines = mockSales.flatMap(sale =>
        sale.items.map(item => ({
          date: sale.createdAt.split('T')[0],
          saleId: sale.id,
          productName: item.product?.name || 'Unknown',
          quantity: item.quantity,
          revenue: item.subtotal,
          cost: item.costPrice * item.quantity,
          profit: item.profit,
          soldBy: sale.soldBy?.name || 'Unknown',
        }))
      );
      
      const totals = lines.reduce(
        (acc, line) => ({
          revenue: acc.revenue + line.revenue,
          cost: acc.cost + line.cost,
          profit: acc.profit + line.profit,
        }),
        { revenue: 0, cost: 0, profit: 0 }
      );
      
      return { from, to, lines, totals };
    },
  },

  settings: {
    get: async (): Promise<Settings> => {
      await delay(300);
      return mockSettings;
    },
    
    update: async (data: Partial<Settings>): Promise<Settings> => {
      await delay(400);
      Object.assign(mockSettings, data);
      return mockSettings;
    },
  },

  users: {
    list: async (): Promise<User[]> => {
      await delay(400);
      return mockUsers.filter(u => u.role === 'staff');
    },
    
    create: async (data: { email: string; name: string; password: string }): Promise<User> => {
      await delay(500);
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email: data.email,
        name: data.name,
        role: 'staff',
        createdAt: new Date().toISOString(),
      };
      mockUsers.push(newUser);
      return newUser;
    },
    
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = mockUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
    },
  },
};
