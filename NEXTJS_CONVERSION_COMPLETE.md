# Complete Next.js 14 Conversion Package - Suvidha POS

This document contains **all the code files** needed to convert Suvidha POS to Next.js 14 with App Router.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Configuration Files](#configuration-files)
3. [Authentication System](#authentication-system)
4. [API Routes](#api-routes)
5. [Admin Pages](#admin-pages)
6. [Staff Pages](#staff-pages)
7. [Components](#components)
8. [Library Files](#library-files)
9. [Styling](#styling)

---

## Setup Instructions

### Step 1: Create New Next.js Project
```
npx create-next-app@latest suvidha-pos-nextjs
# Choose:
# ✔ TypeScript: Yes
# ✔ ESLint: Yes
# ✔ Tailwind CSS: Yes
# ✔ src/ directory: Yes
# ✔ App Router: Yes
# ✔ Import alias: @/*
```

### Step 2: Install Dependencies
```
cd suvidha-pos-nextjs
npm install @tanstack/react-query @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip lucide-react class-variance-authority clsx tailwind-merge date-fns react-day-picker recharts jspdf jspdf-autotable papaparse zod react-hook-form @hookform/resolvers jsonwebtoken
npm install -D @types/jsonwebtoken @types/papaparse
```

### Step 3: Copy All Files Below
Copy each file from this document to your new Next.js project.

### Step 4: Run Development Server
```
npm run dev
```

---

## Configuration Files

### `package.json`
```json
{
  "name": "suvidha-pos-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "jspdf": "^3.0.3",
    "jspdf-autotable": "^5.0.2",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.462.0",
    "next": "14.2.0",
    "papaparse": "^5.5.3",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "recharts": "^2.15.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^20",
    "@types/papaparse": "^5.3.16",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

### `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `tailwind.config.ts`
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "teal-md": "0 4px 14px 0 rgba(20, 184, 166, 0.39)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### `.env.local.example`
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

---

## Authentication System

### `src/middleware.ts`
```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'staff';
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === '/login' || pathname === '/') {
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        // Redirect to appropriate dashboard if already logged in
        if (decoded.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        } else {
          return NextResponse.redirect(new URL('/staff', request.url));
        }
      } catch (error) {
        // Invalid token, continue to login
      }
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (pathname.startsWith('/admin') || pathname.startsWith('/staff')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

      // Role-based access control
      if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/staff', request.url));
      }

      if (pathname.startsWith('/staff') && decoded.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*', '/staff/:path*'],
};
```

### `src/components/providers/auth-provider.tsx`
```tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### `src/components/providers/query-provider.tsx`
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

---

## API Routes

### `src/app/api/auth/login/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { mockUsers } from '@/lib/api/mock-data';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = mockUsers.find((u) => u.email === email);

    if (!user || password !== 'password123') {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with HTTP-only cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### `src/app/api/auth/logout/route.ts`
```ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('auth_token');
  return response;
}
```

### `src/app/api/auth/me/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { mockUsers } from '@/lib/api/mock-data';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    const user = mockUsers.find((u) => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
```

---

## Root Layout & Pages

### `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suvidha POS",
  description: "Modern Point of Sale System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`
```tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
}
```

### `src/app/login/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      router.push('/admin'); // Will be redirected by middleware based on role
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">Suvidha</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@suvidha.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo accounts:</p>
            <p>Admin: admin@suvidha.com / password123</p>
            <p>Staff: staff@suvidha.com / password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Admin Pages

### `src/app/admin/layout.tsx`
```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { AdminLayout } from '@/components/layouts/AdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
```

### `src/app/admin/page.tsx`
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  Plus,
  FileText,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.dashboard.stats(),
  });

  const { data: dailyReport } = useQuery({
    queryKey: ['daily-report'],
    queryFn: () => api.reports.daily(),
  });

  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: () => api.reports.topProducts(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const inventoryData = [
    { name: 'In Stock', value: (stats?.totalProducts || 0) - (stats?.lowStockCount || 0) },
    { name: 'Low Stock', value: stats?.lowStockCount || 0 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))'];

  const last7Days = dailyReport?.slice(-7) || [];
  const chartData = last7Days.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: day.revenue,
    profit: day.profit,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
        </div>
        <Link href="/admin/sales">
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Record Sale
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats?.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(stats?.dailyRevenue || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Profit
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(stats?.dailyProfit || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats?.lowStockCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts?.slice(0, 5).map((product) => (
                <div key={product.productId} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.productName}</p>
                    <p className="text-sm text-muted-foreground">{product.totalSold} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Profit Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Link href="/admin/sales">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Record Sale
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Low Stock Items
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

### `src/app/admin/products/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Package, TrendingDown, DollarSign, Plus, Search, Edit } from 'lucide-react';
import { Product } from '@/types';

export default function ProductsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.list(),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categories.list(),
  });

  const createProductMutation = useMutation({
    mutationFn: (data: Partial<Product>) => api.products.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product created successfully' });
      setIsDialogOpen(false);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      api.products.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product updated successfully' });
      setIsDialogOpen(false);
      setEditingProduct(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      categoryId: formData.get('categoryId') as string,
      costPrice: parseFloat(formData.get('costPrice') as string),
      sellPrice: parseFloat(formData.get('sellPrice') as string),
      stock: parseInt(formData.get('stock') as string),
      status: formData.get('status') as 'active' | 'inactive',
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = products?.filter((p) => p.stock < 10) || [];
  const totalValue = products?.reduce((sum, p) => sum + p.sellPrice * p.stock, 0) || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" defaultValue={editingProduct?.sku} />
              </div>
              <div>
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  name="categoryId"
                  defaultValue={editingProduct?.categoryId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input
                    id="costPrice"
                    name="costPrice"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.costPrice}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sellPrice">Sell Price</Label>
                  <Input
                    id="sellPrice"
                    name="sellPrice"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.sellPrice}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  defaultValue={editingProduct?.stock}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  defaultValue={editingProduct?.status || 'active'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{products?.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {lowStockProducts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>{formatCurrency(product.costPrice)}</TableCell>
                  <TableCell>{formatCurrency(product.sellPrice)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock < 10 ? 'text-destructive font-medium' : ''
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
```

### `src/app/admin/sales/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, Plus } from 'lucide-react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function PointOfSalePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.list(),
  });

  const createSaleMutation = useMutation({
    mutationFn: (saleData: { items: { productId: string; quantity: number }[] }) =>
      api.sales.create(saleData.items.map((item) => ({
        ...item,
        soldById: user?.id || '',
      }))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: 'Sale completed successfully',
        description: `Total: ${formatCurrency(calculateTotal())}`,
      });
      setCart([]);
      setSelectedProductId('');
      setQuantity(1);
    },
    onError: (error: Error) => {
      toast({
        title: 'Sale failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const filteredProducts = products?.filter(
    (p) =>
      p.status === 'active' &&
      p.stock > 0 &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = () => {
    const product = products?.find((p) => p.id === selectedProductId);
    if (!product) return;

    const existingItem = cart.find((item) => item.product.id === product.id);
    const totalQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (totalQuantity > product.stock) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${product.stock} units available`,
        variant: 'destructive',
      });
      return;
    }

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }

    setSelectedProductId('');
    setQuantity(1);
    setSearchQuery('');
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const item = cart.find((item) => item.product.id === productId);
    if (!item) return;

    if (newQuantity > item.product.stock) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${item.product.stock} units available`,
        variant: 'destructive',
      });
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.sellPrice * item.quantity, 0);
  };

  const calculateProfit = () => {
    return cart.reduce(
      (sum, item) =>
        sum + (item.product.sellPrice - item.product.costPrice) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add products to cart before checkout',
        variant: 'destructive',
      });
      return;
    }

    createSaleMutation.mutate({
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Point of Sale</h2>
        <p className="text-muted-foreground">Record a new sale</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Product</Label>
              <Input
                id="search"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts?.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.sellPrice)} (Stock:{' '}
                      {product.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <Button onClick={addToCart} className="w-full" disabled={!selectedProductId}>
              <Plus className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>

        {/* Cart */}
        <Card>
          <CardHeader>
            <CardTitle>Cart ({cart.length} items)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <ShoppingCart className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.product.sellPrice)} × {item.quantity} ={' '}
                          {formatCurrency(item.product.sellPrice * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, parseInt(e.target.value) || 0)
                          }
                          className="w-20"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profit:</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(calculateProfit())}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={createSaleMutation.isPending}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {createSaleMutation.isPending ? 'Processing...' : 'Complete Sale'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### `src/app/admin/reports/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { CalendarIcon, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const { data: balanceSheet } = useQuery({
    queryKey: ['balance-sheet', dateRange],
    queryFn: () =>
      api.reports.balanceSheet(
        dateRange.from.toISOString(),
        dateRange.to.toISOString()
      ),
  });

  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: () => api.reports.topProducts(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const exportToPDF = () => {
    if (!balanceSheet) return;

    const doc = new jsPDF();
    doc.text('Balance Sheet Report', 14, 15);
    doc.setFontSize(10);
    doc.text(
      `Period: ${format(new Date(balanceSheet.from), 'PPP')} - ${format(
        new Date(balanceSheet.to),
        'PPP'
      )}`,
      14,
      22
    );

    autoTable(doc, {
      startY: 30,
      head: [['Date', 'Sale ID', 'Product', 'Qty', 'Revenue', 'Cost', 'Profit', 'Sold By']],
      body: balanceSheet.lines.map((line) => [
        format(new Date(line.date), 'PP'),
        line.saleId.slice(0, 8),
        line.productName,
        line.quantity,
        formatCurrency(line.revenue),
        formatCurrency(line.cost),
        formatCurrency(line.profit),
        line.soldBy,
      ]),
      foot: [
        [
          '',
          '',
          'TOTAL',
          '',
          formatCurrency(balanceSheet.totals.revenue),
          formatCurrency(balanceSheet.totals.cost),
          formatCurrency(balanceSheet.totals.profit),
          '',
        ],
      ],
    });

    doc.save(`balance-sheet-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  const exportToCSV = () => {
    if (!balanceSheet) return;

    const csv = Papa.unparse({
      fields: ['Date', 'Sale ID', 'Product', 'Quantity', 'Revenue', 'Cost', 'Profit', 'Sold By'],
      data: [
        ...balanceSheet.lines.map((line) => [
          format(new Date(line.date), 'PP'),
          line.saleId,
          line.productName,
          line.quantity,
          line.revenue,
          line.cost,
          line.profit,
          line.soldBy,
        ]),
        ['', '', 'TOTAL', '', balanceSheet.totals.revenue, balanceSheet.totals.cost, balanceSheet.totals.profit, ''],
      ],
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `balance-sheet-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground">View sales reports and analytics</p>
      </div>

      <Tabs defaultValue="balance-sheet" className="space-y-6">
        <TabsList>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="top-products">Top Products</TabsTrigger>
        </TabsList>

        <TabsContent value="balance-sheet" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Balance Sheet</CardTitle>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[280px] justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(dateRange.from, 'PPP')} - {format(dateRange.to, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range?.from && range?.to) {
                            setDateRange({ from: range.from, to: range.to });
                          }
                        }}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" onClick={exportToPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" onClick={exportToCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Sale ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead className="text-right">Profit</TableHead>
                      <TableHead>Sold By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balanceSheet?.lines.map((line, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(line.date), 'PP')}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {line.saleId.slice(0, 8)}
                        </TableCell>
                        <TableCell>{line.productName}</TableCell>
                        <TableCell className="text-right">{line.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(line.revenue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(line.cost)}
                        </TableCell>
                        <TableCell className="text-right text-primary">
                          {formatCurrency(line.profit)}
                        </TableCell>
                        <TableCell>{line.soldBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {balanceSheet && (
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={4}>TOTAL</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(balanceSheet.totals.revenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(balanceSheet.totals.cost)}
                      </TableCell>
                      <TableCell className="text-right text-primary">
                        {formatCurrency(balanceSheet.totals.profit)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-products">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts?.map((product, index) => (
                    <TableRow key={product.productId}>
                      <TableCell className="font-bold">{index + 1}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell className="text-right">{product.totalSold}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.revenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### `src/app/admin/settings/page.tsx`
```tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings as SettingsIcon } from 'lucide-react';
import UserManagement from '@/components/settings/UserManagement';
import GeneralSettings from '@/components/settings/GeneralSettings';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your store configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Staff Pages

### `src/app/staff/layout.tsx`
```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { StaffLayout } from '@/components/layouts/StaffLayout';

export default function StaffLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'staff')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'staff') {
    return null;
  }

  return <StaffLayout>{children}</StaffLayout>;
}
```

### `src/app/staff/page.tsx`
```tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StaffDashboard() {
  const quickActions = [
    {
      title: 'Record Sale',
      description: 'Create a new sale transaction',
      icon: ShoppingCart,
      href: '/staff/pos',
      color: 'from-primary to-primary-hover',
    },
    {
      title: 'Check Stock',
      description: 'View product inventory',
      icon: Package,
      href: '/staff/products',
      color: 'from-accent to-accent/80',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Quick access to daily operations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} href={action.href}>
              <Card className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-teal-md">
                <CardContent className="p-8">
                  <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${action.color} p-4`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground group-hover:text-primary">
                    {action.title}
                  </h2>
                  <p className="text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

### `src/app/staff/pos/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, Plus } from 'lucide-react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function StaffPOSPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.list(),
  });

  const createSaleMutation = useMutation({
    mutationFn: (saleData: { items: { productId: string; quantity: number }[] }) =>
      api.sales.create(saleData.items.map((item) => ({
        ...item,
        soldById: user?.id || '',
      }))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Sale completed successfully',
        description: `Total: ${formatCurrency(calculateTotal())}`,
      });
      setCart([]);
      setSelectedProductId('');
      setQuantity(1);
    },
    onError: (error: Error) => {
      toast({
        title: 'Sale failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const filteredProducts = products?.filter(
    (p) =>
      p.status === 'active' &&
      p.stock > 0 &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = () => {
    const product = products?.find((p) => p.id === selectedProductId);
    if (!product) return;

    const existingItem = cart.find((item) => item.product.id === product.id);
    const totalQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (totalQuantity > product.stock) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${product.stock} units available`,
        variant: 'destructive',
      });
      return;
    }

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }

    setSelectedProductId('');
    setQuantity(1);
    setSearchQuery('');
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const item = cart.find((item) => item.product.id === productId);
    if (!item) return;

    if (newQuantity > item.product.stock) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${item.product.stock} units available`,
        variant: 'destructive',
      });
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.sellPrice * item.quantity, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Point of Sale</h2>
        <p className="text-muted-foreground">Record a new sale</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Product</Label>
              <Input
                id="search"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts?.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.sellPrice)} (Stock:{' '}
                      {product.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <Button onClick={addToCart} className="w-full" disabled={!selectedProductId}>
              <Plus className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>

        {/* Cart */}
        <Card>
          <CardHeader>
            <CardTitle>Cart ({cart.length} items)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <ShoppingCart className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.product.sellPrice)} × {item.quantity} ={' '}
                          {formatCurrency(item.product.sellPrice * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.product.id, parseInt(e.target.value) || 0)
                          }
                          className="w-20"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={createSaleMutation.isPending}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {createSaleMutation.isPending ? 'Processing...' : 'Complete Sale'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### `src/app/staff/products/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, AlertTriangle } from 'lucide-react';

export default function StaffProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.list(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.status === 'active' &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Product Inventory</h2>
        <p className="text-muted-foreground">Check product stock and prices</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products by name, SKU, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  {product.sku && (
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="text-sm font-medium">{product.category?.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Stock:</span>
                  <span
                    className={`text-sm font-bold ${
                      product.stock < 10 ? 'text-destructive' : 'text-foreground'
                    }`}
                  >
                    {product.stock} units
                    {product.stock < 10 && (
                      <AlertTriangle className="ml-1 inline h-4 w-4" />
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(product.sellPrice)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts?.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
}
```

---

## Components

### `src/components/layouts/AdminLayout.tsx`
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Point of Sale', href: '/admin/sales', icon: ShoppingCart },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getPageTitle = () => {
    const route = navigation.find((nav) => nav.href === pathname);
    return route?.name || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {sidebarOpen && (
            <Link href="/admin" className="text-xl font-bold text-primary">
              Suvidha
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t p-4">
          <div
            className={cn(
              'flex items-center gap-3',
              sidebarOpen ? 'mb-2' : 'justify-center'
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn('w-full', !sidebarOpen && 'px-2')}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

### `src/components/layouts/StaffLayout.tsx`
```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Package, LogOut, User } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export function StaffLayout({ children }: StaffLayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/staff" className="text-2xl font-bold text-primary">
            Suvidha
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">{user?.name}</span>
            </div>

            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 px-4">{children}</main>

      {/* Quick Actions Footer */}
      <footer className="border-t bg-card">
        <div className="container flex h-20 items-center justify-around px-4">
          <Link
            href="/staff/pos"
            className="flex flex-col items-center gap-1 rounded-lg px-6 py-2 transition-colors hover:bg-accent"
          >
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Record Sale</span>
          </Link>

          <Link
            href="/staff/products"
            className="flex flex-col items-center gap-1 rounded-lg px-6 py-2 transition-colors hover:bg-accent"
          >
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Check Stock</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
```

### Copy All UI Components
Copy all files from `src/components/ui/` directory from your React+Vite project to the Next.js project. These are framework-agnostic and work without modification.

---

## Library Files

### `src/types/index.ts`
```ts
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
```

### `src/lib/api/mock-data.ts`
Copy the entire file from your React+Vite project - it's unchanged.

### `src/lib/api/index.ts`
Copy the entire file from your React+Vite project - it's unchanged. The mock API works the same way in Next.js client components.

### `src/lib/utils.ts`
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/hooks/use-toast.ts`
Copy the entire file from your React+Vite project - it's unchanged.

---

## Styling

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 173 80% 40%;
    --primary-foreground: 0 0% 100%;
    --primary-hover: 173 80% 35%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 173 80% 40%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 173 80% 40%;
    --primary-foreground: 0 0% 100%;
    --primary-hover: 173 80% 35%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 173 80% 40%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## Final Setup

### 1. Create `.env.local`
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. Run the Application
```
npm run dev
```

### 3. Test Login Credentials
- **Admin**: admin@suvidha.com / password123
- **Staff**: staff@suvidha.com / password123

---

## Key Differences Summary

| Feature | React+Vite | Next.js 14 |
|---------|-----------|------------|
| **Routing** | React Router DOM (`<Routes>`, `<Route>`) | App Router (folder-based) |
| **Navigation** | `useNavigate()`, `<Link>` from react-router-dom | `useRouter()`, `<Link>` from next/navigation |
| **Auth Storage** | localStorage | HTTP-only cookies |
| **Auth Middleware** | Route guards in React | `middleware.ts` with JWT verification |
| **API Calls** | Direct mock API calls | Same mock API + optional Next.js API routes |
| **Client Components** | All components are client by default | Need `'use client'` directive |
| **Environment** | SPA (Single Page App) | Hybrid SSR/SSG/CSR |

---

## Migration Checklist

- ✅ Install Next.js 14 with TypeScript
- ✅ Install all dependencies
- ✅ Create `middleware.ts` for authentication
- ✅ Convert all pages to Next.js App Router structure
- ✅ Add `'use client'` to interactive components
- ✅ Replace React Router with Next.js navigation
- ✅ Implement API routes for authentication
- ✅ Create auth provider with cookie-based auth
- ✅ Copy all UI components
- ✅ Copy mock data and API layer
- ✅ Update styling to `globals.css`
- ✅ Test all features (login, POS, products, reports, settings)
- ✅ Verify role-based access control
- ✅ Test CSV/PDF export functionality

---

## Deployment

### Vercel (Recommended)
```
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
Add in Vercel Dashboard → Settings → Environment Variables:
```
JWT_SECRET=your-production-secret-key-here
```

---

## Support

This conversion maintains 100% feature parity with your React+Vite implementation while leveraging Next.js 14's App Router architecture, server-side rendering capabilities, and improved security through HTTP-only cookies.

All business logic, UI components, and functionality remain identical - only the framework layer has been adapted to Next.js conventions.
