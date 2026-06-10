import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: number;
  subtitle: string;
  change: string;
  direction: 'up' | 'down';
  icon: string;
  tone: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

interface OrderRow {
  id: string;
  patient: string;
  age: number;
  gender: string;
  source: string;
  sourceTone: string;
  tests: string;
  branch: string;
  createdAt: string;
  sampleStatus: string;
  sampleTone: string;
  orderStatus: string;
  orderTone: string;
  employee: string;
  initials: string;
}

interface TimelineStep {
  title: string;
  date: string;
  employee: string;
  icon: string;
  tone: string;
}
@Component({
  selector: 'app-analysisrequests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analysisrequests.component.html',
  styleUrl: './analysisrequests.component.css'
})
export class AnalysisrequestsComponent {
 searchTerm = '';
  selectedOrderId = 'HM-2024-005678';

  stats: StatCard[] = [
    { title: 'المسودات', value: 18, subtitle: 'من إجمالي الطلبات', change: '+5%', direction: 'up', icon: 'bi-file-earmark-text', tone: 'blue' },
    { title: 'بانتظار الدفع', value: 32, subtitle: 'من إجمالي الطلبات', change: '+12%', direction: 'up', icon: 'bi-wallet2', tone: 'blue' },
    { title: 'مؤكدة', value: 56, subtitle: 'من إجمالي الطلبات', change: '+8%', direction: 'up', icon: 'bi-check-circle', tone: 'green' },
    { title: 'بانتظار الجمع', value: 24, subtitle: 'من إجمالي الطلبات', change: '-3%', direction: 'down', icon: 'bi-truck', tone: 'orange' },
    { title: 'قيد التنفيذ (في المختبر)', value: 48, subtitle: 'من إجمالي الطلبات', change: '+15%', direction: 'up', icon: 'bi-flask', tone: 'purple' },
    { title: 'مكتملة', value: 312, subtitle: 'من إجمالي الطلبات', change: '+18%', direction: 'up', icon: 'bi-check-circle', tone: 'green' },
    { title: 'ملغاة', value: 9, subtitle: 'من إجمالي الطلبات', change: '-11%', direction: 'down', icon: 'bi-x-circle', tone: 'red' }
  ];

  orders: OrderRow[] = [
    {
      id: 'HM-2024-005678', patient: 'أحمد محمد العتيبي', age: 32, gender: 'ذكر',
      source: 'حجز', sourceTone: 'blue', tests: 'باقة الفحص الشامل + فيتامين د + CBC ...',
      branch: 'الرياض - العليا', createdAt: '2024/05/28  09:15 ص', sampleStatus: 'تم الجمع', sampleTone: 'green',
      orderStatus: 'قيد التنفيذ', orderTone: 'purple', employee: 'منال العتيبي', initials: 'م'
    },
    {
      id: 'HM-2024-005677', patient: 'سارة عبدالله الحربي', age: 28, gender: 'أنثى',
      source: 'مباشر', sourceTone: 'green', tests: 'TSH + FT4 + Anti-TPO',
      branch: 'جدة - الروضة', createdAt: '2024/05/28  08:45 ص', sampleStatus: 'بانتظار الجمع', sampleTone: 'orange',
      orderStatus: 'مؤكدة', orderTone: 'blue', employee: 'خالد الغامدي', initials: 'خ'
    },
    {
      id: 'HM-2024-005676', patient: 'فهد بن سعود آل سعود', age: 41, gender: 'ذكر',
      source: 'جمع منزلي', sourceTone: 'purple', tests: 'Lipid Profile + باقة السكري',
      branch: 'الرياض - النزهة', createdAt: '2024/05/28  08:20 ص', sampleStatus: 'بانتظار النقل', sampleTone: 'blue',
      orderStatus: 'بانتظار الجمع', orderTone: 'orange', employee: 'نورة الشهري', initials: 'ن'
    },
    {
      id: 'HM-2024-005675', patient: 'نورة بنت خالد الشهري', age: 29, gender: 'أنثى',
      source: 'جمع منزلي', sourceTone: 'purple', tests: 'باقة الحساسية الشاملة',
      branch: 'الدمام - الفيصلية', createdAt: '2024/05/28  07:55 ص', sampleStatus: 'تم الاستلام', sampleTone: 'purple',
      orderStatus: 'بانتظار الاعتماد', orderTone: 'orange', employee: 'ماجد القرني', initials: 'م'
    },
    {
      id: 'HM-2024-005674', patient: 'ريم عبدالعزيز الزهراني', age: 36, gender: 'أنثى',
      source: 'حجز', sourceTone: 'blue', tests: 'باقة صحة المرأة',
      branch: 'جدة - السلامة', createdAt: '2024/05/27  19:35 م', sampleStatus: 'مكتملة', sampleTone: 'green',
      orderStatus: 'مكتملة', orderTone: 'green', employee: 'ريم الزهراني', initials: 'ر'
    },
    {
      id: 'HM-2024-005673', patient: 'عبدالله صالح المطيري', age: 45, gender: 'ذكر',
      source: 'مباشر', sourceTone: 'green', tests: 'Ferritin + Iron + TIBC',
      branch: 'الرياض - العليا', createdAt: '2024/05/27  18:20 م', sampleStatus: '---', sampleTone: 'gray',
      orderStatus: 'ملغاة', orderTone: 'red', employee: 'يوسف المطيري', initials: 'ي'
    }
  ];

  timeline: TimelineStep[] = [
    { title: 'بانتظار الجمع', date: '2024/05/28  09:15', employee: 'تم تأكيد الطلب', icon: 'bi-hourglass-split', tone: 'orange' },
    { title: 'تم الجمع', date: '2024/05/28  09:30', employee: 'منال العتيبي', icon: 'bi-check-circle-fill', tone: 'green' },
    { title: 'بانتظار النقل', date: '2024/05/28  11:00', employee: 'بواسطة الناقل', icon: 'bi-truck', tone: 'blue' },
    { title: 'تم الاستلام في المختبر', date: '2024/05/28  11:45', employee: 'أحمد الدوسري', icon: 'bi-flask-fill', tone: 'purple' },
    { title: 'قيد التحليل', date: '2024/05/28  13:20', employee: 'قسم الكيمياء', icon: 'bi-hourglass-bottom', tone: 'purple' },
    { title: 'بانتظار الاعتماد', date: '---', employee: '---', icon: 'bi-check-circle-fill', tone: 'yellow' },
    { title: 'مكتملة', date: '---', employee: '---', icon: 'bi-check-circle-fill', tone: 'green' }
  ];

  get filteredOrders(): OrderRow[] {
    const value = this.searchTerm.trim().toLowerCase();
    if (!value) return this.orders;
    return this.orders.filter(order =>
      [order.id, order.patient, order.tests, order.branch, order.employee]
        .some(field => field.toLowerCase().includes(value))
    );
  }

  selectOrder(order: OrderRow): void {
    this.selectedOrderId = this.selectedOrderId === order.id ? '' : order.id;
  }

  isSelected(order: OrderRow): boolean {
    return order.id === this.selectedOrderId;
  }

  trackByOrderId(_: number, order: OrderRow): string {
    return order.id;
  }
}
