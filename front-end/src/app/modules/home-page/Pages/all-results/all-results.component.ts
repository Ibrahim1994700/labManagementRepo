import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface MedicalReport {
  title: string;
  value?: string;
  date: string;
  status: string;
  statusClass: string;
  selected?: boolean;
}
@Component({
  selector: 'app-all-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-results.component.html',
  styleUrl: './all-results.component.css'
})
export class AllResultsComponent {
 activeTab: 'reports' | 'trends' = 'trends';

  reports: MedicalReport[] = [
    {
      title: 'السكر التراكمي (HbA1c)',
      value: '6.1%',
      date: '18 مايو 2025',
      status: 'طبيعي',
      statusClass: 'status-normal',
      selected: true
    },
    {
      title: 'صورة دم كاملة (CBC)',
      value: '—',
      date: '5 مايو 2025',
      status: 'طبيعي',
      statusClass: 'status-normal'
    },
    {
      title: 'دهون الدم (الليبيد)',
      value: '212 mg/dL',
      date: '20 أبريل 2025',
      status: 'مرتفع قليلاً',
      statusClass: 'status-high'
    },
    {
      title: 'وظائف الكلى (كرياتينين)',
      value: '0.95 mg/dL',
      date: '2 مارس 2025',
      status: 'طبيعي',
      statusClass: 'status-normal'
    },
    {
      title: 'فيتامين د (25-OH)',
      value: '18 ng/mL',
      date: '15 فبراير 2025',
      status: 'منخفض',
      statusClass: 'status-low'
    },
    {
      title: 'تحليل الغدة الدرقية (TSH)',
      value: '1.8 µIU/mL',
      date: '6 يناير 2025',
      status: 'طبيعي',
      statusClass: 'status-normal'
    }
  ];
}
