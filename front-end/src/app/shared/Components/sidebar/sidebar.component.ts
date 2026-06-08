import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainUserPageComponent } from "../../../modules/home-page/Pages/main-user-page/main-user-page.component";
interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MainUserPageComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'الرئيسية', icon: 'bi-house-door-fill', active: true },
    { label: 'حجوزاتي', icon: 'bi-calendar3' },
    { label: 'السحب المنزلي', icon: 'bi-bicycle' },
    { label: 'الباقات', icon: 'bi-gift' },
    { label: 'التحاليل الفردية', icon: 'bi-test-tube' },
    { label: 'النتائج', icon: 'bi-graph-up-arrow' },
    { label: 'العروض', icon: 'bi-tag' },
    { label: 'حساب العائلة', icon: 'bi-people' },
    { label: 'الوصفة الطبية', icon: 'bi-file-earmark-medical' },
    { label: 'الدعم', icon: 'bi-headset' }
  ];

}
