import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: number;
  unit: string;
  delta: string;
  deltaLabel: string;
  icon: string;
  tone: 'blue' | 'orange' | 'green' | 'red';
}

interface StaffMember {
  name: string;
  code: string;
  avatar?: string;
}

interface BatchSample {
  number: string;
  patient: string;
  test: string;
  tube: string;
  tubeTone: 'yellow' | 'purple' | 'green';
  status: 'طبيعية' | 'عاجلة';
}

interface TimelineStep {
  title: string;
  person: string;
  time: string;
  state: 'done' | 'current' | 'pending';
}

interface DeliveryBatch {
  id: string;
  department: string;
  samplesCount: number;
  urgentCount: number;
  preparationStatus: 'مكتملة' | 'غير مكتملة';
  sender: StaffMember;
  receiver?: StaffMember;
  handoverStatus: 'بانتظار الاستلام' | 'تم الاستلام';
  preparationTime: string;
  day: string;
  samples: BatchSample[];
  boxNumber: string;
  barcode: string;
  packageType: string;
  safetyStatus: string;
  timeline: TimelineStep[];
}
@Component({
  selector: 'app-samples-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './samples-delivery.component.html',
  styleUrl: './samples-delivery.component.css'
})
export class SamplesDeliveryComponent {
 searchText = '';
  selectedDepartment = 'الكل';
  selectedBranch = 'الكل';
  selectedPickupTime = 'اليوم';
  selectedHandoverStatus = 'الكل';
  selectedReceiver = 'الكل';
  barcodeInput = '';
  selectedBatchId = 'BTH-2024-0516';

  readonly stats: StatCard[] = [
    {
      title: 'دفعات جاهزة',
      value: 12,
      unit: 'دفعة',
      delta: '+3',
      deltaLabel: 'عن أمس',
      icon: 'bi-box-seam',
      tone: 'blue'
    },
    {
      title: 'بانتظار الاستلام',
      value: 7,
      unit: 'دفعات',
      delta: '-2',
      deltaLabel: 'عن أمس',
      icon: 'bi-clock',
      tone: 'orange'
    },
    {
      title: 'مستلمة',
      value: 18,
      unit: 'دفعة',
      delta: '+6',
      deltaLabel: 'عن أمس',
      icon: 'bi-check-circle',
      tone: 'green'
    },
    {
      title: 'عاجلة',
      value: 4,
      unit: 'دفعات',
      delta: '-1',
      deltaLabel: 'عن أمس',
      icon: 'bi-bell',
      tone: 'red'
    },
    {
      title: 'مرفوضة',
      value: 2,
      unit: 'دفعة',
      delta: '↗',
      deltaLabel: 'عن أمس',
      icon: 'bi-slash-circle',
      tone: 'red'
    }
  ];

  readonly batches: DeliveryBatch[] = [
    {
      id: 'BTH-2024-0516',
      department: 'الكيمياء',
      samplesCount: 28,
      urgentCount: 2,
      preparationStatus: 'مكتملة',
      sender: {
        name: 'سارة القحطاني',
        code: 'NUR-1007',
        avatar: 'assets/avatar-sarah.png'
      },
      handoverStatus: 'بانتظار الاستلام',
      preparationTime: '11:20 ص',
      day: 'اليوم',
      boxNumber: 'BOX-2024-0516-01',
      barcode: 'BCX-876543210012',
      packageType: 'صندوق عازل',
      safetyStatus: 'سليمة',
      samples: [
        { number: 'SMP-00012345', patient: 'أحمد محمد العتيبي', test: 'Lipid Profile', tube: 'SST', tubeTone: 'yellow', status: 'طبيعية' },
        { number: 'SMP-00012346', patient: 'نورة عبدالله الحربي', test: 'CBC', tube: 'EDTA', tubeTone: 'purple', status: 'عاجلة' },
        { number: 'SMP-00012347', patient: 'خالد ياسر المطيري', test: 'Glucose (FBS)', tube: 'SST', tubeTone: 'yellow', status: 'طبيعية' },
        { number: 'SMP-00012348', patient: 'فاطمة علي الشهري', test: 'ALT (SGPT)', tube: 'Heparin', tubeTone: 'green', status: 'طبيعية' }
      ],
      timeline: [
        { title: 'إنشاء الدفعة', person: 'سارة القحطاني', time: '11:05 ص', state: 'done' },
        { title: 'تجهيز العينات', person: 'سارة القحطاني', time: '11:10 ص', state: 'done' },
        { title: 'إغلاق العبوة', person: 'سارة القحطاني', time: '11:15 ص', state: 'done' },
        { title: 'بانتظار الاستلام', person: '', time: '11:20 ص', state: 'current' },
        { title: 'تم الاستلام', person: '', time: '—', state: 'pending' }
      ]
    },
    {
      id: 'BTH-2024-0515',
      department: 'أمراض الدم',
      samplesCount: 34,
      urgentCount: 0,
      preparationStatus: 'مكتملة',
      sender: { name: 'نورة عبدالله الحربي', code: 'NUR-1005', avatar: 'assets/avatar-noura.png' },
      receiver: { name: 'أحمد محمد العتيبي', code: 'TECH-1021', avatar: 'assets/avatar-ahmad.png' },
      handoverStatus: 'تم الاستلام',
      preparationTime: '10:05 ص',
      day: 'اليوم',
      boxNumber: 'BOX-2024-0515-01',
      barcode: 'BCX-876543210013',
      packageType: 'حافظة عينات',
      safetyStatus: 'سليمة',
      samples: [],
      timeline: []
    },
    {
      id: 'BTH-2024-0514',
      department: 'الأحياء الدقيقة',
      samplesCount: 22,
      urgentCount: 1,
      preparationStatus: 'مكتملة',
      sender: { name: 'أمل عبدالعزيز المطيري', code: 'NUR-1008', avatar: 'assets/avatar-amal.png' },
      receiver: { name: 'عبدالله فهد العصيمي', code: 'TECH-1008', avatar: 'assets/avatar-abdullah.png' },
      handoverStatus: 'تم الاستلام',
      preparationTime: '09:20 ص',
      day: 'اليوم',
      boxNumber: 'BOX-2024-0514-01',
      barcode: 'BCX-876543210014',
      packageType: 'صندوق عازل',
      safetyStatus: 'سليمة',
      samples: [],
      timeline: []
    },
    {
      id: 'BTH-2024-0513',
      department: 'المناعة',
      samplesCount: 18,
      urgentCount: 0,
      preparationStatus: 'مكتملة',
      sender: { name: 'سارة القحطاني', code: 'NUR-1007', avatar: 'assets/avatar-sarah.png' },
      handoverStatus: 'بانتظار الاستلام',
      preparationTime: '04:40 م',
      day: 'اليوم',
      boxNumber: 'BOX-2024-0513-01',
      barcode: 'BCX-876543210015',
      packageType: 'حافظة مبردة',
      safetyStatus: 'سليمة',
      samples: [],
      timeline: []
    },
    {
      id: 'BTH-2024-0512',
      department: 'الهرمونات',
      samplesCount: 15,
      urgentCount: 3,
      preparationStatus: 'غير مكتملة',
      sender: { name: 'فاطمة الزهراني', code: 'NUR-1010' },
      handoverStatus: 'بانتظار الاستلام',
      preparationTime: '02:15 م',
      day: 'أمس',
      boxNumber: 'BOX-2024-0512-01',
      barcode: 'BCX-876543210016',
      packageType: 'صندوق عازل',
      safetyStatus: 'تحتاج مراجعة',
      samples: [],
      timeline: []
    }
  ];

  get filteredBatches(): DeliveryBatch[] {
    const term = this.searchText.trim().toLowerCase();

    return this.batches.filter((batch) => {
      const searchable = `${batch.id} ${batch.department} ${batch.sender.name} ${batch.receiver?.name ?? ''}`.toLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      const matchesDepartment = this.selectedDepartment === 'الكل' || batch.department === this.selectedDepartment;
      const matchesStatus = this.selectedHandoverStatus === 'الكل' || batch.handoverStatus === this.selectedHandoverStatus;
      const matchesReceiver = this.selectedReceiver === 'الكل'
        || (this.selectedReceiver === 'غير معين' && !batch.receiver)
        || batch.receiver?.name === this.selectedReceiver;

      return matchesSearch && matchesDepartment && matchesStatus && matchesReceiver;
    });
  }

  get selectedBatch(): DeliveryBatch {
    return this.batches.find((batch) => batch.id === this.selectedBatchId) ?? this.batches[0];
  }

  selectBatch(batch: DeliveryBatch): void {
    this.selectedBatchId = batch.id;
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedDepartment = 'الكل';
    this.selectedBranch = 'الكل';
    this.selectedPickupTime = 'اليوم';
    this.selectedHandoverStatus = 'الكل';
    this.selectedReceiver = 'الكل';
  }

  confirmHandover(): void {
    this.selectedBatch.handoverStatus = 'تم الاستلام';
  }

  scanBarcode(): void {
    if (this.barcodeInput.trim()) {
      this.barcodeInput = '';
    }
  }

  trackByBatch(_: number, batch: DeliveryBatch): string {
    return batch.id;
  }
}
