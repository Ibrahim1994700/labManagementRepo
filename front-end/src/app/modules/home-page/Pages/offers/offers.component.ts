import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface OfferFilter {
  label: string;
  icon: string;
}

interface Offer {
  title: string;
  description: string;
  discount: number;
  analyses: number;
  code: string;
  oldPrice: number;
  currentPrice: number;
  expiry: string;
  notes: string[];
  tone: 'blue' | 'green' | 'pink';
  icon: string;
}
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
 activeFilter = 'الكل';
  copiedCode: string | null = null;

  filters: OfferFilter[] = [
    {
      label: 'الكل',
      icon: 'bi-grid'
    },
    {
      label: 'باقات',
      icon: 'bi-person'
    },
    {
      label: 'تحاليل',
      icon: 'bi-tag'
    },
    {
      label: 'عروض موسمية',
      icon: 'bi-box-seam'
    }
  ];

  offers: Offer[] = [
    {
      title: 'باقة صحة المرأة',
      description: 'فحوصات متكاملة لصحة المرأة',
      discount: 15,
      analyses: 18,
      code: 'مرأة 15',
      oldPrice: 560,
      currentPrice: 476,
      expiry: '30 يونيو 2024',
      notes: [
        'صالح للحجوزات عبر الموقع والتطبيق فقط',
        'غير قابل للاسترداد نقداً'
      ],
      tone: 'blue',
      icon: 'bi-person-fill'
    },
    {
      title: 'باقة الفحوصات الشاملة',
      description: 'تقييم شامل لصحتك العامة',
      discount: 20,
      analyses: 25,
      code: 'شامل20',
      oldPrice: 750,
      currentPrice: 600,
      expiry: '15 يونيو 2024',
      notes: [
        'صالحة لجميع الفئات العمرية',
        'يشمل السحب من المختبر والفروع'
      ],
      tone: 'green',
      icon: 'bi-shield-check'
    },
    {
      title: 'باقة صحة القلب',
      description: 'تحاليل شاملة لصحة القلب والأوعية الدموية',
      discount: 30,
      analyses: 12,
      code: 'قلب30',
      oldPrice: 650,
      currentPrice: 455,
      expiry: '31 مايو 2024',
      notes: [
        'لا يمكن دمج العرض مع عروض أخرى',
        'صالح للحجز مرة واحدة لكل مستخدم'
      ],
      tone: 'pink',
      icon: 'bi-heart-pulse-fill'
    }
  ];

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  copyCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => undefined);
    }

    this.copiedCode = code;

    window.setTimeout(() => {
      this.copiedCode = null;
    }, 1500);
  }

  applyOffer(offer: Offer): void {
    console.log('تطبيق العرض:', offer);
  }

  showDetails(offer: Offer): void {
    console.log('تفاصيل العرض:', offer);
  }

  trackByOfferCode(index: number, offer: Offer): string {
    return offer.code;
  }
}
