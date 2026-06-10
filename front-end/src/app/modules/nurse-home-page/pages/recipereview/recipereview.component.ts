import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface StatisticCard {
  label: string;
  value: number;
  change: string;
  icon: string;
  tone: 'blue' | 'orange' | 'green' | 'red';
}

interface PrescriptionRow {
  id: string;
  patient: string;
  age: number;
  time: string;
  status: 'بانتظار المراجعة' | 'تحتاج توضيحاً' | 'تم الاعتماد' | 'مرفوضة' | 'تم تحويلها للطلبات';
}

interface ExtractedTest {
  name: string;
  note: string;
}
@Component({
  selector: 'app-recipereview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipereview.component.html',
  styleUrl: './recipereview.component.css'
})
export class RecipereviewComponent {
 searchTerm = '';
  selectedStatus = 'الكل';
  selectedDate = 'كل الفترة';
  selectedBranch = 'كل الفروع';
  selectedReviewer = 'كل المراجعين';
  internalNotes = '';
  patientMessage = '';
  zoom = 100;
  rotated = 0;

  statistics: StatisticCard[] = [
    { label: 'وصفات جديدة', value: 18, change: '+12%', icon: 'bi-calendar2-plus', tone: 'blue' },
    { label: 'وصفات جديدة', value: 18, change: '+12%', icon: 'bi-calendar2-check', tone: 'blue' },
    { label: 'قيد المراجعة', value: 24, change: '+5%', icon: 'bi-person-check', tone: 'orange' },
    { label: 'تحتاج توضيحاً', value: 7, change: '+2', icon: 'bi-check-circle', tone: 'green' },
    { label: 'مرفوضة', value: 6, change: '-2', icon: 'bi-x-circle', tone: 'red' },
    { label: 'تم تحويلها لطلبات', value: 41, change: '+20%', icon: 'bi-cart3', tone: 'blue' }
  ];

  prescriptions: PrescriptionRow[] = [
    { id: 'RX-2024-1258', patient: 'أحمد محمد الحربي', age: 32, time: '09:42', status: 'بانتظار المراجعة' },
    { id: 'RX-2024-1257', patient: 'نورة عبدالله السبيعي', age: 28, time: '09:35', status: 'تحتاج توضيحاً' },
    { id: 'RX-2024-1256', patient: 'سالم علي الغامدي', age: 45, time: '09:28', status: 'بانتظار المراجعة' },
    { id: 'RX-2024-1255', patient: 'فاطمة حسن المالكي', age: 36, time: '09:15', status: 'تم الاعتماد' },
    { id: 'RX-2024-1254', patient: 'محمد عبدالله الدوسري', age: 41, time: '09:03', status: 'مرفوضة' },
    { id: 'RX-2024-1253', patient: 'ريم خالد العنزي', age: 30, time: '08:55', status: 'تم تحويلها للطلبات' },
    { id: 'RX-2024-1252', patient: 'صالح ناصر الشهري', age: 52, time: '08:42', status: 'تحتاج توضيحاً' },
    { id: 'RX-2024-1251', patient: 'أمل عبدالعزيز المطيري', age: 27, time: '08:31', status: 'بانتظار المراجعة' }
  ];

  selectedPrescription = this.prescriptions[0];

  extractedTests: ExtractedTest[] = [
    { name: 'CBC', note: '' },
    { name: 'FBS', note: '' },
    { name: 'ALT', note: '' },
    { name: 'Vitamin D', note: '' },
    { name: 'HbA1c', note: '' }
  ];

  get filteredPrescriptions(): PrescriptionRow[] {
    const normalized = this.searchTerm.trim().toLowerCase();
    return this.prescriptions.filter((item) => {
      const matchesSearch = !normalized ||
        item.patient.toLowerCase().includes(normalized) ||
        item.id.toLowerCase().includes(normalized);
      const matchesStatus = this.selectedStatus === 'الكل' || item.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  selectPrescription(item: PrescriptionRow): void {
    this.selectedPrescription = item;
  }

  statusClass(status: PrescriptionRow['status']): string {
    return {
      'بانتظار المراجعة': 'status-review',
      'تحتاج توضيحاً': 'status-warning',
      'تم الاعتماد': 'status-approved',
      'مرفوضة': 'status-rejected',
      'تم تحويلها للطلبات': 'status-converted'
    }[status];
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'الكل';
    this.selectedDate = 'كل الفترة';
    this.selectedBranch = 'كل الفروع';
    this.selectedReviewer = 'كل المراجعين';
  }

  addTest(): void {
    this.extractedTests.push({ name: 'فحص جديد', note: '' });
  }

  removeTest(index: number): void {
    this.extractedTests.splice(index, 1);
  }

  zoomIn(): void {
    this.zoom = Math.min(160, this.zoom + 10);
  }

  zoomOut(): void {
    this.zoom = Math.max(60, this.zoom - 10);
  }

  rotateImage(direction: 1 | -1): void {
    this.rotated += 90 * direction;
  }

  resetImage(): void {
    this.zoom = 100;
    this.rotated = 0;
  }

  updateStatus(status: PrescriptionRow['status']): void {
    this.selectedPrescription.status = status;
  }
}
