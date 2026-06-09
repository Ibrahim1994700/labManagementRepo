import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface SummaryCard {
  title: string;
  value: number;
  caption: string;
  icon: string;
  tone: 'blue' | 'purple' | 'green' | 'red';
}

interface BookingRow {
  id: string;
  test: string;
  patient: string;
  date: string;
  time: string;
  branch: string;
  payment: 'مدفوع' | 'معلق';
  status: 'مكتمل' | 'ملغي' | 'قيد التنفيذ';
}
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
 activeTab = 'الكل';
  expandedBookingId = 'BK-2024-78915';

  readonly navigation = [
    { label: 'الرئيسية', icon: 'bi-house-door' },
    { label: 'حجوزاتي', icon: 'bi-calendar3', active: true },
    { label: 'السحب المنزلي', icon: 'bi-bicycle' },
    { label: 'الباقات', icon: 'bi-gift' },
    { label: 'التحاليل الفردية', icon: 'bi-eyedropper' },
    { label: 'النتائج', icon: 'bi-check2-square' },
    { label: 'العروض', icon: 'bi-tag' },
    { label: 'حساب العائلة', icon: 'bi-people' },
    { label: 'الوصفة الطبية', icon: 'bi-file-earmark-medical' },
    { label: 'الدعم', icon: 'bi-headset' }
  ];

  readonly summaries: SummaryCard[] = [
    { title: 'إجمالي الحجوزات', value: 12, caption: 'جميع الحجوزات', icon: 'bi-calendar3', tone: 'blue' },
    { title: 'قيد التنفيذ', value: 4, caption: 'حجوزات نشطة', icon: 'bi-hourglass-split', tone: 'purple' },
    { title: 'مكتمل', value: 6, caption: 'حجوزات مكتملة', icon: 'bi-check2-square', tone: 'green' },
    { title: 'ملغي', value: 2, caption: 'حجوزات ملغاة', icon: 'bi-x-circle', tone: 'red' }
  ];

  readonly tabs = ['الكل', 'قيد التنفيذ', 'مكتمل', 'ملغي'];

  readonly bookings: BookingRow[] = [
    {
      id: 'BK-2024-78915',
      test: 'باقة فحص شامل',
      patient: 'أحمد محمد',
      date: '18 مايو 2024',
      time: '09:30 ص',
      branch: 'فرع العليا - الرياض',
      payment: 'مدفوع',
      status: 'قيد التنفيذ'
    },
    {
      id: 'BK-2024-77821',
      test: 'تحليل فيتامين D',
      patient: 'أحمد محمد',
      date: '15 مايو 2024',
      time: '11:00 ص',
      branch: 'فرع النخيل - الرياض',
      payment: 'مدفوع',
      status: 'مكتمل'
    },
    {
      id: 'BK-2024-76344',
      test: 'صورة دم كاملة (CBC)',
      patient: 'أحمد محمد',
      date: '10 مايو 2024',
      time: '08:30 ص',
      branch: 'فرع الرمال - الرياض',
      payment: 'مدفوع',
      status: 'مكتمل'
    },
    {
      id: 'BK-2024-74560',
      test: 'تحليل وظائف الكبد',
      patient: 'أحمد محمد',
      date: '6 مايو 2024',
      time: '04:00 م',
      branch: 'فرع العليا - الرياض',
      payment: 'مدفوع',
      status: 'ملغي'
    },
    {
      id: 'BK-2024-73312',
      test: 'تحليل السكر التراكمي',
      patient: 'أحمد محمد',
      date: '2 مايو 2024',
      time: '10:00 ص',
      branch: 'فرع النرجس - الرياض',
      payment: 'معلق',
      status: 'قيد التنفيذ'
    }
  ];

  toggleBooking(id: string): void {
    this.expandedBookingId = this.expandedBookingId === id ? '' : id;
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  statusClass(status: BookingRow['status']): string {
    if (status === 'مكتمل') return 'status-complete';
    if (status === 'ملغي') return 'status-cancelled';
    return 'status-progress';
  }

  paymentClass(payment: BookingRow['payment']): string {
    return payment === 'مدفوع' ? 'payment-paid' : 'payment-pending';
  }
}
