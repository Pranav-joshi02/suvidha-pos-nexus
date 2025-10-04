import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'sonner';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type DatePreset = 'today' | 'week' | 'month' | 'quarter' | 'year';

export default function Reports() {
  const [datePreset, setDatePreset] = useState<DatePreset>('week');

  const { data: dailyReport } = useQuery({
    queryKey: ['reports-daily'],
    queryFn: api.reports.daily,
  });

  const { data: monthlyReport } = useQuery({
    queryKey: ['reports-monthly'],
    queryFn: api.reports.monthly,
  });

  const { data: topProducts } = useQuery({
    queryKey: ['reports-top-products'],
    queryFn: api.reports.topProducts,
  });

  const { data: balanceSheet } = useQuery({
    queryKey: ['reports-balance-sheet', datePreset],
    queryFn: () => {
      const { from, to } = getDateRange(datePreset);
      return api.reports.balanceSheet(from, to);
    },
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  function getDateRange(preset: DatePreset): { from: string; to: string } {
    const to = new Date();
    const from = new Date();

    switch (preset) {
      case 'today':
        from.setHours(0, 0, 0, 0);
        break;
      case 'week':
        from.setDate(to.getDate() - 7);
        break;
      case 'month':
        from.setMonth(to.getMonth() - 1);
        break;
      case 'quarter':
        from.setMonth(to.getMonth() - 3);
        break;
      case 'year':
        from.setFullYear(to.getFullYear() - 1);
        break;
    }

    return {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
    };
  }

  const downloadCSV = () => {
    if (!balanceSheet) {
      toast.error('No data to export');
      return;
    }

    const csvData = balanceSheet.lines.map((line) => ({
      Date: line.date,
      'Sale ID': line.saleId,
      Product: line.productName,
      Quantity: line.quantity,
      Revenue: line.revenue,
      Cost: line.cost,
      Profit: line.profit,
      'Sold By': line.soldBy,
    }));

    // Add totals row
    csvData.push({
      Date: 'TOTAL',
      'Sale ID': '',
      Product: '',
      Quantity: '',
      Revenue: balanceSheet.totals.revenue,
      Cost: balanceSheet.totals.cost,
      Profit: balanceSheet.totals.profit,
      'Sold By': '',
    } as any);

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `balance-sheet-${datePreset}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('CSV downloaded successfully');
  };

  const downloadPDF = () => {
    if (!balanceSheet) {
      toast.error('No data to export');
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Balance Sheet Report', 14, 20);
    
    doc.setFontSize(11);
    doc.text(`Period: ${balanceSheet.from} to ${balanceSheet.to}`, 14, 28);

    // Table data
    const tableData = balanceSheet.lines.map((line) => [
      line.date,
      line.saleId,
      line.productName,
      line.quantity,
      formatCurrency(line.revenue),
      formatCurrency(line.cost),
      formatCurrency(line.profit),
      line.soldBy,
    ]);

    // Add totals row
    tableData.push([
      'TOTAL',
      '',
      '',
      '',
      formatCurrency(balanceSheet.totals.revenue),
      formatCurrency(balanceSheet.totals.cost),
      formatCurrency(balanceSheet.totals.profit),
      '',
    ]);

    // @ts-ignore - autoTable is added by plugin
    doc.autoTable({
      head: [['Date', 'Sale ID', 'Product', 'Qty', 'Revenue', 'Cost', 'Profit', 'Sold By']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [78, 205, 196] },
      footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' },
    });

    doc.save(`balance-sheet-${datePreset}-${Date.now()}.pdf`);
    toast.success('PDF downloaded successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
        <p className="text-muted-foreground">View sales trends and export balance sheets</p>
      </div>

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {/* Daily Trend */}
          <Card className="shadow-teal-sm">
            <CardHeader>
              <CardTitle>Daily Sales Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyReport}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
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

          {/* Monthly Trend */}
          <Card className="shadow-teal-sm">
            <CardHeader>
              <CardTitle>Monthly Sales Trend (Last 12 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyReport}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `₹${value / 1000000}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
                  <Bar dataKey="profit" fill="hsl(var(--accent))" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="shadow-teal-sm">
            <CardHeader>
              <CardTitle>Top 5 Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts?.map((product, index) => (
                  <div key={product.productId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.totalSold} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatCurrency(product.revenue)}
                      </p>
                      <p className="text-sm text-muted-foreground">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="space-y-6">
          <Card className="shadow-teal-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Balance Sheet Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range Selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Period:</span>
                </div>
                <Select value={datePreset} onValueChange={(v) => setDatePreset(v as DatePreset)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary */}
              {balanceSheet && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(balanceSheet.totals.revenue)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(balanceSheet.totals.cost)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm text-muted-foreground">Total Profit</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(balanceSheet.totals.profit)}
                    </p>
                  </div>
                </div>
              )}

              {/* Export Buttons */}
              <div className="flex gap-3">
                <Button onClick={downloadCSV} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
                <Button onClick={downloadPDF} variant="secondary" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              {/* Preview Table */}
              {balanceSheet && balanceSheet.lines.length > 0 && (
                <div className="rounded-lg border">
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-muted">
                        <tr>
                          <th className="p-3 text-left">Date</th>
                          <th className="p-3 text-left">Sale ID</th>
                          <th className="p-3 text-left">Product</th>
                          <th className="p-3 text-right">Qty</th>
                          <th className="p-3 text-right">Revenue</th>
                          <th className="p-3 text-right">Cost</th>
                          <th className="p-3 text-right">Profit</th>
                          <th className="p-3 text-left">Sold By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {balanceSheet.lines.map((line, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">{line.date}</td>
                            <td className="p-3">{line.saleId}</td>
                            <td className="p-3">{line.productName}</td>
                            <td className="p-3 text-right">{line.quantity}</td>
                            <td className="p-3 text-right">{formatCurrency(line.revenue)}</td>
                            <td className="p-3 text-right">{formatCurrency(line.cost)}</td>
                            <td className="p-3 text-right font-medium text-primary">
                              {formatCurrency(line.profit)}
                            </td>
                            <td className="p-3">{line.soldBy}</td>
                          </tr>
                        ))}
                        <tr className="border-t bg-muted font-bold">
                          <td className="p-3" colSpan={4}>
                            TOTAL
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(balanceSheet.totals.revenue)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(balanceSheet.totals.cost)}
                          </td>
                          <td className="p-3 text-right text-primary">
                            {formatCurrency(balanceSheet.totals.profit)}
                          </td>
                          <td className="p-3"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
