import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
}

interface Patient {
  name: string;
  birthDate: string;
  nationalId: string;
  mrn: string;
  gender: 'ذكر' | 'أنثى';
  initials: string;
  tone: string;
}

interface LabTest {
  id: number;
  name: string;
  code: string;
  price: number;
  selected: boolean;
}
@Component({
  selector: 'app-patient-reception',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-reception.component.html',
  styleUrls: ['./patient-reception.component.css']
})
export class PatientReceptionComponent {
sidebarOpen = false;
  serviceTab = 'labs';
  patientQuery = '';

  menuItems: MenuItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door' },
    { label: 'المواعيد والحجوزات', icon: 'bi-calendar3' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle' },
    { label: 'استقبال المرضى', icon: 'bi-person-fill', active: true },
    { label: 'المرضى', icon: 'bi-people' },
    { label: 'الوصفات الطبية', icon: 'bi-prescription2' },
    { label: 'طلبات التحاليل', icon: 'bi-clipboard2-pulse' },
    { label: 'جمع العينات', icon: 'bi-cup-straw' },
    { label: 'تتبع العينات', icon: 'bi-upc-scan' },
    { label: 'النتائج', icon: 'bi-graph-up-arrow' },
    { label: 'المدفوعات والفواتير', icon: 'bi-credit-card' },
    { label: 'التقارير', icon: 'bi-file-earmark-bar-graph' },
    { label: 'الدعم', icon: 'bi-headset' },
    { label: 'الإعدادات', icon: 'bi-gear' }
  ];

  steps = [
    'البحث عن المريض',
    'بيانات المريض',
    'اختيار الخدمات',
    'المراجعة والدفع',
    'تأكيد الطلب'
  ];

  patients: Patient[] = [
    {
      name: 'أحمد محمد الحربي',
      birthDate: '05/06/1990',
      nationalId: '1234567890',
      mrn: '2024-001256',
      gender: 'ذكر',
      initials: 'أح',
      tone: 'teal'
    },
    {
      name: 'أحمد محمد الحربي',
      birthDate: '12/11/1985',
      nationalId: '9876543210',
      mrn: '2023-004589',
      gender: 'ذكر',
      initials: 'أح',
      tone: 'slate'
    },
    {
      name: 'أحمد بن محمد الحربي',
      birthDate: '22/02/1992',
      nationalId: '1122334455',
      mrn: '2022-001112',
      gender: 'ذكر',
      initials: 'أح',
      tone: 'navy'
    }
  ];

  labTests: LabTest[] = [
    { id: 1, name: 'صورة دم كاملة', code: 'CBC', price: 25, selected: true },
    { id: 2, name: 'سكر صائم', code: 'FBS', price: 20, selected: true },
    { id: 3, name: 'الدهون الثلاثية', code: 'Triglycerides', price: 30, selected: false },
    { id: 4, name: 'الكوليسترول الكلي', code: 'Total Cholesterol', price: 25, selected: false },
    { id: 5, name: 'وظائف الكبد', code: 'LFT', price: 45, selected: true }
  ];

  get filteredPatients(): Patient[] {
    const query = this.patientQuery.trim();
    if (!query) return this.patients;
    return this.patients.filter(patient =>
      `${patient.name} ${patient.nationalId} ${patient.mrn}`.includes(query)
    );
  }

  get selectedTests(): LabTest[] {
    return this.labTests.filter(test => test.selected);
  }

  get subtotal(): number {
    return this.selectedTests.reduce((sum, test) => sum + test.price, 0);
  }

  trackByIndex(index: number): number {
    return index;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectTab(tab: string): void {
    this.serviceTab = tab;
  }
}
