import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: number;
  change: string;
  action: string;
  icon: string;
  tone: 'orange' | 'blue' | 'purple' | 'cyan' | 'green' | 'red';
}

interface VisitRow {
  orderNo: string;
  patient: string;
  meta: string;
  phone: string;
  city: string;
  address: string;
  time: string;
  tests: number;
  nurse: string;
  nurseAvatar?: boolean;
  payment: string;
  paymentTone: 'paid' | 'unpaid';
  status: string;
  statusTone: 'arrived' | 'team' | 'confirmed';
  expanded?: boolean;
}
@Component({
  selector: 'app-homenursinghomewithdrawal',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './homenursinghomewithdrawal.component.html',
  styleUrl: './homenursinghomewithdrawal.component.css'
})
export class HomenursinghomewithdrawalComponent {
 searchText = '';
  selectedDate = '2024-05-20';
  selectedCity = 'الرياض - العليا';
  selectedAddress = 'الكل';
  selectedNurse = 'الكل';
  selectedVisitStatus = 'الكل';
  selectedPaymentStatus = 'الكل';

  stats: StatCard[] = [
    {
      title: 'طلبات جديدة',
      value: 24,
      change: '+9%',
      action: 'عرض الطلبات',
      icon: 'bi-clipboard-plus',
      tone: 'orange'
    },
    {
      title: 'طلبات مؤكدة',
      value: 24,
      change: '+9%',
      action: 'عرض الجدول',
      icon: 'bi-calendar2-check',
      tone: 'blue'
    },
    {
      title: 'زيارات مؤكدة',
      value: 56,
      change: '+12%',
      action: 'تتبع الرحلات',
      icon: 'bi-calendar2-week',
      tone: 'purple'
    },
    {
      title: 'تم الوصول',
      value: 14,
      change: '+8%',
      action: 'عرض الآن',
      icon: 'bi-geo-alt',
      tone: 'cyan'
    },
    {
      title: 'تم جمع العينات',
      value: 41,
      change: '+15%',
      action: 'عرض العينات',
      icon: 'bi-cup-straw',
      tone: 'green'
    },
    {
      title: 'ملغاة',
      value: 6,
      change: '-2%',
      action: 'عرض الملغاة',
      icon: 'bi-x-circle',
      tone: 'red'
    }
  ];

  visits: VisitRow[] = [
    {
      orderNo: 'HMH-2024-71234',
      patient: 'أحمد محمد العتيبي',
      meta: '37 سنة - ذكر',
      phone: '050 123 4567',
      city: 'الرياض - العليا',
      address: 'شارع التحلية، برج المملكة',
      time: 'اليوم 09:30 ص',
      tests: 12,
      nurse: 'نورة الشهري',
      nurseAvatar: true,
      payment: 'مدفوع',
      paymentTone: 'paid',
      status: 'تم الوصول',
      statusTone: 'arrived',
      expanded: true
    },
    {
      orderNo: 'HMH-2024-71235',
      patient: 'سارة عبدالله الحربي',
      meta: '29 سنة - أنثى',
      phone: '055 987 6543',
      city: 'الرياض - النرجس',
      address: 'حي النرجس، شارع رقم 8',
      time: '10:30 ص',
      tests: 8,
      nurse: 'نورة الشهري',
      nurseAvatar: true,
      payment: 'مدفوع',
      paymentTone: 'paid',
      status: 'في الطريق',
      statusTone: 'team'
    },
    {
      orderNo: 'HMH-2024-71236',
      patient: 'علي خالد المنصور',
      meta: '45 سنة - ذكر',
      phone: '053 222 3344',
      city: 'الرياض - الياسمين',
      address: 'شارع الأمير سعود بن محمد',
      time: '01:00 م',
      tests: 5,
      nurse: 'لم يتم التعيين',
      payment: 'لم يتم الدفع',
      paymentTone: 'unpaid',
      status: 'مؤكدة',
      statusTone: 'confirmed'
    },
    {
      orderNo: 'HMH-2024-71237',
      patient: 'منال فيصل الرويلي',
      meta: '31 سنة - أنثى',
      phone: '054 111 2233',
      city: 'الرياض - الصحافة',
      address: 'حي الصحافة، شارع عبدالرحمن',
      time: '03:00 م',
      tests: 10,
      nurse: 'نورة الشهري',
      nurseAvatar: true,
      payment: 'مدفوع',
      paymentTone: 'paid',
      status: 'مؤكدة',
      statusTone: 'confirmed'
    }
  ];

  checklist = [
    { label: 'تم التحقق من الهوية', checked: false },
    { label: 'تم التأكد من الصيام', checked: false },
    { label: 'تم جمع العينات', checked: false },
    { label: 'تم وضع الباركود', checked: false },
    { label: 'تم تسليم العينات للنقل', checked: false }
  ];

  daySchedule = [
    { time: '08:00', name: 'زيارة سابقة', state: 'انتهت' },
    { time: '09:30', name: 'أحمد محمد العتيبي', state: 'في الطريق/تم الوصول', current: true },
    { time: '11:00', name: 'سارة عبدالله الحربي', state: 'مؤكدة' },
    { time: '01:00 م', name: 'علي خالد المنصور', state: 'مؤكدة' },
    { time: '03:00 م', name: 'منال فيصل الرويلي', state: 'مؤكدة' }
  ];

  toggleRow(row: VisitRow): void {
    this.visits.forEach(item => {
      if (item !== row) item.expanded = false;
    });
    row.expanded = !row.expanded;
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedDate = '2024-05-20';
    this.selectedCity = 'الرياض - العليا';
    this.selectedAddress = 'الكل';
    this.selectedNurse = 'الكل';
    this.selectedVisitStatus = 'الكل';
    this.selectedPaymentStatus = 'الكل';
  }

  trackByOrder(_: number, row: VisitRow): string {
    return row.orderNo;
  }
}
