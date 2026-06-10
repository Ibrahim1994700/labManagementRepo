import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: number;
  unit: string;
  icon: string;
  tone: 'orange' | 'blue' | 'purple' | 'green' | 'red';
  hint: string;
}

interface SampleRow {
  id: number;
  barcode: string;
  patient: string;
  age: number;
  gender: string;
  sampleType: string;
  tubeType: string;
  collectionTime: string;
  collector: string;
  currentLocation: string;
  status: 'في المختبر' | 'في النقل' | 'بانتظار الاستلام';
  temperature: string;
}

interface TimelineStep {
  title: string;
  subtitle: string;
  date: string;
  user: string;
  icon: string;
  tone: 'green' | 'blue' | 'purple';
  state: 'done' | 'current' | 'upcoming';
}

@Component({
  selector: 'app-transport-chain',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-chain.component.html',
  styleUrl: './transport-chain.component.css'
})
export class TransportChainComponent {
 searchText = '';
  selectedSampleId = 1;
  selectedType = 'كل الأنواع';
  selectedStatus = 'كل الحالات';
  selectedDepartment = 'كل الأقسام';
  selectedBranch = 'كل الفروع';

  readonly stats: StatCard[] = [
    { title: 'بانتظار الاستلام', value: 31, unit: 'عينة', icon: 'bi-box-arrow-in-down', tone: 'orange', hint: 'عرض التفاصيل' },
    { title: 'في النقل', value: 24, unit: 'عينة', icon: 'bi-truck', tone: 'blue', hint: 'عرض التفاصيل' },
    { title: 'في المختبر', value: 72, unit: 'عينة', icon: 'bi-flask', tone: 'purple', hint: 'عرض التفاصيل' },
    { title: 'مكتملة', value: 186, unit: 'عينة', icon: 'bi-check-circle', tone: 'green', hint: 'عرض التفاصيل' },
    { title: 'مرفوضة', value: 3, unit: 'عينات', icon: 'bi-x-circle', tone: 'red', hint: 'عرض التفاصيل' },
    { title: 'عاجلة', value: 8, unit: 'عينة', icon: 'bi-exclamation-triangle', tone: 'red', hint: 'عرض التفاصيل' }
  ];

  readonly samples: SampleRow[] = [
    {
      id: 1,
      barcode: 'BC24-00012345',
      patient: 'أحمد محمد العتيبي',
      age: 33,
      gender: 'ذكر',
      sampleType: 'صورة دم كاملة (CBC)',
      tubeType: 'بنفسجي (EDTA)',
      collectionTime: '20/05/2024 09:15',
      collector: 'نورة الشمري',
      currentLocation: 'في المختبر - قسم الهيماتولوجي',
      status: 'في المختبر',
      temperature: '2–8 °C'
    },
    {
      id: 2,
      barcode: 'BC24-00012346',
      patient: 'سارة عبدالله الحربي',
      age: 28,
      gender: 'أنثى',
      sampleType: 'سكر صائم (FBS)',
      tubeType: 'رمادي (فلورايد)',
      collectionTime: '20/05/2024 09:05',
      collector: 'فهد المطيري',
      currentLocation: 'في النقل',
      status: 'في النقل',
      temperature: '2–8 °C'
    },
    {
      id: 3,
      barcode: 'BC24-00012347',
      patient: 'خالد إبراهيم السبيعي',
      age: 45,
      gender: 'ذكر',
      sampleType: 'تحليل وظائف الكبد (LFT)',
      tubeType: 'أصفر (منشطة)',
      collectionTime: '20/05/2024 08:45',
      collector: 'فهد المطيري',
      currentLocation: 'في النقل',
      status: 'في النقل',
      temperature: '2–8 °C'
    },
    {
      id: 4,
      barcode: 'BC24-00012348',
      patient: 'نورة سعود آل سعود',
      age: 41,
      gender: 'أنثى',
      sampleType: 'فيتامين د (25-OH D)',
      tubeType: 'أحمر (منشطة)',
      collectionTime: '20/05/2024 08:35',
      collector: 'علي الزهراني',
      currentLocation: 'بانتظار الاستلام',
      status: 'بانتظار الاستلام',
      temperature: '2–8 °C'
    },
    {
      id: 5,
      barcode: 'BC24-00012349',
      patient: 'فيصل يوسف الدوسري',
      age: 36,
      gender: 'ذكر',
      sampleType: 'تحليل الدهون (Lipid Profile)',
      tubeType: 'ذهبي (SST)',
      collectionTime: '20/05/2024 08:20',
      collector: '—',
      currentLocation: 'بانتظار الاستلام',
      status: 'بانتظار الاستلام',
      temperature: '2–8 °C'
    }
  ];

  readonly timeline: TimelineStep[] = [
    {
      title: 'تم جمع العينة',
      subtitle: 'فرع العليا',
      date: '20/05/2024 - 09:15 ص',
      user: 'سارة القحطاني',
      icon: 'bi-droplet',
      tone: 'green',
      state: 'done'
    },
    {
      title: 'في النقل',
      subtitle: 'إلى الفرع - الرياض',
      date: '20/05/2024 - 09:25 ص',
      user: 'نورة الشهري',
      icon: 'bi-truck',
      tone: 'blue',
      state: 'done'
    },
    {
      title: 'في المختبر',
      subtitle: 'استلام في المعمل',
      date: '20/05/2024 - 09:50 ص',
      user: 'أحمد العتيبي',
      icon: 'bi-building',
      tone: 'purple',
      state: 'done'
    },
    {
      title: 'تم تسليمها للقسم',
      subtitle: 'قسم الهيماتولوجي',
      date: '20/05/2024 - 09:55 ص',
      user: 'أحمد العتيبي',
      icon: 'bi-upc-scan',
      tone: 'blue',
      state: 'done'
    },
    {
      title: 'قيد التحليل',
      subtitle: 'قسم الهيماتولوجي',
      date: '20/05/2024 - 10:32 ص',
      user: 'أحمد العتيبي',
      icon: 'bi-flask',
      tone: 'purple',
      state: 'current'
    }
  ];

  get filteredSamples(): SampleRow[] {
    const search = this.searchText.trim().toLowerCase();

    return this.samples.filter((sample) => {
      const matchesSearch = !search || [
        sample.barcode,
        sample.patient,
        sample.sampleType,
        sample.collector
      ].some((value) => value.toLowerCase().includes(search));

      const matchesType = this.selectedType === 'كل الأنواع' || sample.sampleType.includes(this.selectedType);
      const matchesStatus = this.selectedStatus === 'كل الحالات' || sample.status === this.selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }

  get selectedSample(): SampleRow {
    return this.samples.find((sample) => sample.id === this.selectedSampleId) ?? this.samples[0];
  }

  selectSample(id: number): void {
    this.selectedSampleId = id;
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedType = 'كل الأنواع';
    this.selectedStatus = 'كل الحالات';
    this.selectedDepartment = 'كل الأقسام';
    this.selectedBranch = 'كل الفروع';
  }

  statusClass(status: SampleRow['status']): string {
    if (status === 'في المختبر') return 'status-lab';
    if (status === 'في النقل') return 'status-transit';
    return 'status-waiting';
  }

  trackBySample(_: number, sample: SampleRow): number {
    return sample.id;
  }
}
