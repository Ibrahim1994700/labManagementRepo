import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SummaryCard {
  title: string;
  value: string;
  unit: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'red';
  link: string;
}

interface ResultRow {
  reportNo: string;
  patient: string;
  age: number;
  gender: string;
  test: string;
  value: string;
  direction?: 'up' | 'down';
  reference: string;
  branch: string;
  status: 'قيد الإدخال' | 'قيد المراجعة' | 'بانتظار الاعتماد' | 'مكتملة';
  technician: string;
  initials: string;
}

interface LabResult {
  test: string;
  value: string;
  reference: string;
  status: 'مرتفع' | 'منخفض' | 'طبيعي';
  unit: string;
}
@Component({
  selector: 'app-results-nurse',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './results-nurse.component.html',
  styleUrl: './results-nurse.component.css'
})
export class ResultsNurseComponent {
 activeTab = 'قيد الإدخال';
  selectedReport = 'RPT-2024-056789';
  searchTerm = '';
  branch = 'كل الفروع';
  department = 'كل الأقسام';
  technician = 'كل الفنيين';

  summaryCards: SummaryCard[] = [
    { title: 'بانتظار الإدخال', value: '38', unit: 'نتيجة', icon: 'bi-input-cursor-text', tone: 'blue', link: 'عرض التفاصيل' },
    { title: 'قيد المراجعة', value: '26', unit: 'نتيجة', icon: 'bi-file-earmark-check', tone: 'blue', link: 'عرض التفاصيل' },
    { title: 'بحاجة لإعادة فحص', value: '12', unit: 'نتيجة', icon: 'bi-info-circle', tone: 'purple', link: 'عرض التفاصيل' },
    { title: 'مكتملة', value: '1,245', unit: 'نتيجة', icon: 'bi-check-circle', tone: 'green', link: 'عرض التفاصيل' },
    { title: 'نتائج حرجة', value: '5', unit: 'نتائج', icon: 'bi-exclamation-triangle', tone: 'red', link: 'عرض التفاصيل' }
  ];

  tabs = [
    { name: 'قيد الإدخال', count: 38 },
    { name: 'قيد المراجعة', count: 26 },
    { name: 'بانتظار الاعتماد', count: 18 },
    { name: 'مكتملة', count: 1245 },
    { name: 'حرجة', count: 5 }
  ];

  rows: ResultRow[] = [
    {
      reportNo: 'RPT-2024-056789', patient: 'محمد عبدالعزيز السبيعي', age: 35, gender: 'ذكر',
      test: 'HbA1c', value: '8.9%', direction: 'up', reference: '4.0 - 5.6 %', branch: 'الرياض - العليا',
      status: 'قيد المراجعة', technician: 'أحمد محمد', initials: 'أم'
    },
    {
      reportNo: 'RPT-2024-056786', patient: 'نورة عبدالله الحربي', age: 29, gender: 'أنثى',
      test: 'Vitamin D', value: '18', direction: 'down', reference: '30 - 100 ng/mL', branch: 'الرياض - الملز',
      status: 'قيد الإدخال', technician: 'فاطمة الزهراني', initials: 'فز'
    },
    {
      reportNo: 'RPT-2024-056783', patient: 'عبدالله فهد الغامدي', age: 42, gender: 'ذكر',
      test: 'Glucose (FBS)', value: '5.8', direction: 'up', reference: '3.5 - 5.1 mmol/L', branch: 'جدة - الروضة',
      status: 'بانتظار الاعتماد', technician: 'أمين الحربي', initials: 'أح'
    },
    {
      reportNo: 'RPT-2024-056781', patient: 'خالد صالح المطيري', age: 50, gender: 'ذكر',
      test: 'Creatinine', value: '0.3', direction: 'down', reference: '0.5 - 1.3 mg/dL', branch: 'الدمام - الشاطئ',
      status: 'قيد المراجعة', technician: 'سارة العتيبي', initials: 'سع'
    },
    {
      reportNo: 'RPT-2024-056780', patient: 'سعود علي القحطاني', age: 37, gender: 'ذكر',
      test: 'ALT (SGPT)', value: '92', reference: '70 - 110 U/L', branch: 'الرياض - العليا',
      status: 'مكتملة', technician: 'أحمد محمد', initials: 'أم'
    }
  ];

  detailedResults: LabResult[] = [
    { test: 'HbA1c', value: '8.9 ↑', reference: '4.0 - 5.6', status: 'مرتفع', unit: '%' },
    { test: 'Vitamin D (25-OH)', value: '18 ↓', reference: '30 - 100', status: 'منخفض', unit: 'ng/mL' },
    { test: 'Glucose (FBS)', value: '102', reference: '70 - 110', status: 'طبيعي', unit: 'mg/dL' },
    { test: 'Creatinine', value: '0.9', reference: '0.5 - 1.3', status: 'طبيعي', unit: 'mg/dL' },
    { test: 'ALT (SGPT)', value: '34', reference: '10 - 40', status: 'طبيعي', unit: 'U/L' },
    { test: 'Triglycerides', value: '168 ↑', reference: '< 150', status: 'مرتفع', unit: 'mg/dL' }
  ];

  get filteredRows(): ResultRow[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.rows.filter(row => {
      const matchesTerm = !term || [row.reportNo, row.patient, row.test].some(value => value.toLowerCase().includes(term));
      const matchesTab = this.activeTab === 'حرجة'
        ? row.direction === 'up'
        : this.activeTab === 'قيد الإدخال'
          ? true
          : row.status === this.activeTab;
      return matchesTerm && matchesTab;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  selectReport(reportNo: string): void {
    this.selectedReport = reportNo;
  }

  statusClass(status: ResultRow['status']): string {
    return {
      'قيد الإدخال': 'status-blue',
      'قيد المراجعة': 'status-blue',
      'بانتظار الاعتماد': 'status-orange',
      'مكتملة': 'status-green'
    }[status];
  }

  resultStatusClass(status: LabResult['status']): string {
    return {
      'مرتفع': 'result-danger',
      'منخفض': 'result-low',
      'طبيعي': 'result-normal'
    }[status];
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.branch = 'كل الفروع';
    this.department = 'كل الأقسام';
    this.technician = 'كل الفنيين';
  }
}
