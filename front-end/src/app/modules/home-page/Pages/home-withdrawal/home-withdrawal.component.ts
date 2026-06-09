import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
}

interface ServiceItem {
  title: string;
  price: number;
  icon: string;
  tone: 'orange' | 'green' | 'pink' | 'purple';
}

interface CalendarDay {
  dayName: string;
  day: number;
  month: string;
  available: boolean;
}
@Component({
  selector: 'app-home-withdrawal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-withdrawal.component.html',
  styleUrl: './home-withdrawal.component.css'
})
export class HomeWithdrawalComponent {
 navItems: NavItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door-fill' },
    { label: 'حجوزاتي', icon: 'bi-calendar3' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle', active: true },
    { label: 'الباقات', icon: 'bi-bag' },
    { label: 'التحاليل الفردية', icon: 'bi-droplet-half' },
    { label: 'النتائج', icon: 'bi-check2-square' },
    { label: 'العروض', icon: 'bi-tag' },
    { label: 'حساب العائلة', icon: 'bi-people' },
    { label: 'الوصفة الطبية', icon: 'bi-file-earmark-medical' },
    { label: 'الدعم', icon: 'bi-headset' }
  ];

  services: ServiceItem[] = [
    { title: 'باقة فيتامينات', price: 199, icon: 'bi-capsule-pill', tone: 'orange' },
    { title: 'باقة فحص شامل', price: 299, icon: 'bi-house-heart', tone: 'green' },
    { title: 'باقة صحة المرأة', price: 349, icon: 'bi-gender-female', tone: 'pink' },
    { title: 'باقة فحص شامل للرجل', price: 399, icon: 'bi-droplet-half-fill', tone: 'purple' }
  ];

  calendarDays: CalendarDay[] = [
    { dayName: 'السبت', day: 24, month: 'مايو', available: true },
    { dayName: 'الأحد', day: 29, month: 'مايو', available: true },
    { dayName: 'الاثنين', day: 28, month: 'مايو', available: true },
    { dayName: 'الثلاثاء', day: 27, month: 'مايو', available: true },
    { dayName: 'الأربعاء', day: 26, month: 'مايو', available: true },
    { dayName: 'الخميس', day: 25, month: 'مايو', available: true },
    { dayName: 'الجمعة', day: 30, month: 'مايو', available: true }
  ];

  times = [
    '08:00 ص - 09:00 ص',
    '09:00 ص - 10:00 ص',
    '10:00 ص - 11:00 ص',
    '11:00 ص - 12:00 م',
    '12:00 م - 01:00 م',
    '01:00 م - 02:00 م'
  ];

  selectedService = 3;
  selectedDay = 5;
  selectedTime = 1;
  selectedPayment = 0;

  get selectedServiceItem(): ServiceItem {
    return this.services[this.selectedService];
  }

  selectService(index: number): void {
    this.selectedService = index;
  }

  selectDay(index: number): void {
    this.selectedDay = index;
  }

  selectTime(index: number): void {
    this.selectedTime = index;
  }

  selectPayment(index: number): void {
    this.selectedPayment = index;
  }
}
