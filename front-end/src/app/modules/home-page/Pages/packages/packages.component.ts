import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Category {
  label: string;
  icon: string;
  color: string;
}

interface HealthPackage {
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  softColor: string;
  discount: number;
  tests: number;
  fasting: string;
  resultTime: string;
  currentPrice: number;
  oldPrice: number;
}
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  searchText = '';
  activeCategory = 'الكل';
  sortValue = 'الأكثر شيوعاً';

  categories: Category[] = [
    {
      label: 'الكل',
      icon: '',
      color: '#2774e6'
    },
    {
      label: 'الفحص الشامل',
      icon: 'bi-shield-check',
      color: '#42bc8c'
    },
    {
      label: 'صحة المرأة',
      icon: 'bi-gender-female',
      color: '#a46bea'
    },
    {
      label: 'صحة الرجل',
      icon: 'bi-gender-male',
      color: '#4b99e7'
    },
    {
      label: 'الفيتامينات والمعادن',
      icon: 'bi-person',
      color: '#ef9c3d'
    },
    {
      label: 'أمراض مزمنة',
      icon: 'bi-heart',
      color: '#ec5b67'
    }
  ];

  packages: HealthPackage[] = [
    {
      title: 'باقة السكري',
      description: 'متابعة شاملة لمستويات السكر ومؤشرات الاستقلاب والمضاعفات',
      category: 'أمراض مزمنة',
      icon: 'bi-droplet',
      color: '#13a873',
      softColor: '#e4f8f0',
      discount: 20,
      tests: 35,
      fasting: 'صيام 8 ساعات',
      resultTime: '1-2 يوم عمل',
      currentPrice: 349,
      oldPrice: 439
    },
    {
      title: 'باقة صحة الرجل',
      description: 'تحاليل متخصصة لصحة الرجل والهرمونات والخصوبة والطاقة',
      category: 'صحة الرجل',
      icon: 'bi-gender-male',
      color: '#398bd5',
      softColor: '#e8f3fd',
      discount: 15,
      tests: 40,
      fasting: 'صيام 8 ساعات',
      resultTime: '2-3 أيام عمل',
      currentPrice: 459,
      oldPrice: 539
    },
    {
      title: 'باقة صحة المرأة',
      description: 'تحاليل شاملة لصحة المرأة والهرمونات والدورة الشهرية والخصوبة',
      category: 'صحة المرأة',
      icon: 'bi-gender-female',
      color: '#df45a1',
      softColor: '#fceafa',
      discount: 20,
      tests: 45,
      fasting: 'صيام 8 ساعات',
      resultTime: '2-2 يوم عمل',
      currentPrice: 439,
      oldPrice: 549
    },
    {
      title: 'باقة الغدة الدرقية',
      description: 'تقييم شامل لوظائف الغدة الدرقية والهرمونات ذات الصلة',
      category: 'أمراض مزمنة',
      icon: 'bi-butterfly',
      color: '#338fda',
      softColor: '#e9f4fc',
      discount: 10,
      tests: 18,
      fasting: 'صيام 8 ساعات',
      resultTime: '1-2 يوم عمل',
      currentPrice: 269,
      oldPrice: 299
    },
    {
      title: 'باقة الكبد',
      description: 'فحوصات شاملة لوظائف الكبد والكشف عن الالتهابات',
      category: 'الفحص الشامل',
      icon: 'bi-feather',
      color: '#9c57e7',
      softColor: '#f1eafb',
      discount: 15,
      tests: 22,
      fasting: 'صيام 8 ساعات',
      resultTime: '2-2 يوم عمل',
      currentPrice: 299,
      oldPrice: 349
    },
    {
      title: 'باقة القلب والأوعية الدموية',
      description: 'تقييم شامل لصحة القلب والكوليسترول والدهون الثلاثية',
      category: 'أمراض مزمنة',
      icon: 'bi-heart',
      color: '#eb5b61',
      softColor: '#fff0ef',
      discount: 18,
      tests: 28,
      fasting: 'صيام 10 ساعات',
      resultTime: '1-2 يوم عمل',
      currentPrice: 399,
      oldPrice: 489
    }
  ];

  get filteredPackages(): HealthPackage[] {
    const search = this.searchText.trim().toLowerCase();

    return this.packages.filter((item) => {
      const categoryMatches =
        this.activeCategory === 'الكل' ||
        item.category === this.activeCategory;

      const searchMatches =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);

      return categoryMatches && searchMatches;
    });
  }

  selectCategory(category: string): void {
    this.activeCategory = category;
  }
}
