import { Link } from 'react-router-dom';
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
            <Link key={action.title} to={action.href}>
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
