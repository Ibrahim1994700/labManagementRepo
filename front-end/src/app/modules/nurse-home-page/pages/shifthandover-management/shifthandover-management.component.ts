import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: number;
  note: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  icon: string;
  tone: 'blue' | 'purple' | 'orange' | 'green' | 'red';
}

interface FollowUpTask {
  type: string;
  typeIcon: string;
  description: string;
  time: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
}

interface ChecklistItem {
  label: string;
  status: 'مكتمل' | 'قيد التنفيذ';
  done: boolean;
}

interface UrgentCase {
  id: number;
  patient: string;
  description: string;
  time: string;
  action: string;
}

interface InventoryItem {
  item: string;
  consumed: string;
  unit: string;
  remaining: string;
}

interface ActivityItem {
  time: string;
  date: string;
  title: string;
  description: string;
  tone: 'blue' | 'green' | 'mint';
}
@Component({
  selector: 'app-shifthandover-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shifthandover-management.component.html',
  styleUrl: './shifthandover-management.component.css'
})
export class ShifthandoverManagementComponent {
readonly stats: StatCard[] = [
    {
      title: 'مرضى تم استقبالهم',
      value: 28,
      note: 'عن أمس',
      trend: '+15%',
      trendType: 'up',
      icon: 'bi-people',
      tone: 'blue'
    },
    {
      title: 'عينات تم جمعها',
      value: 64,
      note: 'عن أمس',
      trend: '+18%',
      trendType: 'up',
      icon: 'bi-flask',
      tone: 'purple'
    },
    {
      title: 'عينات بانتظار التسليم',
      value: 16,
      note: 'عن أمس',
      trend: '-8%',
      trendType: 'down',
      icon: 'bi-clock',
      tone: 'purple'
    },
    {
      title: 'مشاكل مفتوحة',
      value: 7,
      note: 'تحتاج متابعة',
      icon: 'bi-exclamation-triangle',
      tone: 'red'
    },
    {
      title: 'زيارات منزلية منفذة',
      value: 9,
      note: 'عن أمس',
      trend: '+12%',
      trendType: 'up',
      icon: 'bi-house-door',
      tone: 'green'
    }
  ];

  readonly followUpTasks: FollowUpTask[] = [
    {
      type: 'عينة',
      typeIcon: 'bi-flask',
      description: 'عينة فحوصات شاملة - أحمد محمد',
      time: '09:30 ص',
      priority: 'عالية'
    },
    {
      type: 'عينة',
      typeIcon: 'bi-flask',
      description: 'فيتامين د - نورة عبدالله',
      time: '10:15 ص',
      priority: 'متوسطة'
    },
    {
      type: 'زيارة',
      typeIcon: 'bi-person-walking',
      description: 'زيارة منزلية - حي النرجس',
      time: '01:00 م',
      priority: 'منخفضة'
    },
    {
      type: 'تقرير',
      typeIcon: 'bi-file-earmark-text',
      description: 'نتائج غير طبيعية - متابعة الطبيب',
      time: '02:20 م',
      priority: 'عالية'
    },
    {
      type: 'دفع',
      typeIcon: 'bi-credit-card',
      description: 'فاتورة غير مسددة - فهد الحربي',
      time: '02:45 م',
      priority: 'منخفضة'
    },
    {
      type: 'طلب',
      typeIcon: 'bi-briefcase',
      description: 'طلب تحليل - إلغاء لم يتم التنفيذ',
      time: '02:50 م',
      priority: 'متوسطة'
    }
  ];

  readonly checklist: ChecklistItem[] = [
    { label: 'مراجعة الطلبات العاجلة والتأكد من معالجتها', status: 'مكتمل', done: true },
    { label: 'تسليم العينات إلى القسم المختص', status: 'مكتمل', done: true },
    { label: 'تحديث حالة الزيارات المنزلية', status: 'مكتمل', done: true },
    { label: 'مراجعة نتائج التحاليل غير الطبيعية', status: 'مكتمل', done: true },
    { label: 'تحديث المخزون وتسجيل المستهلك', status: 'قيد التنفيذ', done: false },
    { label: 'تسليم الأجهزة والمستلزمات', status: 'مكتمل', done: true },
    { label: 'تسليم المفاتيح ومواد التعقيم', status: 'مكتمل', done: true },
    { label: 'تسجيل الملاحظات والحوادث', status: 'قيد التنفيذ', done: false }
  ];

  readonly urgentCases: UrgentCase[] = [
    { id: 1, patient: 'مشعل عبدالعزيز', description: 'HbA1c (8.9%) مرتفع', time: '09:42 ص', action: 'مراجعة الطبيب' },
    { id: 2, patient: 'سالم بن فهد', description: 'ارتفاع ضغط الدم', time: '10:10 ص', action: 'متابعة عاجلة' },
    { id: 3, patient: 'فاطمة حسن المالكي', description: 'نقص فيتامين D', time: '11:05 ص', action: 'تواصل مع المريض' },
    { id: 4, patient: 'علي بن منصور', description: 'ارتفاع الكوليسترول', time: '12:20 م', action: 'تعديل الخطة' }
  ];

  readonly inventory: InventoryItem[] = [
    { item: 'أنابيب EDTA', consumed: '18', unit: 'أنبوب', remaining: '42' },
    { item: 'أنابيب مصل (جل)', consumed: '24', unit: 'أنبوب', remaining: '36' },
    { item: 'شرائط جلوكوز', consumed: '32', unit: 'شريحة', remaining: '68' },
    { item: 'إبر سحب الدم', consumed: '16', unit: 'قطعة', remaining: '54' },
    { item: 'كحول طبي 70%', consumed: '1.5', unit: 'لتر', remaining: '3.5' }
  ];

  readonly activities: ActivityItem[] = [
    {
      time: '02:50 م',
      date: '30 د',
      title: 'تحديث #HM-2024-71234',
      description: 'طلب إتمام الفاتورة',
      tone: 'blue'
    },
    {
      time: '02:20 م',
      date: '29 د',
      title: 'تسجيل نتيجة غير طبيعية',
      description: 'لمريض - مشعل عبدالعزيز',
      tone: 'green'
    },
    {
      time: '01:15 م',
      date: '23 د',
      title: 'إكمال زيارة منزلية',
      description: 'حي النرجس - تم جمع العينات',
      tone: 'mint'
    },
    {
      time: '11:40 ص',
      date: '30 ص',
      title: 'تسجيل عينة جديدة',
      description: 'نوع العينة المسحوبة',
      tone: 'green'
    },
    {
      time: '09:30 ص',
      date: '29 ص',
      title: 'بدء الوردية',
      description: 'تسجيل الدخول للنظام',
      tone: 'mint'
    }
  ];

  priorityClass(priority: FollowUpTask['priority']): string {
    return {
      عالية: 'priority-high',
      متوسطة: 'priority-medium',
      منخفضة: 'priority-low'
    }[priority];
  }
}
