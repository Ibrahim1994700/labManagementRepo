import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { FooterComponent } from '../../shared/Components/footer/footer.component';
import { MainRoutingModule } from './main-routing.module';
import { Route, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../shared/Services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  /**
   *
   */
  constructor(
    private dataService: DataService,
    private Route: Router,
  ) {}
  ngOnInit(): void {

    
  }
}
