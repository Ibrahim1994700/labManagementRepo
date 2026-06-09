import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NurseSideBarComponent } from '../../../../shared/Components/nurse-side-bar/nurse-side-bar.component';


interface StatCard {
  title: string;
  value: string;
  suffix?: string;
  change: string;
  hint: string;
  icon: string;
  tone: 'green' | 'orange' | 'red' | 'purple' | 'mint' | 'blue';
  link: string;
}

interface Appointment {
  time: string;
  patient: string;
  id: string;
  branch: string;
  status: string;
  statusClass: string;
  payment: string;
  paymentClass: string;
  action: string;
  actionIcon: string;
}

@Component({
  selector: 'app-main-nurse-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './main-nurse-page.component.html',
  styleUrl: './main-nurse-page.component.css'
})
export class MainNursePageComponent {

  stats: StatCard[] = [
    {
      title: 'إيراد اليوم',
      value: '12,450',
      suffix: 'ريال',
      change: '+9%',
      hint: 'عن أمس',
      icon: 'bi-cash-coin',
      tone: 'green',
      link: 'عرض الإيرادات'
    },
    {
      title: 'الوصفات الجديدة',
      value: '5',
      change: '+1',
      hint: 'عن أمس',
      icon: 'bi-prescription2',
      tone: 'orange',
      link: 'عرض الوصفات'
    },
    {
      title: 'نتائج بانتظار الاعتماد',
      value: '11',
      change: '+4',
      hint: 'عن أمس',
      icon: 'bi-flask',
      tone: 'red',
      link: 'مراجعة النتائج'
    },
    {
      title: 'عينات تم جمعها',
      value: '26',
      change: '+18%',
      hint: 'عن أمس',
      icon: 'bi-droplet',
      tone: 'purple',
      link: 'عرض العينات'
    },
    {
      title: 'طلبات السحب المنزلي',
      value: '7',
      change: '+2',
      hint: 'عن أمس',
      icon: 'bi-house-heart',
      tone: 'mint',
      link: 'عرض الطلبات'
    },
    {
      title: 'المرضى المنتظرون',
      value: '14',
      change: '-7%',
      hint: 'عن أمس',
      icon: 'bi-people',
      tone: 'orange',
      link: 'عرض قائمة الانتظار'
    },
    {
      title: 'حجوزات اليوم',
      value: '18',
      change: '+12%',
      hint: 'عن أمس',
      icon: 'bi-calendar-event',
      tone: 'blue',
      link: 'عرض الحجوزات'
    }
  ];

  appointments: Appointment[] = [
    {
      time: '09:00 ص',
      patient: 'أحمد محمد العتيبي',
      id: 'AHM-00123',
      branch: 'الرياض - العليا',
      status: 'في الانتظار',
      statusClass: 'waiting',
      payment: 'مدفوع',
      paymentClass: 'paid',
      action: 'تسجيل وصول',
      actionIcon: 'bi-person-check'
    },
    {
      time: '09:30 ص',
      patient: 'سارة عبدالله الحربي',
      id: 'SAR-00456',
      branch: 'الرياض - النزهة',
      status: 'وصل',
      statusClass: 'arrived',
      payment: 'مدفوع',
      paymentClass: 'paid',
      action: 'بدء الخدمة',
      actionIcon: 'bi-flask'
    },
    {
      time: '10:00 ص',
      patient: 'هشام خالد الشهري',
      id: 'HIS-00789',
      branch: 'جدة - الروضة',
      status: 'في الخدمة',
      statusClass: 'service',
      payment: 'مدفوع',
      paymentClass: 'paid',
      action: 'عرض التفاصيل',
      actionIcon: 'bi-eye'
    },
    {
      time: '10:30 ص',
      patient: 'نورة منصور آل سعود',
      id: 'NOU-00987',
      branch: 'الرياض - العليا',
      status: 'مكتمل',
      statusClass: 'done',
      payment: 'مدفوع',
      paymentClass: 'paid',
      action: 'عرض النتيجة',
      actionIcon: 'bi-bar-chart'
    },
    {
      time: '11:00 ص',
      patient: 'عبدالعزيز ناصر صائم (FBS)',
      id: 'ABD-00321',
      branch: 'الرياض - النزهة',
      status: 'في الانتظار',
      statusClass: 'waiting',
      payment: 'غير مدفوع',
      paymentClass: 'unpaid',
      action: 'تحصيل دفعة',
      actionIcon: 'bi-credit-card'
    }
  ];

  pendingActions = [
    {
      icon: 'bi-prescription2',
      tone: 'blue',
      title: 'وصفة جديدة تحتاج مراجعة',
      meta: 'من د. محمد اليامي - منذ 15 دقيقة'
    },
    {
      icon: 'bi-house-heart',
      tone: 'green',
      title: 'طلب سحب منزلي يحتاج تعيين ممرض',
      meta: 'زيارة في حي النرجس - اليوم، 11:00 ص'
    },
    {
      icon: 'bi-credit-card',
      tone: 'blue',
      title: 'طلب غير مدفوع',
      meta: 'أحمد عبدالمجيد - #HM-2024-71234'
    },
    {
      icon: 'bi-upc-scan',
      tone: 'purple',
      title: 'عينة بانتظار الباركود',
      meta: 'تم جمعها قبل 40 دقيقة - الرياض - العليا'
    }
  ];

  quickActions = [
    { icon: 'bi-person-plus', label: 'تسجيل مريض جديد' },
    { icon: 'bi-calendar-plus', label: 'إنشاء حجز' },
    { icon: 'bi-clipboard2-check', label: 'تسجيل وصول' },
    { icon: 'bi-upc-scan', label: 'طباعة باركود' },
    { icon: 'bi-house-add', label: 'فتح طلب سحب منزلي' },
    { icon: 'bi-credit-card', label: 'تحصيل دفعة' }
  ];

  activity = [
    { time: '09:02', title: 'تسجيل وصول', name: 'أحمد محمد العتيبي', tone: 'blue' },
    { time: '09:31', title: 'جمع عينة دم', name: 'سارة عبدالله الحربي', tone: 'green' },
    { time: '08:45', title: 'إرسال نتيجة', name: 'فاطمة علي القحطاني - تحليل سكر صائم', tone: 'purple' },
    { time: '08:20', title: 'إعادة جدولة حجز', name: 'نورة منصور آل سعود - من 11:30 إلى 10:30', tone: 'orange' }
  ];
 
}
