import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TestCard {
  name: string;
  short: string;
  code: string;
  sample: string;
  preparation: string;
  resultTime: string;
  price: number;
  icon: string;
  tone: 'purple' | 'green' | 'cyan' | 'orange';
}

interface RecentTest {
  name: string;
  status: string;
  date: string;
}
@Component({
  selector: 'app-tests-catalog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tests-catalog.component.html',
  styleUrl: './tests-catalog.component.css'
})
export class TestsCatalogComponent {
searchTerm = '';
  sortBy = 'الأكثر شيوعاً';
  activeCategory = 'الكل';

  categories = [
    'الكل',
    'صحة الدم',
    'الغدد والهرمونات',
    'الكبد والبنكرياس',
    'الكلى والمسالك',
    'الفيتامينات والمعادن',
    'القلب',
    'المناعة والحساسية'
  ];

  visibleTests: TestCard[] = [
    {
      name: 'تحليل الغدة الدرقية (TSH)',
      short: 'TSH',
      code: 'TSH01',
      sample: 'دم',
      preparation: 'يفضل الصيام 4 ساعات',
      resultTime: '12 - 24 ساعة',
      price: 79,
      icon: 'bi-test-tube',
      tone: 'purple'
    },
    {
      name: 'صورة دم كاملة (CBC)',
      short: 'CBC',
      code: 'CBC01',
      sample: 'دم (EDTA)',
      preparation: 'لا يتطلب',
      resultTime: '6 - 12 ساعة',
      price: 49,
      icon: 'bi-clipboard2-pulse',
      tone: 'green'
    },
    {
      name: 'فيتامين D',
      short: '25(OH)D',
      code: 'VD25',
      sample: 'دم',
      preparation: 'يفضل الصيام 8 ساعات',
      resultTime: '24 - 48 ساعة',
      price: 199,
      icon: 'bi-flask',
      tone: 'purple'
    },
    {
      name: 'الكوليسترول الكلي',
      short: 'CHOL',
      code: 'CHOL01',
      sample: 'دم',
      preparation: 'صيام 9 - 12 ساعة',
      resultTime: '12 - 24 ساعة',
      price: 29,
      icon: 'bi-heart-pulse',
      tone: 'orange'
    },
    {
      name: 'وظائف الكبد (ALT)',
      short: 'ALT',
      code: 'ALT01',
      sample: 'دم',
      preparation: 'لا يتطلب',
      resultTime: '12 - 24 ساعة',
      price: 29,
      icon: 'bi-house-heart',
      tone: 'green'
    },
    {
      name: 'سكر صائم',
      short: 'FBS',
      code: 'FBS01',
      sample: 'دم',
      preparation: 'صيام 8 - 12 ساعة',
      resultTime: '6 - 12 ساعة',
      price: 19,
      icon: 'bi-droplet',
      tone: 'cyan'
    }
  ];

  recentTests: RecentTest[] = [
    { name: 'صورة دم كاملة (CBC)', status: 'طبيعي', date: '18 مايو 2024' },
    { name: 'فيتامين D', status: 'طبيعي', date: '18 مايو 2024' },
    { name: 'TSH', status: 'مرتفع', date: '5 مايو 2024' }
  ];

  trackByValue(_: number, value: string): string {
    return value;
  }

  trackByCode(_: number, item: TestCard): string {
    return item.code;
  }

  trackByName(_: number, item: RecentTest): string {
    return item.name;
  }
}
