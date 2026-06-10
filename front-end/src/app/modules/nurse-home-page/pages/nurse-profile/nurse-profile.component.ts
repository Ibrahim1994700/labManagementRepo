import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TabItem {
  id: string;
  label: string;
  icon: string;
}
@Component({
  selector: 'app-nurse-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './nurse-profile.component.html',
  styleUrl: './nurse-profile.component.css'
})
export class NurseProfileComponent {
  activeTab = 'personal';
  editing = false;
  showSavedMessage = false;

  readonly summaryStats = [
    {
      label: 'متوسط زمن الخدمة',
      value: '09:18',
      note: 'دقيقة',
      extra: 'آخر 12 شهر',
      icon: 'bi-clock',
      theme: 'stat-purple'
    },
    {
      label: 'عدد العينات المجمعة',
      value: '12,450',
      note: 'عينة',
      extra: 'آخر 12 شهر',
      icon: 'bi-flask',
      theme: 'stat-green'
    },
    {
      label: 'التقييم العام',
      value: '4.7',
      note: 'من 5',
      extra: 'Excellent',
      icon: 'bi-star',
      theme: 'stat-orange'
    },
    {
      label: 'سنوات الخدمة',
      value: '3.2',
      note: 'سنة',
      extra: 'من 15/02/2021',
      icon: 'bi-calendar2-week',
      theme: 'stat-blue'
    }
  ];

  readonly employeeMeta = [
    { label: 'الحالة الحالية', value: 'صباحية', icon: 'bi-stopwatch' },
    { label: 'القسم', value: 'جمع العينات - المختبر', icon: 'bi-building-gear' },
    { label: 'تاريخ الوظيفة', value: 'دوام كامل', icon: 'bi-calendar2' },
    { label: 'تاريخ التعيين', value: '15/02/2021', icon: 'bi-calendar3' },
    { label: 'الفرع', value: 'الرياض - العليا', icon: 'bi-geo-alt' },
    { label: 'فصيلة الدم', value: 'O+', icon: 'bi-droplet', danger: true },
    { label: 'الجنس', value: 'أنثى', icon: 'bi-gender-female' },
    { label: 'تاريخ الميلاد', value: '12/05/1992', icon: 'bi-calendar3' },
    { label: 'رقم الهوية', value: '1098765432', icon: 'bi-credit-card-2-front' },
    { label: 'البريد الإلكتروني', value: 'sarah.alqahtani@hikmahlab.com', icon: 'bi-envelope' },
    { label: 'الجوال', value: '055 123 4567', icon: 'bi-telephone' }
  ];

  readonly tabs: TabItem[] = [
    { id: 'personal', label: 'المعلومات الشخصية', icon: 'bi-person' },
    { id: 'certificates', label: 'الشهادات والرخص', icon: 'bi-file-earmark-medical' },
    { id: 'schedule', label: 'جدول العمل', icon: 'bi-calendar3' },
    { id: 'performance', label: 'الأداء', icon: 'bi-bar-chart-line' },
    { id: 'security', label: 'الأمان وكلمة المرور', icon: 'bi-lock' },
    { id: 'notifications', label: 'تفضيلات الإشعارات', icon: 'bi-bell' }
  ];

  readonly attendance = [
    { day: 'اليوم - الأحد', type: 'حضور', time: '07:58' },
    { day: 'أمس - السبت', type: 'انصراف', time: '16:21' },
    { day: 'الجمعة - 09/05/2024', type: 'حضور', time: '07:54' },
    { day: 'الخميس - 08/05/2024', type: 'انصراف', time: '16:18' },
    { day: 'الأربعاء - 07/05/2024', type: 'حضور', time: '07:50' }
  ];

  readonly locations = [
    { name: 'الفرع الرئيسي', city: 'الرياض - العليا', active: true },
    { name: 'فرع النخيل', city: 'الرياض - النخيل', active: true },
    { name: 'فرع العزيزية', city: 'الرياض - العزيزية', active: false }
  ];

  profile = {
    fullName: 'سارة عبدالله القحطاني',
    jobTitle: 'ممرضة / فني مختبر أول',
    nationalId: '1098765432',
    employeeNumber: 'EMP-2021-0145',
    birthDate: '12/05/1992',
    mobile: '055 123 4567',
    gender: 'أنثى',
    email: 'sarah.alqahtani@hikmahlab.com'
  };

  get activeTabLabel(): string {
    return this.tabs.find((tab) => tab.id === this.activeTab)?.label ?? '';
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveChanges(): void {
    if (!this.editing) {
      return;
    }

    this.editing = false;
    this.showSavedMessage = true;

    window.setTimeout(() => {
      this.showSavedMessage = false;
    }, 2600);
  }
}
