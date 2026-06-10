import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MetricCard {
  title: string;
  value: string;
  unit?: string;
  comparison: string;
  trend: 'up' | 'down';
  tone: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  icon: string;
}

interface StaffCard {
  name: string;
  role: string;
  total: number;
  change: number;
  duration: number;
  avatar: string;
}
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
 selectedBranch = 'كل الفروع';
  selectedEmployee = 'الكل';
  selectedService = 'الكل';
  startDate = '2024/05/01';
  endDate = '2024/05/31';

  metrics: MetricCard[] = [
    { title: 'إجمالي الطلبات', value: '1,245', comparison: '+18%', trend: 'up', tone: 'blue', icon: 'bi-calendar2-check' },
    { title: 'العينات المجمعة', value: '312', comparison: '+18%', trend: 'up', tone: 'green', icon: 'bi-test-tube' },
    { title: 'متوسط وقت الانتظار', value: '24', unit: 'دقيقة', comparison: '-4', trend: 'down', tone: 'orange', icon: 'bi-clock' },
    { title: 'نسبة الرفض', value: '2.6%', comparison: '-0.4%', trend: 'down', tone: 'red', icon: 'bi-x-circle' },
    { title: 'الزيارات المنزلية', value: '56', comparison: '+12%', trend: 'up', tone: 'purple', icon: 'bi-house-door' },
    { title: 'الإيراد اليومي', value: '12,450', unit: 'ر.س', comparison: '+9%', trend: 'up', tone: 'green', icon: 'bi-cash-coin' }
  ];

  hourlyBars = [38, 26, 34, 47, 63, 82, 111, 88, 149, 103, 92, 117, 74, 65, 171, 153, 145, 137, 112, 168, 98, 123, 161, 91, 27];
  serviceTrend = [26, 15, 20, 17, 24, 16, 18];
  statusBars = [
    { done: 25, running: 31, review: 21, rejected: 23 },
    { done: 26, running: 31, review: 20, rejected: 23 },
    { done: 27, running: 30, review: 20, rejected: 23 },
    { done: 28, running: 30, review: 19, rejected: 23 },
    { done: 29, running: 29, review: 19, rejected: 23 },
    { done: 29, running: 30, review: 18, rejected: 23 }
  ];

  popularTests = [
    { name: 'صورة دم كاملة (CBC)', value: 420, percent: '33.7%' },
    { name: 'سكر صائم (FBS)', value: 280, percent: '22.5%' },
    { name: 'تحليل بول كامل', value: 210, percent: '16.9%' },
    { name: 'دهون ثلاثية (Triglycerides)', value: 150, percent: '12.0%' },
    { name: 'هرمون الغدة الدرقية (TSH)', value: 100, percent: '8.0%' }
  ];

  branches = [
    { rank: 1, name: 'الرياض - العليا', orders: 142, time: '12 د', reject: '2.1%', revenue: '5,840' },
    { rank: 2, name: 'جدة - الروضة', orders: 342, time: '98', reject: '2.4%', revenue: '3,520' },
    { rank: 3, name: 'الدمام - الشاطئ', orders: 184, time: '46', reject: '2.8%', revenue: '1,980' },
    { rank: 4, name: 'مكة المكرمة', orders: 153, time: '36', reject: '2.0%', revenue: '1,560' }
  ];

  staff: StaffCard[] = [
    { name: 'محمد الحربي', role: 'فني مختبر', total: 78, change: -4, duration: 27, avatar: 'assets/avatar-2.png' },
    { name: 'نورة الشهري', role: 'ممرض', total: 96, change: 10, duration: 24, avatar: 'assets/avatar-1.png' },
    { name: 'أحمد العتيبي', role: 'فني مختبر', total: 112, change: 12, duration: 20, avatar: 'assets/avatar-2.png' },
    { name: 'سارة القحطاني', role: 'ممرض', total: 128, change: 18, duration: 22, avatar: 'assets/avatar-1.png' }
  ];

  resetFilters(): void {
    this.selectedBranch = 'كل الفروع';
    this.selectedEmployee = 'الكل';
    this.selectedService = 'الكل';
    this.startDate = '2024/05/01';
    this.endDate = '2024/05/31';
  }

  exportReport(type: 'pdf' | 'excel' | 'print' | 'schedule'): void {
    console.log(`Operational report action: ${type}`);
  }
}
