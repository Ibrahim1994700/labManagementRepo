import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentLang = 'en';

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['en', 'ar']);
    const saved = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    this.currentLang = saved ? (saved === 'ar' ? 'ar' : 'en') : (browserLang === 'ar' ? 'ar' : 'en');
    this.translate.use(this.currentLang);
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  changeLang(lang: 'en' | 'ar') {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
