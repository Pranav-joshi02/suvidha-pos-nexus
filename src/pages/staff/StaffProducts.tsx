import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, AlertTriangle } from 'lucide-react';

export default function StaffProducts() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.products.list,
  });

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Product Stock</h1>
        <p className="text-muted-foreground">Check available inventory</p>
      </div>

      <Card className="shadow-teal-sm">
        <CardHeader>
          <CardTitle>Search Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts?.map((product) => (
              <Card key={product.id} className="border-2">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold leading-tight">{product.name}</h3>
                      {product.stock < 10 && (
                        <AlertTriangle className="h-5 w-5 shrink-0 text-orange-500" />
                      )}
                    </div>
                    
                    {product.sku && (
                      <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{product.category?.name || 'General'}</Badge>
                      <Badge
                        variant={product.stock < 10 ? 'destructive' : 'default'}
                        className="font-mono"
                      >
                        Stock: {product.stock}
                      </Badge>
                    </div>
                    
                    <div className="pt-2 text-right">
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(product.sellPrice)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {(!filteredProducts || filteredProducts.length === 0) && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
