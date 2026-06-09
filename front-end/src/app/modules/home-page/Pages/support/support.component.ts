import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface ContactMethod {
  title: string;
  description: string;
  value?: string;
  status?: string;
  buttonText: string;
  icon: string;
  tone: string;
  type: 'ticket' | 'email' | 'phone' | 'chat';
  link?: string;
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
 selectedFiles: File[] = [];

  ticket = {
    subject: '',
    priority: 'medium',
    details: ''
  };

  contactMethods: ContactMethod[] = [
    {
      title: 'تذكرة دعم',
      description: 'سجل طلبك وسنرد عليك',
      buttonText: 'إنشاء تذكرة',
      icon: 'bi-ticket-perforated',
      tone: 'orange',
      type: 'ticket'
    },
    {
      title: 'راسلنا عبر البريد',
      description: 'نرد خلال 24 ساعة',
      value: 'support@alhikmahlab.com',
      buttonText: 'إرسال بريد',
      icon: 'bi-envelope',
      tone: 'blue',
      type: 'email',
      link: 'mailto:support@alhikmahlab.com'
    },
    {
      title: 'اتصل بنا',
      description: 'خدمة العملاء',
      value: '9200 12 999',
      buttonText: 'اتصل الآن',
      icon: 'bi-telephone',
      tone: 'purple',
      type: 'phone',
      link: 'tel:920012999'
    },
    {
      title: 'الدردشة المباشرة',
      description: 'تحدث مع أحد ممثلينا الآن',
      status: 'متاح الآن',
      buttonText: 'بدء دردشة',
      icon: 'bi-chat-dots',
      tone: 'green',
      type: 'chat'
    }
  ];

  faqItems: FaqItem[] = [
    {
      question: 'الأسئلة الشائعة حول النتائج',
      answer:
        'يمكنك متابعة نتائج التحاليل من صفحة النتائج داخل حسابك، وسيتم إشعارك عند اعتماد النتيجة.',
      open: false
    },
    {
      question: 'الأسئلة الشائعة حول السحب المنزلي',
      answer:
        'يمكنك تحديد موعد السحب المنزلي واختيار التاريخ والوقت المناسب من صفحة السحب المنزلي.',
      open: false
    },
    {
      question: 'الأسئلة الشائعة حول الدفع',
      answer:
        'نوفر عدة طرق دفع إلكترونية آمنة، ويمكنك مراجعة تفاصيل العملية من صفحة الطلب.',
      open: false
    },
    {
      question: 'الأسئلة الشائعة حول التأمين',
      answer:
        'تختلف التغطية بحسب شركة التأمين ونوع الوثيقة، ويمكن التأكد من الأهلية قبل إتمام الطلب.',
      open: false
    },
    {
      question: 'الأسئلة الشائعة حول رفع الوصفة',
      answer:
        'يمكن رفع الوصفة بصيغة صورة أو PDF، ويجب أن تكون البيانات المكتوبة واضحة وقابلة للقراءة.',
      open: false
    }
  ];

  responseTimes = [
    {
      title: 'الدردشة المباشرة',
      time: 'خلال دقائق',
      icon: 'bi-chat-dots',
      tone: 'blue'
    },
    {
      title: 'تذاكر الدعم',
      time: 'خلال 24 ساعة',
      icon: 'bi-ticket-perforated',
      tone: 'purple'
    },
    {
      title: 'البريد الإلكتروني',
      time: 'خلال 24 ساعة',
      icon: 'bi-envelope',
      tone: 'green'
    }
  ];

  quickTips: string[] = [
    'تأكد من تسجيل الدخول لحسابك',
    'تحقق من حالة طلبك في صفحة النتائج',
    'تأكد من صحة رقم الجوال والبريد الإلكتروني',
    'احتفظ برقم الطلب عند التواصل معنا'
  ];

  knowledgeArticles = [
    {
      category: 'الوصفة',
      title: 'كيف أرفع وصفتي الطبية؟',
      description: 'خطوات رفع الوصفة الطبية وطلب التحاليل بسهولة.',
      icon: 'bi-file-earmark-medical',
      tone: 'orange'
    },
    {
      category: 'التأمين',
      title: 'شركات التأمين المعتمدة',
      description: 'قائمة شركات التأمين التي نتعامل معها.',
      icon: 'bi-briefcase',
      tone: 'green'
    },
    {
      category: 'الدفع',
      title: 'طرق الدفع المتاحة',
      description: 'تعرف على جميع طرق الدفع الآمنة لدينا.',
      icon: 'bi-credit-card',
      tone: 'purple'
    },
    {
      category: 'السحب المنزلي',
      title: 'كيف أطلب سحب منزلي؟',
      description: 'خطوات طلب خدمة السحب المنزلي بسهولة.',
      icon: 'bi-bag-heart',
      tone: 'yellow'
    },
    {
      category: 'النتائج',
      title: 'كيف أقرأ نتائج التحاليل؟',
      description: 'دليل مبسط لفهم نتائج المختبر وما تعنيه.',
      icon: 'bi-file-earmark-bar-graph',
      tone: 'blue'
    }
  ];

  toggleFaq(index: number): void {
    this.faqItems = this.faqItems.map((faq, faqIndex) => ({
      ...faq,
      open: faqIndex === index ? !faq.open : false
    }));
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const newFiles = Array.from(input.files);
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png'
    ];

    const validFiles = newFiles.filter(file => {
      const isAllowedType = allowedTypes.includes(file.type);
      const isAllowedSize = file.size <= 10 * 1024 * 1024;

      return isAllowedType && isAllowedSize;
    });

    this.selectedFiles = [
      ...this.selectedFiles,
      ...validFiles
    ].slice(0, 5);

    input.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.selectedFiles = [...this.selectedFiles];
  }

  handleContact(type: ContactMethod['type']): void {
    switch (type) {
      case 'ticket':
        document
          .querySelector('.ticket-panel')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        break;

      case 'email':
        window.location.href = 'mailto:support@alhikmahlab.com';
        break;

      case 'phone':
        window.location.href = 'tel:920012999';
        break;

      case 'chat':
        this.startChat();
        break;
    }
  }

  startChat(): void {
    console.log('Open live chat');
    // ضع هنا كود فتح نافذة الدردشة.
  }

  submitTicket(): void {
    const formData = new FormData();

    formData.append('subject', this.ticket.subject);
    formData.append('priority', this.ticket.priority);
    formData.append('details', this.ticket.details);

    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    console.log('Ticket data:', this.ticket);
    console.log('Attached files:', this.selectedFiles);

    // ضع استدعاء الـ API هنا.
    // this.supportService.createTicket(formData).subscribe(...);
  }
}
