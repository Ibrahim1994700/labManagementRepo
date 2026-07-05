import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from './shared/Services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  subvalue: any;
  behavesubvalue: any;
  constructor(
    private dataService: DataService,
    private Route: Router,
    private translate: TranslateService,
  ) {}
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    console.log('Are you sure you want to leave?');

    // مثال: حذف التوكن
  }
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent): void {
    if (event.key === 'token' && event.newValue === null) {
      this.Route.navigate(['/Auth/login']);
    }

    if (event.key === null) {
      // هذا غالبًا لما يصير localStorage.clear()
      this.Route.navigate(['/Auth/login']);
    }
  }
  subject = new Subject();
  subjectdf = new BehaviorSubject(null);
  ngOnInit(): void {
    const saved = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const initial = saved ? (saved === 'ar' ? 'ar' : 'en') : (browserLang === 'ar' ? 'ar' : 'en');
    this.translate.addLangs(['en', 'ar']);
    this.translate.use(initial);
    document.documentElement.lang = initial;
    document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((ev) => {
      const lang = ev.lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('lang', lang);
    });
    // if (this.dataService.CheckLocalStorageItem('token')) {
    //   this.Route.navigate(['/Patient-Home/main-user-page']);
    // } else {
    //   this.Route.navigate(['/Auth/login']);

    // }

    //this.subject.subscribe((v) => (this.subvalue = v));

    this.subjectdf.subscribe((v) => (this.behavesubvalue = v));
  }

}
