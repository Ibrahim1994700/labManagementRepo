import { Component } from '@angular/core';
import { DataService } from '../../shared/Services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/Components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MainUserPageComponent } from "./Pages/main-user-page/main-user-page.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SidebarComponent, RouterModule],
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private dataservice: DataService) {}
  
}
