import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../../modules/admin/admin-routing.module";
interface SidebarItem {
  label: string;
  icon: string;
  active?: boolean;
  routerLink: string;
}
@Component({
  selector: 'app-nurse-side-bar',
  standalone: true,
  imports: [CommonModule, AdminRoutingModule],
  templateUrl: './nurse-side-bar.component.html',
  styleUrl: './nurse-side-bar.component.css'
})
export class NurseSideBarComponent {

  mairoute = 'nurse-Home';
 sidebarOpen = false;


 sidebarItems: SidebarItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door-fill',routerLink:`main-nurse-page` },
    { label: 'المواعيد والحجوزات', icon: 'bi-calendar3', routerLink: 'Appointments' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle', routerLink: 'Nurse-HomeWithdrawal' },
    { label: 'استقبال المرضى', icon: 'bi-person', routerLink: 'Patient-reception' },
    { label: 'الاشعارات', icon: 'bi-notifications', routerLink: 'nurse-notifications' },
    { label: 'الوصفات الطبية', icon: 'bi-prescription2', routerLink: 'Recipe-review'   },
    { label: 'طلبات التحاليل', icon: 'bi-clipboard2-pulse', routerLink: 'Analysis-requests' },
    { label: 'تسليم العينات للاقسام', icon: 'bi-test-tube', routerLink: 'sample-delivery' },
    { label: 'تتبع العينات', icon: 'bi-upc-scan', routerLink: 'Sample-tracking' },
    { label: 'النتائج', icon: 'bi-graph-up-arrow', routerLink: 'results-review' },
    { label: 'المدفوعات والفواتير', icon: 'bi-credit-card', routerLink: 'Bills-and-Payments' },
    { label: 'التقارير', icon: 'bi-file-earmark-text', routerLink: 'reports' },
        { label: 'الدوام وساعات العمل', icon: 'bi-file-earmark-text', routerLink: 'shift-handover-management' },

     { label: 'المخزون والمستهلكات', icon: 'bi-headset', routerLink: 'inventory-management' },
    { label: 'الملف الشخصي', icon: 'bi-gear', routerLink: 'nurse-Profile' }
  ];
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
