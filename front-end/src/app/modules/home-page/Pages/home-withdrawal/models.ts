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

export const CalendarDay = [
  { dayName: 'saturday', number: 1 },
  { dayName: 'sunday', number: 2 },
  { dayName: 'monday', number: 3 },
  { dayName: 'tuesday', number: 4 },
  { dayName: 'wednesday', number: 5 },
  { dayName: 'thursday', number: 6 },
  { dayName: 'friday', number: 7 },
];
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
    placeHolder: 'ادخل اسم المريض',
    formControlName: 'name',
    inputType: 'text',
    label: 'اسم المريض',
  },
  {
    placeHolder: 'ادخل عمر المريض',
    formControlName: 'age',
    inputType: 'number',
    label: 'عمر المريض',
  },
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

