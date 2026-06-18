import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from './shared/Services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';

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
    // if (this.dataService.CheckLocalStorageItem('token')) {
    //   this.Route.navigate(['/Patient-Home/main-user-page']);
    // } else {
    //   this.Route.navigate(['/Auth/login']);

    // }

    //this.subject.subscribe((v) => (this.subvalue = v));

    this.subjectdf.subscribe((v) => (this.behavesubvalue = v));
  }

  x1() {
    this.subject.next('3');
  }

  x2() {
  //  this.subjectdf.next('4');
  }
  x3() {

        this.subject.subscribe((v) => (this.subvalue +=v));
   // this.subject.next(16);

  }

  x4() {

            this.subjectdf.subscribe((v) => (this.behavesubvalue = v+'xxxxx',alert('asd')));

  }
}
