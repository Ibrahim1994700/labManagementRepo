import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainUserPageComponent } from "../../../modules/home-page/Pages/main-user-page/main-user-page.component";
import { AdminRoutingModule } from "../../../modules/admin/admin-routing.module";
interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
  routerLink: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AdminRoutingModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door-fill',routerLink:`main-user-page` },
    { label: 'حجوزاتي', icon: 'bi-calendar3', routerLink: 'bookings' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle', routerLink: 'HomeWithdrawal' },
    { label: 'الباقات', icon: 'bi-gift', routerLink: 'Packages' },
    { label: 'التحاليل الفردية', icon: 'bi-test-tube', routerLink: 'individual-tests' },
    { label: 'النتائج', icon: 'bi-graph-up-arrow', routerLink: 'results' },
    { label: 'العروض', icon: 'bi-tag', routerLink: 'offers' },
    { label: 'حساب العائلة', icon: 'bi-people', routerLink: 'family-account' },
    { label: 'الوصفة الطبية', icon: 'bi-file-earmark-medical', routerLink: 'prescription' },
    { label: 'الدعم', icon: 'bi-headset', routerLink: 'support' }
  ];

}
