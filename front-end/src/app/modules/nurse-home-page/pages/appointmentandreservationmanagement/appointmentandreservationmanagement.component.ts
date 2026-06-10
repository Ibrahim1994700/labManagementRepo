import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface StatCard {
  title: string;
  value: number;
  percentage: string;
  trend: 'up' | 'down';
  icon: string;
  tone: string;
}

interface Appointment {
  bookingNumber: string;
  patientName: string;
  phone: string;
  service: string;
  date: string;
  day: string;
  time: string;
  branch: string;
  bookingType: string;
  paymentStatus: string;
  bookingStatus: string;
  email?: string;
  medicalNumber?: string;
  gender?: string;
  identityNumber?: string;
  city?: string;
  birthDate?: string;
  paymentMethod?: string;
  amount?: string;
}

interface TimelineItem {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
}
@Component({
  selector: 'app-appointmentandreservationmanagement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointmentandreservationmanagement.component.html',
  styleUrl: './appointmentandreservationmanagement.component.css'
})
export class AppointmentandreservationmanagementComponent {
  activeTab = 'all';

  stats: StatCard[] = [
    {
      title: 'إجمالي الحجوزات اليوم',
      value: 124,
      percentage: '+18%',
      trend: 'up',
      icon: 'bi-calendar3',
      tone: 'blue'
    },
    {
      title: 'مؤكدة',
      value: 86,
      percentage: '+15%',
      trend: 'up',
      icon: 'bi-check-circle',
      tone: 'green'
    },
    {
      title: 'قيد التنفيذ',
      value: 22,
      percentage: '+4%',
      trend: 'up',
      icon: 'bi-hourglass-split',
      tone: 'orange'
    },
    {
      title: 'ملغاة',
      value: 8,
      percentage: '-3%',
      trend: 'down',
      icon: 'bi-x-circle',
      tone: 'red'
    },
    {
      title: 'لم يحضر',
      value: 6,
      percentage: '-2%',
      trend: 'down',
      icon: 'bi-person',
      tone: 'purple'
    }
  ];

  appointments: Appointment[] = [
    {
      bookingNumber: '#HM-2024-71234',
      patientName: 'أحمد محمد العتيبي',
      phone: '0555123456',
      service: 'باقة شاملة',
      date: '16/05/2024',
      day: 'الخميس',
      time: '09:00 ص',
      branch: 'الرياض - العليا',
      bookingType: 'حجز مسبق',
      paymentStatus: 'مدفوع',
      bookingStatus: 'مؤكد',
      email: 'ahmed.alotaibi@email.com',
      medicalNumber: 'MR-00024567',
      gender: 'ذكر',
      identityNumber: '1087654321',
      city: 'الرياض',
      birthDate: '06/01/1992 (32 سنة)',
      paymentMethod: 'VISA •••• 4242',
      amount: '280.00 ر.س'
    },
    {
      bookingNumber: '#HM-2024-71235',
      patientName: 'فاطمة عبدالله الزهراني',
      phone: '0538765432',
      service: 'تحليل سكر تراكمي (HbA1c)',
      date: '16/05/2024',
      day: 'الخميس',
      time: '10:30 ص',
      branch: 'جدة - الروضة',
      bookingType: 'حجز مسبق',
      paymentStatus: 'مدفوع',
      bookingStatus: 'قيد التنفيذ'
    },
    {
      bookingNumber: '#HM-2024-71236',
      patientName: 'خالد ناصر الشهري',
      phone: '0509988776',
      service: 'صورة دم كاملة (CBC)',
      date: '16/05/2024',
      day: 'الخميس',
      time: '11:15 ص',
      branch: 'الدمام - الشاطئ',
      bookingType: 'حجز مسبق',
      paymentStatus: 'مدفوع',
      bookingStatus: 'مكتمل'
    },
    {
      bookingNumber: '#HM-2024-71237',
      patientName: 'نورة سعد المطيري',
      phone: '0554433221',
      service: 'تحليل وظائف الكبد (LFT)',
      date: '16/05/2024',
      day: 'الخميس',
      time: '01:00 م',
      branch: 'الرياض - العليا',
      bookingType: 'حجز مسبق',
      paymentStatus: 'مسترد',
      bookingStatus: 'ملغي'
    },
    {
      bookingNumber: '#HM-2024-71238',
      patientName: 'سلطان فهد القحطاني',
      phone: '0598877665',
      service: 'فيتامين د (25-OHD)',
      date: '16/05/2024',
      day: 'الخميس',
      time: '02:00 م',
      branch: 'جدة - السلامة',
      bookingType: 'حجز عادي',
      paymentStatus: 'غير مدفوع',
      bookingStatus: 'لم يحضر'
    },
    {
      bookingNumber: '#HM-2024-71239',
      patientName: 'مريم علي السبيعي',
      phone: '0546677889',
      service: 'تحليل الغدة الدرقية (TSH)',
      date: '16/05/2024',
      day: 'الخميس',
      time: '03:30 م',
      branch: 'الرياض - الملز',
      bookingType: 'حجز مسبق',
      paymentStatus: 'مدفوع',
      bookingStatus: 'قيد التنفيذ'
    },
    {
      bookingNumber: '#HM-2024-71240',
      patientName: 'عبدالله يوسف الحربي',
      phone: '0501239876',
      service: 'تحاليل ما قبل الزواج',
      date: '16/05/2024',
      day: 'الخميس',
      time: '04:30 م',
      branch: 'الدمام - الفيصلية',
      bookingType: 'حجز عادي',
      paymentStatus: 'غير مدفوع',
      bookingStatus: 'مؤكد'
    }
  ];

  selectedAppointment: Appointment = this.appointments[0];

  timeline: TimelineItem[] = [
    {
      title: 'تم إنشاء الحجز',
      date: '16/05/2024 - 08:45 ص',
      status: 'completed'
    },
    {
      title: 'تم التأكيد',
      date: '16/05/2024 - 08:50 ص',
      status: 'completed'
    },
    {
      title: 'تم وصول المريض',
      date: '16/05/2024 - 09:02 ص',
      status: 'current'
    },
    {
      title: 'تم جمع العينة',
      date: '16/05/2024 - 09:08 ص',
      status: 'pending'
    },
    {
      title: 'قيد المعالجة',
      date: '16/05/2024 - 09:25 ص',
      status: 'pending'
    },
    {
      title: 'تم إرسال النتيجة',
      date: '16/05/2024 - 11:20 ص',
      status: 'pending'
    }
  ];

  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  bookingStatusClass(status: string): string {
    switch (status) {
      case 'مؤكد':
        return 'badge-confirmed';

      case 'قيد التنفيذ':
        return 'badge-progress';

      case 'مكتمل':
        return 'badge-completed';

      case 'ملغي':
        return 'badge-cancelled';

      case 'لم يحضر':
        return 'badge-no-show';

      default:
        return 'badge-neutral';
    }
  }

  paymentStatusClass(status: string): string {
    switch (status) {
      case 'مدفوع':
        return 'badge-paid';

      case 'غير مدفوع':
        return 'badge-unpaid';

      case 'مسترد':
        return 'badge-refunded';

      default:
        return 'badge-neutral';
    }
  }
}
