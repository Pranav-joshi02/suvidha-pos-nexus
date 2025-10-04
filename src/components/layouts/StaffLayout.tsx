import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export function StaffLayout({ children }: StaffLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/staff" className="text-2xl font-bold text-primary">
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
      <main className="flex-1 container py-6 px-4">
        {children}
      </main>

      {/* Quick Actions Footer */}
      <footer className="border-t bg-card">
        <div className="container flex h-20 items-center justify-around px-4">
          <Link
            to="/staff/pos"
            className="flex flex-col items-center gap-1 rounded-lg px-6 py-2 transition-colors hover:bg-accent"
          >
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Record Sale</span>
          </Link>
          
          <Link
            to="/staff/products"
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
