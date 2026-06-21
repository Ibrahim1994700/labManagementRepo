export interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
}

export interface ServiceItem {
  title: string;
  price: number;
  icon: string;
  tone: 'orange' | 'green' | 'pink' | 'purple';
}

export interface CalendarDay {
  dayName: string;
  day: number;
  month: string;
  available: boolean;
}

export const steps = [
  {
    number: 1,
    name: 'اختيار الفرع',
    finishStep: false,
  },
  {
    number: 2,
    name: 'اختيار المريض',
    finishStep: false,
  },
  {
    number: 3,
    name: 'اختيار الخدمه',
    finishStep: false,
  },
  {
    number: 4,
    name: 'اختيار التاريخ والوقت',
    finishStep: false,
  },
  {
    number: 5,
    name: 'اختيار العنوان',
    finishStep: false,
  },
  {
    number: 6,
    name: 'اختيار طريقه الدفع',
    finishStep: false,
  },
];

export const listOfInputs = [
  {
    placeHolder: 'test',
    formControlName:'name',
    inputType:"text"
  },
  { placeHolder: 'test',
    formControlName:'age',
    inputType:"number"},
];

export const navItems: NavItem[] = [
  { label: 'الرئيسية', icon: 'bi-house-door-fill' },
  { label: 'حجوزاتي', icon: 'bi-calendar3' },
  { label: 'السحب المنزلي', icon: 'bi-bicycle', active: true },
  { label: 'الباقات', icon: 'bi-bag' },
  { label: 'التحاليل الفردية', icon: 'bi-droplet-half' },
  { label: 'النتائج', icon: 'bi-check2-square' },
  { label: 'العروض', icon: 'bi-tag' },
  { label: 'حساب العائلة', icon: 'bi-people' },
  { label: 'الوصفة الطبية', icon: 'bi-file-earmark-medical' },
  { label: 'الدعم', icon: 'bi-headset' },
];

export const services: ServiceItem[] = [
  {
    title: 'باقة فيتامينات',
    price: 199,
    icon: 'bi-capsule-pill',
    tone: 'orange',
  },
  {
    title: 'باقة فحص شامل',
    price: 299,
    icon: 'bi-house-heart',
    tone: 'green',
  },
  {
    title: 'باقة صحة المرأة',
    price: 349,
    icon: 'bi-gender-female',
    tone: 'pink',
  },
  {
    title: 'باقة فحص شامل للرجل',
    price: 399,
    icon: 'bi-droplet-half-fill',
    tone: 'purple',
  },
];



export const times = [
  '08:00 ص - 09:00 ص',
  '09:00 ص - 10:00 ص',
  '10:00 ص - 11:00 ص',
  '11:00 ص - 12:00 م',
  '12:00 م - 01:00 م',
  '01:00 م - 02:00 م',
];
