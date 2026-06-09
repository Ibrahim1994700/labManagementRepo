import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Gender = 'ذكر' | 'أنثى';
type MemberStatus = 'نشط' | 'قاصر';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: string;
  gender: Gender;
  status: MemberStatus;
  avatar: string;

  birthDate: string;
  phone: string;
  email: string;
  bloodType: string;

  insuranceType: string;
  policyNumber: string;
  insuranceExpiry: string;
}
@Component({
  selector: 'app-family-account',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './family-account.component.html',
  styleUrl: './family-account.component.css'
})
export class FamilyAccountComponent {
  searchValue = '';
  selectedStatus = 'كل الحالات';

  members: FamilyMember[] = [
    {
      id: 'AHM-001',
      name: 'أحمد محمد',
      relationship: 'أنت',
      age: '32 سنة',
      gender: 'ذكر',
      status: 'نشط',
      avatar: 'assets/images/family/ahmed.jpg',
      birthDate: '15 مايو 1992',
      phone: '+966 50 123 4567',
      email: 'ahmed@example.com',
      bloodType: 'O+',
      insuranceType: 'تأمين بوبا',
      policyNumber: 'BUPA-987654321',
      insuranceExpiry: '31 ديسمبر 2024'
    },
    {
      id: 'SAR-002',
      name: 'سارة أحمد',
      relationship: 'زوجة',
      age: '30 سنة',
      gender: 'أنثى',
      status: 'نشط',
      avatar: 'assets/images/family/sara.jpg',
      birthDate: '8 نوفمبر 1994',
      phone: '+966 50 222 1478',
      email: 'sara@example.com',
      bloodType: 'A+',
      insuranceType: 'تأمين بوبا',
      policyNumber: 'BUPA-557654321',
      insuranceExpiry: '31 ديسمبر 2024'
    },
    {
      id: 'LIY-003',
      name: 'ليان أحمد',
      relationship: 'ابنة',
      age: '10 سنوات',
      gender: 'أنثى',
      status: 'قاصر',
      avatar: 'assets/images/family/layan.jpg',
      birthDate: '18 فبراير 2016',
      phone: 'غير متوفر',
      email: 'غير متوفر',
      bloodType: 'O+',
      insuranceType: 'تأمين بوبا',
      policyNumber: 'BUPA-337654321',
      insuranceExpiry: '31 ديسمبر 2024'
    },
    {
      id: 'MOH-004',
      name: 'محمد أحمد',
      relationship: 'ابن',
      age: '7 سنوات',
      gender: 'ذكر',
      status: 'قاصر',
      avatar: 'assets/images/family/mohammed.jpg',
      birthDate: '21 أغسطس 2019',
      phone: 'غير متوفر',
      email: 'غير متوفر',
      bloodType: 'B+',
      insuranceType: 'تأمين بوبا',
      policyNumber: 'BUPA-227654321',
      insuranceExpiry: '31 ديسمبر 2024'
    },
    {
      id: 'MOM-005',
      name: 'أم أحمد',
      relationship: 'والدة',
      age: '58 سنة',
      gender: 'أنثى',
      status: 'نشط',
      avatar: 'assets/images/family/mother.jpg',
      birthDate: '2 مارس 1968',
      phone: '+966 50 717 2956',
      email: 'mother@example.com',
      bloodType: 'AB+',
      insuranceType: 'تأمين بوبا',
      policyNumber: 'BUPA-117654321',
      insuranceExpiry: '31 ديسمبر 2024'
    }
  ];

  selectedMember: FamilyMember = this.members[0];

  get filteredMembers(): FamilyMember[] {
    const search = this.searchValue.trim().toLowerCase();

    return this.members.filter(member => {
      const matchesSearch =
        !search ||
        member.name.toLowerCase().includes(search) ||
        member.id.toLowerCase().includes(search) ||
        member.relationship.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'كل الحالات' ||
        member.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get activeMembersCount(): number {
    return this.members.filter(member => member.status === 'نشط').length;
  }

  get minorsCount(): number {
    return this.members.filter(member => member.status === 'قاصر').length;
  }

  selectMember(member: FamilyMember): void {
    this.selectedMember = member;
  }

  addMember(): void {
    console.log('إضافة فرد جديد');
  }

  editMember(member: FamilyMember): void {
    console.log('تعديل الفرد:', member);
  }

  showResults(member: FamilyMember): void {
    console.log('عرض النتائج:', member);
  }

  createBooking(member: FamilyMember): void {
    console.log('إنشاء حجز:', member);
  }

  removeMember(): void {
    console.log('إزالة الفرد:', this.selectedMember);
  }

  trackByMemberId(index: number, member: FamilyMember): string {
    return member.id;
  }
}
