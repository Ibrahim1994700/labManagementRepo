import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: string;
  unit?: string;
  change: string;
  positive: boolean;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'red';
}

interface InvoiceItem {
  name: string;
  price: number;
  insurance: number;
  discount: number;
  total: number;
}

interface Invoice {
  id: number;
  invoiceNo: string;
  patient: string;
  nationalId: string;
  orderNo: string;
  subtotal: number;
  discount: number;
  vat: number;
  insurance: number;
  total: number;
  payment: 'بطاقة مدى' | 'نقدي' | 'بطاقة ائتمان';
  cashier: string;
  status: 'مدفوعة' | 'جزئية' | 'غير مدفوعة';
  coupon: string;
  insuranceCompany: string;
  insuranceRef: string;
  notes: string;
  items: InvoiceItem[];
}
@Component({
  selector: 'app-billsand-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billsand-payments.component.html',
  styleUrl: './billsand-payments.component.css'
})
export class BillsandPaymentsComponent {
searchTerm = '';
  invoiceStatus = 'كل الحالات';
  paymentMethod = 'كل الطرق';
  branch = 'كل الفروع';
  cashier = 'الكل';
  insurance = 'كل شركات التأمين';
  dateFrom = '2024/05/18';
  dateTo = '2024/05/18';
  selectedId = 1;
  compactView = false;

  stats: StatCard[] = [
    { title: 'الخصومات المطبقة', value: '620', unit: 'ر.س', change: '+8%', positive: true, icon: 'bi-tags', tone: 'blue' },
    { title: 'المستردات', value: '450', unit: 'ر.س', change: '+3%', positive: true, icon: 'bi-arrow-return-right', tone: 'purple' },
    { title: 'الطلبات غير المدفوعة', value: '38', change: '-5%', positive: false, icon: 'bi-clipboard2-x', tone: 'red' },
    { title: 'مدفوعات بطاقات', value: '7,780', unit: 'ر.س', change: '+12%', positive: true, icon: 'bi-credit-card-2-front', tone: 'blue' },
    { title: 'مدفوعات نقدية', value: '4,230', unit: 'ر.س', change: '+6%', positive: true, icon: 'bi-cash', tone: 'green' },
    { title: 'إجمالي الإيرادات اليوم', value: '12,450', unit: 'ر.س', change: '+9%', positive: true, icon: 'bi-cash-coin', tone: 'green' }
  ];

  invoices: Invoice[] = [
    {
      id: 1,
      invoiceNo: 'INV-2024-0518-0012',
      patient: 'أحمد محمد العتيبي',
      nationalId: '1001234567',
      orderNo: 'ORD-2024-1175',
      subtotal: 345,
      discount: 10,
      vat: 50.25,
      insurance: 70,
      total: 315.25,
      payment: 'بطاقة مدى',
      cashier: 'نورة السبيعي',
      status: 'مدفوعة',
      coupon: 'WELCOME10',
      insuranceCompany: 'تكافل العربية',
      insuranceRef: 'TAK-2024-556677',
      notes: 'المريض طلب نسخة إلكترونية من الفاتورة وإرسالها عبر البريد.',
      items: [
        { name: 'صورة دم كاملة (CBC)', price: 40, insurance: 0, discount: 0, total: 40 },
        { name: 'سكر صائم (FBS)', price: 25, insurance: 0, discount: 0, total: 25 },
        { name: 'فيتامين د (25-OH)', price: 150, insurance: 20, discount: 10, total: 120 },
        { name: 'باقة صحة شاملة', price: 120, insurance: 50, discount: 0, total: 120 }
      ]
    },
    {
      id: 2,
      invoiceNo: 'INV-2024-0518-0011',
      patient: 'سارة عبدالله الحربي',
      nationalId: '1009876543',
      orderNo: 'ORD-2024-1174',
      subtotal: 560,
      discount: 0,
      vat: 84,
      insurance: 0,
      total: 644,
      payment: 'بطاقة مدى',
      cashier: 'أحمد الشراري',
      status: 'مدفوعة',
      coupon: '—',
      insuranceCompany: '—',
      insuranceRef: '—',
      notes: 'لا توجد ملاحظات.',
      items: [{ name: 'باقة فحوصات متقدمة', price: 560, insurance: 0, discount: 0, total: 560 }]
    },
    {
      id: 3,
      invoiceNo: 'INV-2024-0518-0010',
      patient: 'محمد خالد الشهري',
      nationalId: '1012345678',
      orderNo: 'ORD-2024-1173',
      subtotal: 230,
      discount: 20,
      vat: 31.5,
      insurance: 0,
      total: 241.5,
      payment: 'نقدي',
      cashier: 'سارة القحطاني',
      status: 'مدفوعة',
      coupon: 'SAVE20',
      insuranceCompany: '—',
      insuranceRef: '—',
      notes: 'تم الدفع نقداً.',
      items: [{ name: 'فحوصات دورية', price: 230, insurance: 0, discount: 20, total: 210 }]
    },
    {
      id: 4,
      invoiceNo: 'INV-2024-0518-0009',
      patient: 'نورة منصور آل سعود',
      nationalId: '1004567890',
      orderNo: 'ORD-2024-1172',
      subtotal: 780,
      discount: 0,
      vat: 117,
      insurance: 156,
      total: 741,
      payment: 'بطاقة ائتمان',
      cashier: 'أحمد الشراري',
      status: 'جزئية',
      coupon: '—',
      insuranceCompany: 'شركة التأمين الوطنية',
      insuranceRef: 'INS-2024-44910',
      notes: 'جزء من المبلغ مغطى بالتأمين.',
      items: [{ name: 'باقة تحاليل شاملة', price: 780, insurance: 156, discount: 0, total: 624 }]
    },
    {
      id: 5,
      invoiceNo: 'INV-2024-0518-0008',
      patient: 'عبدالعزيز ناصر بدر',
      nationalId: '1001357924',
      orderNo: 'ORD-2024-1171',
      subtotal: 420,
      discount: 15,
      vat: 60.75,
      insurance: 0,
      total: 465.75,
      payment: 'بطاقة مدى',
      cashier: 'نورة السبيعي',
      status: 'غير مدفوعة',
      coupon: 'LAB15',
      insuranceCompany: '—',
      insuranceRef: '—',
      notes: 'بانتظار تحصيل المبلغ.',
      items: [{ name: 'تحاليل هرمونات', price: 420, insurance: 0, discount: 15, total: 405 }]
    }
  ];

  alerts = [
    { level: 'عالية', title: 'فاتورة متأخرة تجاوزت المهلة', ref: '#ORD-2024-1174', amount: '324.00 ر.س', age: 'منذ 15 دقيقة' },
    { level: 'متوسطة', title: 'فاتورة مدفوعة جزئياً', ref: '#ORD-2024-1173', amount: '241.50 ر.س', age: 'منذ 1 ساعة' },
    { level: 'منخفضة', title: 'طلب استرداد بانتظار المراجعة', ref: '#REF-2024-0056', amount: '741.00 ر.س', age: 'منذ 3 ساعات' }
  ];

  hourlyRevenue = [12, 18, 28, 39, 50, 36, 67, 42, 79, 58, 74, 64, 40, 50, 70, 58, 80, 61, 78, 32, 45, 80, 60, 55];
  hourlyCollected = [4, 7, 12, 18, 21, 14, 31, 22, 37, 24, 35, 30, 18, 20, 32, 26, 37, 31, 42, 15, 19, 43, 28, 35];

  get filteredInvoices(): Invoice[] {
    const q = this.searchTerm.trim().toLowerCase();
    return this.invoices.filter((invoice) => {
      const matchesSearch = !q || [invoice.invoiceNo, invoice.patient, invoice.orderNo, invoice.nationalId]
        .some((value) => value.toLowerCase().includes(q));
      const matchesStatus = this.invoiceStatus === 'كل الحالات' || invoice.status === this.invoiceStatus;
      const matchesPayment = this.paymentMethod === 'كل الطرق' || invoice.payment === this.paymentMethod;
      const matchesCashier = this.cashier === 'الكل' || invoice.cashier === this.cashier;
      return matchesSearch && matchesStatus && matchesPayment && matchesCashier;
    });
  }

  get selectedInvoice(): Invoice {
    return this.invoices.find((invoice) => invoice.id === this.selectedId) ?? this.invoices[0];
  }

  selectInvoice(id: number): void {
    this.selectedId = id;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.invoiceStatus = 'كل الحالات';
    this.paymentMethod = 'كل الطرق';
    this.branch = 'كل الفروع';
    this.cashier = 'الكل';
    this.insurance = 'كل شركات التأمين';
  }

  formatMoney(value: number): string {
    return value.toFixed(2);
  }

  paymentIcon(method: Invoice['payment']): string {
    return method === 'نقدي' ? 'bi-cash' : 'bi-credit-card-2-front';
  }

  alertClass(level: string): string {
    if (level === 'عالية') return 'danger';
    if (level === 'متوسطة') return 'warning';
    return 'info';
  }

  trackById(_: number, item: Invoice): number {
    return item.id;
  }
}
