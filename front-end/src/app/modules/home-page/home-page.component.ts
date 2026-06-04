import { Component } from '@angular/core';
import { DataService } from '../../shared/Services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/Components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule,SidebarComponent,RouterModule],
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private dataservice: DataService) {}
  patientName = 'Ahmad';
  unreadNotificationsCount = 3;
  testSearchText = '';

  searchModel = {
    keyword: '',
    location: '',
    preferredDate: '',
  };

  homeCollection = {
    memberId: null as number | null,
    serviceType: 'package',
    collectionDate: '',
    timeSlot: '10:00-12:00',
    address: '',
    paymentMethod: 'cash',
    notes: '',
  };

  quickServices = [
    {
      title: 'Home Collection',
      description: 'Book a nurse visit to collect your sample at home.',
      icon: 'assets/img/icons/work-03.svg',
      route: 'home-collection',
    },
    {
      title: 'Health Packages',
      description: 'Checkup, diabetes, thyroid, vitamins and more.',
      icon: 'assets/img/icons/price-icon2.svg',
      route: 'packages',
    },
    {
      title: 'Individual Tests',
      description: 'Search and add tests such as CBC, HbA1c and Vitamin D.',
      icon: 'assets/img/icons/work-01.svg',
      route: 'tests',
    },
    {
      title: 'My Results',
      description: 'Download PDF reports and view result trends.',
      icon: 'assets/img/icons/work-04.svg',
      route: 'results',
    },
    {
      title: 'Family Account',
      description: 'Add family members and book tests for them.',
      icon: 'assets/img/icons/work-02.svg',
      route: 'family',
    },
    {
      title: 'Upload Prescription',
      description:
        'Upload a doctor request and let the lab prepare your order.',
      icon: 'assets/img/icons/header-icon.svg',
      route: 'prescription',
    },
    {
      title: 'Offers',
      description: 'View discounts and seasonal campaigns.',
      icon: 'assets/img/icons/price-icon1.svg',
      route: 'offers',
    },
    {
      title: 'Support Chat',
      description: 'Ask about tests, prices, fasting and booking.',
      icon: 'assets/img/icons/price-icon3.svg',
      route: 'support',
    },
  ];

  familyMembers = [
    { id: 1, name: 'Ahmad Ali', relation: 'Self', age: 28 },
    { id: 2, name: 'Sara Ali', relation: 'Sister', age: 22 },
    { id: 3, name: 'Omar Ali', relation: 'Father', age: 55 },
  ];

  packages = [
    {
      id: 1,
      category: 'For routine checkup',
      name: 'Complete Checkup',
      description: 'A practical package for general health screening.',
      price: 35,
      oldPrice: 45,
      icon: 'assets/img/icons/price-icon1.svg',
      isPopular: false,
      tests: [
        'CBC',
        'Fasting Blood Sugar',
        'Lipid Profile',
        'Liver Function',
        'Kidney Function',
      ],
    },
    {
      id: 2,
      category: 'Most requested',
      name: 'Diabetes & Lipid Package',
      description:
        'Useful for diabetes follow-up and cardiovascular risk monitoring.',
      price: 25,
      oldPrice: 32,
      icon: 'assets/img/icons/price-icon2.svg',
      isPopular: true,
      tests: ['HbA1c', 'Fasting Blood Sugar', 'Lipid Profile', 'Creatinine'],
    },
    {
      id: 3,
      category: 'Energy and fatigue',
      name: 'Vitamin & Thyroid Package',
      description:
        'Common package for fatigue, hair loss and low energy assessment.',
      price: 30,
      oldPrice: 40,
      icon: 'assets/img/icons/price-icon3.svg',
      isPopular: false,
      tests: ['Vitamin D', 'Vitamin B12', 'TSH', 'CBC', 'Ferritin'],
    },
  ];

  tests = [
    {
      id: 1,
      name: 'CBC',
      category: 'Hematology',
      price: 5,
      reportTime: 'Same day',
      preparation: 'No fasting needed',
    },
    {
      id: 2,
      name: 'HbA1c',
      category: 'Diabetes',
      price: 7,
      reportTime: 'Same day',
      preparation: 'No fasting needed',
    },
    {
      id: 3,
      name: 'Vitamin D',
      category: 'Vitamins',
      price: 15,
      reportTime: '24 hours',
      preparation: 'No fasting needed',
    },
    {
      id: 4,
      name: 'Lipid Profile',
      category: 'Biochemistry',
      price: 10,
      reportTime: 'Same day',
      preparation: 'Fasting may be required',
    },
    {
      id: 5,
      name: 'TSH',
      category: 'Hormones',
      price: 9,
      reportTime: '24 hours',
      preparation: 'Ask lab about medication timing',
    },
    {
      id: 6,
      name: 'Kidney Function Test',
      category: 'Biochemistry',
      price: 8,
      reportTime: 'Same day',
      preparation: 'No fasting needed',
    },
  ];

  bookings = [
    {
      id: 101,
      title: 'Complete Checkup Package',
      type: 'Home Collection',
      date: '2026-06-05',
      address: 'Amman - Khalda',
      status: 'Confirmed',
      paymentStatus: 'Cash',
      isStat: false,
      canReschedule: true,
      canCancel: true,
    },
    {
      id: 102,
      title: 'CBC + HbA1c',
      type: 'Lab Visit',
      date: '2026-06-03',
      address: 'Main Branch',
      status: 'Report Ready',
      paymentStatus: 'Paid',
      isStat: false,
      canReschedule: false,
      canCancel: false,
    },
  ];

  results = [
    {
      id: 201,
      title: 'Complete Checkup Report',
      patientName: 'Ahmad Ali',
      date: '2026-06-03',
      summary:
        'CBC, lipid profile, liver and kidney function results are available.',
    },
    {
      id: 202,
      title: 'Diabetes Follow-up Report',
      patientName: 'Omar Ali',
      date: '2026-05-20',
      summary:
        'HbA1c and fasting glucose results are available with trend option.',
    },
  ];

  offers = [
    {
      id: 1,
      tag: 'New Patient',
      title: '10% off first booking',
      description: 'Valid for the first home collection or lab visit booking.',
      discount: '10% OFF',
      validUntil: '2026-07-01',
    },
    {
      id: 2,
      tag: 'Family',
      title: 'Family checkup offer',
      description:
        'Book for three family members and get a discounted package.',
      discount: 'Bundle Price',
      validUntil: '2026-07-15',
    },
    {
      id: 3,
      tag: 'Seasonal',
      title: 'Vitamin D campaign',
      description: 'Discounted Vitamin D test for a limited time.',
      discount: '15 JD',
      validUntil: '2026-06-30',
    },
  ];

  articles = [
    {
      id: 1,
      title: 'When should you check Vitamin D?',
      author: 'Lab Team',
      date: '04 Jun, 2026',
      summary: 'Simple guide about common reasons for Vitamin D testing.',
      image: 'assets/img/blog/blog-11.jpg',
    },
    {
      id: 2,
      title: 'Do you need fasting before blood tests?',
      author: 'Lab Team',
      date: '04 Jun, 2026',
      summary: 'Understand which tests usually need fasting and which do not.',
      image: 'assets/img/blog/blog-12.jpg',
    },
  ];

  faqs = [
    {
      question: 'Can I book a home sample collection online?',
      answer:
        'Yes. Choose the patient, tests or package, address, date, time slot and payment method, then confirm the booking.',
    },
    {
      question: 'How will I receive my lab results?',
      answer:
        'You can view and download your result as a PDF from My Results once the report is approved by the lab.',
    },
    {
      question: 'Can I book tests for my family?',
      answer:
        'Yes. Add family members to your account and choose the correct person during booking.',
    },
    {
      question: 'Can I upload a doctor prescription?',
      answer:
        'Yes. Upload the prescription and the lab team can prepare the required tests before confirmation.',
    },
  ];

  partners = [
    { id: 1, name: 'Partner 1', logo: 'assets/img/partners/partners-1.svg' },
    { id: 2, name: 'Partner 2', logo: 'assets/img/partners/partners-2.svg' },
    { id: 3, name: 'Partner 3', logo: 'assets/img/partners/partners-3.svg' },
    { id: 4, name: 'Partner 4', logo: 'assets/img/partners/partners-4.svg' },
  ];

  bookHomeCollection(): void {}
  goToMyResults(): void {}
  searchLabServices(): void {}
  useCurrentLocation(): void {}
  openNotifications(): void {}
  openQuickService(service: any): void {}
  submitHomeCollection(): void {}
  uploadPrescription(): void {}
  bookPackage(packageItem: any): void {}
  viewPackageDetails(packageItem: any): void {}
  filterTests(): void {}
  viewTestDetails(test: any): void {}
  addTestToCart(test: any): void {}
  compareTestHistory(test: any): void {}
  trackBooking(booking: any): void {}
  rescheduleBooking(booking: any): void {}
  cancelBooking(booking: any): void {}
  downloadResult(result: any): void {}
  shareResult(result: any): void {}
  viewTrend(result: any): void {}
  applyOffer(offer: any): void {}
  bookForMember(member: any): void {}
  addFamilyMember(): void {}
  startSmartAssistant(): void {}
  chatWithSupport(): void {}
  openArticle(article: any): void {}
  openPartner(partner: any): void {}
}
