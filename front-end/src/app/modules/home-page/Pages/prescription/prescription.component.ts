import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Analysis {
  name: string;
  type: string;
}

interface ExtractedTest {
  arabicName: string;
  code: string;
  tone: 'purple' | 'green' | 'orange' | 'blue';
}
@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {
  notesLength = 0;
  selectedFileName = '';
  isDragging = false;
  acceptedTerms = false;

  readonly maxFileSize = 10 * 1024 * 1024;

  extractedTests: ExtractedTest[] = [
    {
      arabicName: 'صورة دم كاملة',
      code: 'CBC',
      tone: 'purple'
    },
    {
      arabicName: 'سكر صائم',
      code: 'FBS',
      tone: 'green'
    },
    {
      arabicName: 'دهون ثلاثية',
      code: 'TRIG',
      tone: 'orange'
    },
    {
      arabicName: 'وظائف الكبد',
      code: 'ALT',
      tone: 'blue'
    },
    {
      arabicName: 'فيتامين د',
      code: 'VITD',
      tone: 'purple'
    }
  ];

  updateNotesLength(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.notesLength = textarea.value.length;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.processFile(input.files[0]);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];

    if (file) {
      this.processFile(file);
    }
  }

  removeFile(): void {
    this.selectedFileName = '';
  }

  private processFile(file: File): void {
    const acceptedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/heic',
      'image/heif',
      'application/pdf'
    ];

    const extension = file.name
      .split('.')
      .pop()
      ?.toLowerCase();

    const acceptedExtensions = [
      'jpg',
      'jpeg',
      'png',
      'heic',
      'heif',
      'pdf'
    ];

    const isAccepted =
      acceptedTypes.includes(file.type) ||
      acceptedExtensions.includes(extension ?? '');

    if (!isAccepted) {
      alert('نوع الملف غير مدعوم. الرجاء اختيار JPG أو PNG أو HEIC أو PDF.');
      return;
    }

    if (file.size > this.maxFileSize) {
      alert('حجم الملف أكبر من 10MB.');
      return;
    }

    this.selectedFileName = file.name;
  }
}

