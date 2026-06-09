import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  imageClass?: string;
  icon?: string;
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'باقة صحة المرأة',
      description: 'تشمل 10 تحاليل أساسية لصحة المرأة',
      price: 560,
      quantity: 1,
      imageClass: 'woman-package'
      // تستطيع استخدام صورة حقيقية:
      // image: 'assets/images/women-health-package.jpg'
    },
    {
      id: 2,
      name: 'فيتامين D',
      description: 'تحليل فيتامين د - 25 هيدروكسي',
      price: 150,
      quantity: 1,
      imageClass: 'vitamin-product',
      icon: 'bi-test-tube'
    }
  ];

  couponCode = 'HEALTH20';
  appliedCoupon = 'HEALTH20';
  discountPercentage = 20;
  couponMessage = '';
  couponMessageType: 'success' | 'error' = 'success';

  useInsurance = true;
  showInsuranceOptions = false;
  selectedInsurance = 'بوبا العربية للتأمين';

  insuranceCompanies: string[] = [
    'بوبا العربية للتأمين',
    'التعاونية للتأمين',
    'تكافل الراجحي',
    'ميدغلف للتأمين'
  ];

  selectedPayment = 'mada';
  termsAccepted = true;
  isSubmitting = false;

  private readonly vatRate = 0.15;

  get productsCount(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get discountAmount(): number {
    if (!this.appliedCoupon) {
      return 0;
    }

    return Math.round(
      this.subtotal * (this.discountPercentage / 100)
    );
  }

  /*
   * حتى تظهر الأرقام مثل الصورة:
   * الإجمالي الفرعي 710
   * الخصم 142
   * الضريبة 85
   * النهائي 653
   *
   * الضريبة تُحسب بعد الخصم:
   * (710 - 142) × 15% = 85.2
   */
  get taxAmount(): number {
    const taxableAmount = this.subtotal - this.discountAmount;
    return Math.round(taxableAmount * this.vatRate);
  }

  get finalTotal(): number {
    return this.subtotal - this.discountAmount + this.taxAmount;
  }

  trackById(index: number, item: CartItem): number {
    return item.id;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(
      item => item.id !== itemId
    );
  }

  clearCart(): void {
    this.cartItems = [];
  }

  applyCoupon(): void {
    const code = this.couponCode.trim().toUpperCase();

    if (!code) {
      this.couponMessage = 'الرجاء إدخال رمز الكوبون.';
      this.couponMessageType = 'error';
      return;
    }

    if (code === 'HEALTH20') {
      this.appliedCoupon = code;
      this.discountPercentage = 20;
      this.couponMessage = 'تم تطبيق الكوبون بنجاح.';
      this.couponMessageType = 'success';
      return;
    }

    this.appliedCoupon = '';
    this.discountPercentage = 0;
    this.couponMessage = 'رمز الكوبون غير صحيح أو منتهي الصلاحية.';
    this.couponMessageType = 'error';
  }

  removeCoupon(): void {
    this.appliedCoupon = '';
    this.couponCode = '';
    this.discountPercentage = 0;
    this.couponMessage = '';
  }

  selectInsurance(company: string): void {
    this.selectedInsurance = company;
    this.showInsuranceOptions = false;
  }

  completeOrder(): void {
    if (
      !this.termsAccepted ||
      this.cartItems.length === 0 ||
      this.isSubmitting
    ) {
      return;
    }

    this.isSubmitting = true;

    const orderData = {
      items: this.cartItems,
      subtotal: this.subtotal,
      discount: this.discountAmount,
      tax: this.taxAmount,
      total: this.finalTotal,
      coupon: this.appliedCoupon,
      paymentMethod: this.selectedPayment,
      useInsurance: this.useInsurance,
      insuranceCompany: this.useInsurance
        ? this.selectedInsurance
        : null
    };

    console.log('Order data:', orderData);

    setTimeout(() => {
      this.isSubmitting = false;
    }, 1500);
  }
}
