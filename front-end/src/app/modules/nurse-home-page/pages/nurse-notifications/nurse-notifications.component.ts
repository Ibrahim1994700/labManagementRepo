import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  tone: 'danger' | 'warning' | 'primary' | 'purple' | 'success' | 'blue';
}

interface FilterItem {
  label: string;
  count: number;
  tone: 'danger' | 'warning' | 'primary' | 'purple' | 'success' | 'muted';
}

interface NotificationItem {
  id: number;
  type: string;
  typeIcon: string;
  typeTone: 'danger' | 'warning' | 'primary' | 'purple' | 'success';
  title: string;
  description: string;
  reference: string;
  referenceType: string;
  time: string;
  ago: string;
  priority: 'عاجل' | 'متوسط' | 'منخفض';
  read: boolean;
}

@Component({
  selector: 'app-nurse-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nurse-notifications.component.html',
  styleUrl: './nurse-notifications.component.css'
})
export class NurseNotificationsComponent {
 activeFilter = 'الكل';
  selectedNotificationId = 1;

  readonly statCards: StatCard[] = [
    { title: 'غير مقروءة', value: 18, subtitle: 'من 56 إشعار', icon: 'bi-exclamation-triangle', tone: 'danger' },
    { title: 'عاجلة', value: 6, subtitle: 'تحتاج إجراء فوري', icon: 'bi-exclamation-triangle', tone: 'warning' },
    { title: 'اليوم', value: 24, subtitle: 'إشعار اليوم', icon: 'bi-calendar2-event', tone: 'primary' },
    { title: 'مرتبطة بعينات', value: 16, subtitle: 'تتطلب متابعة', icon: 'bi-flask', tone: 'purple' },
    { title: 'مرتبطة بالدفع', value: 8, subtitle: 'تحتاج معالجة', icon: 'bi-credit-card', tone: 'success' },
    { title: 'مرتبطة بالزيارات المنزلية', value: 4, subtitle: 'زيارات قادمة', icon: 'bi-house-door', tone: 'blue' }
  ];

  readonly filters: FilterItem[] = [
    { label: 'الكل', count: 56, tone: 'primary' },
    { label: 'عاجل', count: 6, tone: 'danger' },
    { label: 'الطلبات', count: 18, tone: 'warning' },
    { label: 'النتائج', count: 12, tone: 'primary' },
    { label: 'السحب المنزلي', count: 6, tone: 'purple' },
    { label: 'المخزون', count: 9, tone: 'success' },
    { label: 'النظام', count: 5, tone: 'muted' }
  ];

  readonly notifications: NotificationItem[] = [
    {
      id: 1,
      type: 'نتيجة حرجة تحتاج متابعة',
      typeIcon: 'bi-flask',
      typeTone: 'danger',
      title: 'قيمة HbA1c مرتفعة 8.9%',
      description: 'تحتاج متابعة من الطبيب',
      reference: 'RPT-2024-1258',
      referenceType: 'تحليل',
      time: '09:42',
      ago: 'منذ 10 د',
      priority: 'عاجل',
      read: false
    },
    {
      id: 2,
      type: 'مريض وصل الآن',
      typeIcon: 'bi-person',
      typeTone: 'primary',
      title: 'وصل المريض إلى فرع الرياض - العليا',
      description: 'يرجى التوجه لاستقبال المريض',
      reference: 'ORD-2024-1175',
      referenceType: 'طلب',
      time: '09:30',
      ago: 'منذ 22 د',
      priority: 'متوسط',
      read: true
    },
    {
      id: 3,
      type: 'طلب غير مدفوع',
      typeIcon: 'bi-receipt',
      typeTone: 'warning',
      title: 'طلب غير مدفوع منذ أكثر من 24 ساعة',
      description: 'يرجى التواصل لتسوية المبلغ',
      reference: 'INV-2024-1174',
      referenceType: 'فاتورة',
      time: '09:15',
      ago: 'منذ 37 د',
      priority: 'منخفض',
      read: true
    },
    {
      id: 4,
      type: 'نقص في مخزون',
      typeIcon: 'bi-test-tube',
      typeTone: 'purple',
      title: 'نقص في أنابيب EDTA (بنفسجي)',
      description: 'المخزون الحالي 8 أنابيب فقط',
      reference: 'INV-2024-1171',
      referenceType: 'مخزون',
      time: '08:55',
      ago: 'منذ 57 د',
      priority: 'عاجل',
      read: false
    },
    {
      id: 5,
      type: 'عينة مرفوضة',
      typeIcon: 'bi-x-circle',
      typeTone: 'danger',
      title: 'عينة مرفوضة بسبب عدم كفاية الدم',
      description: 'يرجى إعادة جمع العينة',
      reference: 'HMH-2024-71236',
      referenceType: 'عينة',
      time: '08:40',
      ago: 'منذ 1 س',
      priority: 'متوسط',
      read: false
    },
    {
      id: 6,
      type: 'زيارة منزلية قادمة',
      typeIcon: 'bi-house-door',
      typeTone: 'success',
      title: 'زيارة منزلية بعد 30 دقيقة',
      description: 'الرجاء الاستعداد لأخذ العينة',
      reference: 'HM-2024-71234',
      referenceType: 'سحب منزلي',
      time: '08:10',
      ago: 'منذ 1 س و 27 د',
      priority: 'منخفض',
      read: true
    }
  ];

  get selectedNotification(): NotificationItem {
    return this.notifications.find(item => item.id === this.selectedNotificationId) ?? this.notifications[0];
  }

  selectFilter(label: string): void {
    this.activeFilter = label;
  }

  selectNotification(id: number): void {
    this.selectedNotificationId = id;
  }

  priorityClass(priority: NotificationItem['priority']): string {
    if (priority === 'عاجل') return 'priority-danger';
    if (priority === 'متوسط') return 'priority-warning';
    return 'priority-success';
  }
}
