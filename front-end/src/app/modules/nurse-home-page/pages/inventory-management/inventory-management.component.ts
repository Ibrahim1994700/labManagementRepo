import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StockState = 'متوفر' | 'منخفض' | 'منخفض جداً' | 'منتهي الصلاحية';

interface InventoryItem {
  id: number;
  code: string;
  name: string;
  symbol: string;
  symbolClass: string;
  category: string;
  unit: string;
  quantity: number;
  minimum: number;
  expiry: string;
  daysLeft: number | null;
  location: string;
  warehouse: string;
  state: StockState;
  lastIssue: string;
}

interface StatCard {
  label: string;
  value: string;
  unit: string;
  icon: string;
  tone: string;
  action: string;
}
@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent {
  searchTerm = '';
  selectedBranch = 'كل الفروع';
  selectedWarehouse = 'المستودع الرئيسي';
  selectedCategory = 'كل الفئات';
  selectedState = 'الكل';
  selectedItemCode = 'ITM-0001';
  pageSize = 10;

  readonly branches = ['كل الفروع', 'الرياض - العليا', 'الرياض - الملز', 'جدة - الروضة'];
  readonly warehouses = ['المستودع الرئيسي', 'مستودع الفرع', 'مستودع الطوارئ'];
  readonly categories = ['كل الفئات', 'أنابيب', 'إبر', 'سرنجات', 'معدات وقاية', 'مستهلكات', 'حاويات'];
  readonly stockStates = ['الكل', 'متوفر', 'منخفض', 'منخفض جداً', 'منتهي الصلاحية'];

  readonly stats: StatCard[] = [
    { label: 'طلبات التوريد', value: '14', unit: 'طلب', icon: 'bi-truck', tone: 'purple', action: 'عرض الطلبات' },
    { label: 'طلبات الصرف اليوم', value: '27', unit: 'طلب', icon: 'bi-cart3', tone: 'green', action: 'عرض الطلبات' },
    { label: 'منتهية الصلاحية', value: '3', unit: 'أصناف', icon: 'bi-calendar2-x', tone: 'red', action: 'عرض التفاصيل' },
    { label: 'أوشكت على الانتهاء', value: '12', unit: 'صنف', icon: 'bi-hourglass-split', tone: 'amber', action: 'عرض التفاصيل' },
    { label: 'منخفضة المخزون', value: '18', unit: 'صنف', icon: 'bi-arrow-bar-down', tone: 'orange', action: 'عرض التفاصيل' },
    { label: 'إجمالي الأصناف', value: '328', unit: 'صنف', icon: 'bi-box-seam', tone: 'blue', action: 'عرض جميع الأصناف' }
  ];

  readonly items: InventoryItem[] = [
    { id: 1, code: 'ITM-0001', name: 'أنابيب EDTA (بنفسجي)', symbol: '▮', symbolClass: 'tube purple', category: 'أنابيب', unit: 'علبة (100)', quantity: 28, minimum: 50, expiry: '2025/08/15', daysLeft: 78, warehouse: 'المستودع الرئيسي', location: 'رف 1', state: 'منخفض', lastIssue: '2024/05/01' },
    { id: 2, code: 'ITM-0002', name: 'أنابيب SST (أصفر)', symbol: '▮', symbolClass: 'tube yellow', category: 'أنابيب', unit: 'علبة (100)', quantity: 120, minimum: 50, expiry: '2025/11/20', daysLeft: 175, warehouse: 'المستودع الرئيسي', location: 'رف 1', state: 'متوفر', lastIssue: '2024/05/02' },
    { id: 3, code: 'ITM-0003', name: 'إبر سحب 21G', symbol: '│', symbolClass: 'needle', category: 'إبر', unit: 'علبة (100)', quantity: 35, minimum: 60, expiry: '2025/07/30', daysLeft: 62, warehouse: 'المستودع الرئيسي', location: 'رف 2', state: 'منخفض', lastIssue: '2024/04/29' },
    { id: 4, code: 'ITM-0004', name: 'سرنجات 5مل', symbol: '◁', symbolClass: 'syringe', category: 'سرنجات', unit: 'علبة (100)', quantity: 80, minimum: 30, expiry: '2026/05/10', daysLeft: 346, warehouse: 'المستودع الرئيسي', location: 'رف 3', state: 'متوفر', lastIssue: '2024/05/03' },
    { id: 5, code: 'ITM-0005', name: 'قفازات نيتريل (M)', symbol: '✋', symbolClass: 'glove', category: 'معدات وقاية', unit: 'علبة (100)', quantity: 15, minimum: 40, expiry: '2025/06/28', daysLeft: 30, warehouse: 'المستودع الرئيسي', location: 'رف 2', state: 'منخفض جداً', lastIssue: '2024/05/06' },
    { id: 6, code: 'ITM-0006', name: 'مسحات كحولية', symbol: '▱', symbolClass: 'wipe', category: 'مستهلكات', unit: 'علبة (200)', quantity: 95, minimum: 50, expiry: '2026/02/18', daysLeft: 265, warehouse: 'المستودع الرئيسي', location: 'رف 4', state: 'متوفر', lastIssue: '2024/05/07' },
    { id: 7, code: 'ITM-0007', name: 'حاويات البول (معقمة)', symbol: '▣', symbolClass: 'cup', category: 'حاويات', unit: 'علبة (100)', quantity: 10, minimum: 25, expiry: '2025/05/22', daysLeft: null, warehouse: 'المستودع الرئيسي', location: 'رف 1', state: 'منتهي الصلاحية', lastIssue: '2024/04/25' },
    { id: 8, code: 'ITM-0008', name: 'أكياس نقل العينات', symbol: '▯', symbolClass: 'bag', category: 'مستهلكات', unit: 'علبة (100)', quantity: 60, minimum: 40, expiry: '2026/03/31', daysLeft: 306, warehouse: 'المستودع الرئيسي', location: 'رف 3', state: 'متوفر', lastIssue: '2024/05/04' }
  ];

  readonly issueOperations = [
    { employee: 'أحمد محمد العتيبي', quantity: 15, date: '2024/05/20', time: '09:30' },
    { employee: 'نورة عبدالله الحربي', quantity: 10, date: '2024/05/20', time: '11:15' },
    { employee: 'سارة خالد الشهري', quantity: 20, date: '2024/05/19', time: '14:45' }
  ];

  readonly consumption = [40, 62, 38, 28, 49, 29, 12];
  readonly months = ['ديسمبر\n2023', 'يناير\n2024', 'فبراير\n2024', 'مارس\n2024', 'أبريل\n2024', 'مايو\n2024', 'يونيو\n2024'];

  get filteredItems(): InventoryItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.items.filter(item => {
      const matchesSearch = !term || `${item.code} ${item.name} ${item.category}`.toLowerCase().includes(term);
      const matchesWarehouse = this.selectedWarehouse === 'المستودع الرئيسي' || item.warehouse === this.selectedWarehouse;
      const matchesCategory = this.selectedCategory === 'كل الفئات' || item.category === this.selectedCategory;
      const matchesState = this.selectedState === 'الكل' || item.state === this.selectedState;
      return matchesSearch && matchesWarehouse && matchesCategory && matchesState;
    });
  }

  get selectedItem(): InventoryItem {
    return this.items.find(item => item.code === this.selectedItemCode) ?? this.items[0];
  }

  selectItem(item: InventoryItem): void {
    this.selectedItemCode = item.code;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedBranch = 'كل الفروع';
    this.selectedWarehouse = 'المستودع الرئيسي';
    this.selectedCategory = 'كل الفئات';
    this.selectedState = 'الكل';
  }

  trackByCode(_: number, item: InventoryItem): string {
    return item.code;
  }

  stateClass(state: StockState): string {
    return {
      'متوفر': 'available',
      'منخفض': 'low',
      'منخفض جداً': 'very-low',
      'منتهي الصلاحية': 'expired'
    }[state];
  }

  quantityClass(item: InventoryItem): string {
    return item.quantity < item.minimum ? 'danger-value' : 'success-value';
  }

  chartX(index: number): number {
    return 35 + index * 55;
  }

  chartY(value: number): number {
    const max = 90;
    const minY = 18;
    const height = 112;
    return minY + height - (value / max) * height;
  }

  chartPoints(): string {
    return this.consumption.map((value, index) => `${this.chartX(index)},${this.chartY(value)}`).join(' ');
  }
}
