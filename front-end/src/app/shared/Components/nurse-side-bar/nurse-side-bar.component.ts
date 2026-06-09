import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface SidebarItem {
  label: string;
  icon: string;
  active?: boolean;
}
@Component({
  selector: 'app-nurse-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nurse-side-bar.component.html',
  styleUrl: './nurse-side-bar.component.css'
})
export class NurseSideBarComponent {

 sidebarOpen = false;


 sidebarItems: SidebarItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door-fill', active: true },
    { label: 'المواعيد والحجوزات', icon: 'bi-calendar3' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle' },
    { label: 'استقبال المرضى', icon: 'bi-person' },
    { label: 'المرضى', icon: 'bi-people' },
    { label: 'الوصفات الطبية', icon: 'bi-prescription2' },
    { label: 'طلبات التحاليل', icon: 'bi-clipboard2-pulse' },
    { label: 'جمع العينات', icon: 'bi-test-tube' },
    { label: 'تتبع العينات', icon: 'bi-upc-scan' },
    { label: 'النتائج', icon: 'bi-graph-up-arrow' },
    { label: 'المدفوعات والفواتير', icon: 'bi-credit-card' },
    { label: 'التقارير', icon: 'bi-file-earmark-text' },
    { label: 'الدعم', icon: 'bi-headset' },
    { label: 'الإعدادات', icon: 'bi-gear' }
  ];
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
