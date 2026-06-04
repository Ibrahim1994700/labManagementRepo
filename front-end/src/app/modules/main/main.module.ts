import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { MainPageComponent } from './main-page.component';
import { FooterComponent } from '../../shared/Components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [MainPageComponent,HeaderComponent,FooterComponent],
  imports: [CommonModule, MainRoutingModule,FormsModule,ReactiveFormsModule],
})
export class MainModule {}
