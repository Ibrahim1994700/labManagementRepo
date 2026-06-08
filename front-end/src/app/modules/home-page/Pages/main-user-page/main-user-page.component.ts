import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';



interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  link: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange';
}

interface QuickAction {
  title: string;
  subtitle: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange';
}

interface PackageItem {
  title: string;
  description: string;
  oldPrice: string;
  price: string;
  image: string;
}
@Component({
  selector: 'app-main-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-user-page.component.html',
  styleUrl: './main-user-page.component.css'
})
export class MainUserPageComponent {

  stats: StatCard[] = [
    {
      title: 'الحجوزات القادمة',
      value: '1',
      subtitle: 'حجز مؤكد',
      link: 'عرض الكل',
      icon: 'bi-calendar3',
      tone: 'blue'
    },
    {
      title: 'النتائج الجديدة',
      value: '2',
      subtitle: 'نتيجتان جاهزتان',
      link: 'عرض الكل',
      icon: 'bi-file-earmark-text',
      tone: 'green'
    },
    {
      title: 'التحاليل المنجزة',
      value: '12',
      subtitle: 'هذا العام',
      link: 'عرض الكل',
      icon: 'bi-beaker',
      tone: 'purple'
    },
    {
      title: 'أفراد العائلة',
      value: '3',
      subtitle: 'أفراد مضافون',
      link: 'إدارة العائلة',
      icon: 'bi-people',
      tone: 'orange'
    }
  ];

  quickActions: QuickAction[] = [
    { title: 'الحجز تحليل', subtitle: 'اختر موعدك في الفرع أو اطلب سحب منزلي', icon: 'bi-calendar3', tone: 'blue' },
    { title: 'سحب منزلي', subtitle: 'اطلب فني للسحب إلى منزلك', icon: 'bi-house-door', tone: 'green' },
    { title: 'التحاليل الفردية', subtitle: 'اختر من قائمة واسعة من التحاليل', icon: 'bi-test-tube', tone: 'purple' },
    { title: 'الباقات', subtitle: 'اختر الباقة المناسبة لاحتياجاتك الصحية', icon: 'bi-gift', tone: 'orange' },
    { title: 'عرض النتائج', subtitle: 'استعرض نتائجك السابقة والجديدة', icon: 'bi-graph-up-arrow', tone: 'blue' }
  ];

  packages: PackageItem[] = [
    {
      title: 'باقة فحص شامل للرجال',
      description: 'تقييم شامل للصحة العامة',
      oldPrice: '450 ر.س',
      price: '299 ر.س',
      image: 'assets/dashboard/package-man.png'
    },
    {
      title: 'باقة صحة المرأة',
      description: 'فحوصات أساسية لصحة المرأة',
      oldPrice: '550 ر.س',
      price: '349 ر.س',
      image: 'assets/dashboard/package-woman.png'
    },
    {
      title: 'باقة صحة القلب',
      description: 'الاطمئنان على صحة قلبك',
      oldPrice: '660 ر.س',
      price: '399 ر.س',
      image: 'assets/dashboard/package-heart.png'
    }
  ];
}
