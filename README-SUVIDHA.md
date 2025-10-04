# Suvidha POS System

A modern, feature-rich Point of Sale (POS) web application for retail stores, built with React, TypeScript, and Tailwind CSS.

## 🎯 Overview

Suvidha is a comprehensive POS system designed for retail shops, featuring inventory management, sales tracking, reporting, and user management. The application is built with a beautiful teal-themed UI and supports two user roles: Admin (shop owner) and Staff.

## ✨ Key Features

### 👤 User Roles

#### Admin (Shop Owner)
- Full dashboard with KPIs and analytics
- Complete product inventory management
- Sales recording and history
- Advanced reporting with charts
- Balance sheet export (CSV & PDF)
- Staff user management
- Store settings configuration

#### Staff
- Simplified dashboard
- Quick POS for recording sales
- Product stock checking
- Printable receipts

### 🛒 Core Functionality

1. **Product Management**
   - Add, edit, and view products
   - Track SKU, category, cost price, sell price, and stock
   - Low-stock alerts
   - Product search and filtering

2. **Point of Sale (POS)**
   - Fast product selection
   - Real-time cart management
   - Quantity adjustments
   - Total and profit calculations
   - Instant sale recording

3. **Sales & Receipts**
   - Transaction history
   - Printable receipts with shop details
   - PDF receipt download
   - Sale tracking by staff member

4. **Reports & Analytics**
   - KPI dashboard (Total Products, Daily Revenue, Daily Profit, Low Stock)
   - Daily and monthly sales trends (charts)
   - Top 5 selling products
   - Revenue vs Profit analysis
   - Inventory status visualization

5. **Balance Sheet Export**
   - Export presets: Today, Last 7 days, Last Month, Last Quarter, Last Year
   - CSV and PDF export options
   - Preview before download
   - Detailed line items with totals

6. **Settings**
   - Shop name and address
   - Low-stock threshold
   - Tax rate configuration
   - Staff user management

## 🎨 Design

- **Theme**: Modern teal/turquoise color scheme
- **UI Components**: Built with shadcn/ui
- **Responsive**: Fully responsive design for desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard navigation
- **Print Styles**: Optimized receipt printing

## 🔧 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Forms**: react-hook-form + zod validation
- **Charts**: Recharts
- **Icons**: lucide-react
- **PDF Generation**: jsPDF + jspdf-autotable
- **CSV Export**: papaparse
- **Routing**: React Router v6

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build

```bash
npm run build
```

## 👥 Demo Credentials

### Admin Login
- **Email**: admin@suvidha.com
- **Password**: admin123

### Staff Login
- **Email**: staff@suvidha.com
- **Password**: staff123

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/          # AdminLayout, StaffLayout
│   ├── settings/         # Settings page components
│   └── ui/              # shadcn/ui components
├── contexts/            # AuthContext
├── hooks/              # Custom hooks
├── lib/
│   ├── api/            # Mock API layer
│   │   ├── index.ts    # API functions
│   │   └── mock-data.ts # Mock data
│   └── utils.ts        # Utility functions
├── pages/
│   ├── admin/          # Admin pages
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── PointOfSale.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   ├── staff/          # Staff pages
│   │   ├── StaffDashboard.tsx
│   │   ├── StaffPOS.tsx
│   │   └── StaffProducts.tsx
│   ├── Login.tsx
│   ├── PrintReceipt.tsx
│   └── NotFound.tsx
├── types/              # TypeScript type definitions
└── App.tsx            # Main app with routing
```

## 🔐 Authentication

The application uses JWT-based authentication with:
- Secure token storage in localStorage
- Protected routes based on user roles
- Auto-redirect for authenticated users
- Session persistence across page reloads

## 📊 Mock Data

The application includes a complete mock API layer that simulates:
- User authentication
- Product CRUD operations
- Sales transactions
- Dashboard statistics
- Report generation
- Settings management

This allows full demonstration of features without requiring a backend.

## 🔄 Future Backend Integration

The application is designed for easy backend integration:

1. Replace mock API in `src/lib/api/index.ts` with real API calls
2. Update authentication to use real JWT tokens
3. Connect to PostgreSQL database via Prisma
4. Add Stripe integration for payments
5. Implement email notifications

### Expected API Endpoints

```
POST   /api/auth/login
GET    /api/me
GET    /api/products
POST   /api/products
PUT    /api/products/:id
POST   /api/sales
GET    /api/sales
GET    /api/sales/:id
GET    /api/dashboard/stats
GET    /api/reports/daily
GET    /api/reports/monthly
GET    /api/reports/top-products
GET    /api/reports/balancesheet
GET    /api/settings
PUT    /api/settings
GET    /api/users
POST   /api/users
DELETE /api/users/:id
```

## 🎯 Key Pages & Routes

### Public Routes
- `/login` - Login page

### Admin Routes (protected)
- `/admin` - Dashboard
- `/admin/products` - Product list
- `/admin/sales` - POS / Record sale
- `/admin/reports` - Reports & analytics
- `/admin/settings` - Settings & user management

### Staff Routes (protected)
- `/staff` - Staff dashboard
- `/staff/pos` - Point of sale
- `/staff/products` - View stock

### Shared Routes
- `/print/receipt/:saleId` - Printable receipt

## 🎨 Design System

The application uses a comprehensive design system defined in:
- `src/index.css` - CSS custom properties (colors, shadows, gradients)
- `tailwind.config.ts` - Tailwind configuration

### Primary Colors
- Primary: `hsl(174, 54%, 56%)` - Teal
- Accent: `hsl(174, 44%, 36%)` - Dark teal
- Background: Light gray with subtle gradients

### Components
All UI components follow consistent styling using shadcn/ui base components with custom teal theme.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)
- Touch-friendly interface for POS operations
- Collapsible sidebar on small screens

## 🖨️ Printing

Receipts are optimized for printing with:
- Clean print layout (thermal printer compatible)
- Hidden UI elements during print
- Proper page breaks
- 80mm thermal printer support

## 📦 Export Features

### Balance Sheet Export
- **CSV**: Tabular format with all transactions
- **PDF**: Formatted report with shop branding
- **Presets**: Today, Week, Month, Quarter, Year
- **Preview**: Review data before downloading

## 🔒 Security Best Practices

- Input validation using zod schemas
- Protected routes with role-based access
- No sensitive data in console logs (production)
- Secure token storage
- XSS prevention through React's built-in protection

## 🚧 Known Limitations (Mock Version)

1. Single-item sales (first cart item processed)
2. No pagination on tables
3. No image uploads
4. No real-time stock updates
5. No multi-user concurrent sales
6. No database persistence (browser refresh resets data)

These will be resolved when connected to a real backend.

## 📝 Notes

- This is a **frontend-only** implementation
- All data is mocked and stored in memory
- Refresh the page to reset mock data
- Designed for easy backend integration
- Production-ready UI/UX

## 🤝 Contributing

When adding features:
1. Follow the existing code structure
2. Use TypeScript types from `src/types/`
3. Add mock data to `src/lib/api/mock-data.ts`
4. Update API functions in `src/lib/api/index.ts`
5. Use the design system tokens (no hardcoded colors)
6. Test on multiple screen sizes

## 📄 License

Built for Suvidha Store. All rights reserved.

---

Built with ❤️ using Lovable
