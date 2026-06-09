import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from './shared/Services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
  ngOnInit(): void {
    // if (this.dataService.CheckLocalStorageItem('token')) {
    //   this.Route.navigate(['/Patient-Home/main-user-page']);
    // } else {
    //   this.Route.navigate(['/Auth/login']);
    // }
  }

 
}
