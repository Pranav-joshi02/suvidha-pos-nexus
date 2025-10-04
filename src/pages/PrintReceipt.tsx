import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';

export default function PrintReceipt() {
  const { saleId } = useParams<{ saleId: string }>();
  const navigate = useNavigate();

  const { data: sale, isLoading } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => api.sales.get(saleId!),
    enabled: !!saleId,
  });

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: api.settings.get,
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!sale) return;

    const doc = new jsPDF({
      unit: 'mm',
      format: [80, 200], // Thermal printer width
    });

    let y = 10;
    const lineHeight = 5;

    // Header
    doc.setFontSize(14);
    doc.text(settings?.shopName || 'Suvidha Store', 40, y, { align: 'center' });
    y += lineHeight;
    
    doc.setFontSize(8);
    doc.text(settings?.shopAddress || '', 40, y, { align: 'center' });
    y += lineHeight * 2;

    // Receipt info
    doc.setFontSize(10);
    doc.text(`Receipt #: ${sale.id}`, 5, y);
    y += lineHeight;
    doc.text(`Date: ${formatDate(sale.createdAt)}`, 5, y);
    y += lineHeight;
    doc.text(`Cashier: ${sale.soldBy?.name || 'Staff'}`, 5, y);
    y += lineHeight * 2;

    // Items
    doc.text('ITEMS', 5, y);
    y += lineHeight;
    doc.text('─'.repeat(40), 5, y);
    y += lineHeight;

    sale.items.forEach((item) => {
      doc.text(`${item.product?.name || 'Product'}`, 5, y);
      y += lineHeight;
      doc.text(
        `  ${item.quantity} x ${formatCurrency(item.unitPrice)}`,
        5,
        y
      );
      doc.text(formatCurrency(item.subtotal), 70, y, { align: 'right' });
      y += lineHeight;
    });

    y += lineHeight;
    doc.text('─'.repeat(40), 5, y);
    y += lineHeight;

    // Totals
    doc.setFontSize(12);
    doc.text('TOTAL:', 5, y);
    doc.text(formatCurrency(sale.totalAmount), 70, y, { align: 'right' });
    y += lineHeight * 2;

    // Footer
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 40, y, { align: 'center' });

    doc.save(`receipt-${sale.id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Sale not found</p>
          <Button onClick={() => navigate('/admin')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Action Buttons - Hidden on print */}
      <div className="no-print mb-6 flex justify-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownloadPDF} variant="secondary" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Receipt */}
      <div className="print-receipt mx-auto max-w-md rounded-lg border bg-card p-8 shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{settings?.shopName || 'Suvidha Store'}</h1>
            <p className="text-sm text-muted-foreground">
              {settings?.shopAddress || '123 Market Street'}
            </p>
          </div>

          {/* Receipt Info */}
          <div className="space-y-1 border-y py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt #:</span>
              <span className="font-medium">{sale.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{formatDate(sale.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cashier:</span>
              <span className="font-medium">{sale.soldBy?.name || 'Staff'}</span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h2 className="font-semibold">Items</h2>
            {sale.items.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{item.product?.name || 'Product'}</span>
                  <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </span>
                  <span>Profit: {formatCurrency(item.profit)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 border-t pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{formatCurrency(sale.totalAmount)}</span>
            </div>
            {settings?.taxRate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax ({settings.taxRate}%):</span>
                <span className="font-medium">
                  {formatCurrency((sale.totalAmount * settings.taxRate) / 100)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">{formatCurrency(sale.totalAmount)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p>Visit again soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
