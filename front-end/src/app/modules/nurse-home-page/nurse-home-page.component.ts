import { Component } from '@angular/core';
import { AdminRoutingModule } from "../admin/admin-routing.module";
import { CommonModule } from '@angular/common';
import { NurseSideBarComponent } from '../../shared/Components/nurse-side-bar/nurse-side-bar.component';


@Component({
  selector: 'app-nurse-home-page',
  standalone: true,
  imports: [AdminRoutingModule,CommonModule,NurseSideBarComponent],
  templateUrl: './nurse-home-page.component.html',
  styleUrl: './nurse-home-page.component.css'
})
export class NurseHomePageComponent {



}
