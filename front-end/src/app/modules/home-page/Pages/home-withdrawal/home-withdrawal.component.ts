import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  calendarDays,
  listOfInputs,
  ServiceItem,
  services,
  steps,
  times,
} from './models';
import { MapComponent } from '../../../../shared/Components/map/map.component';
import { SharedDialogComponent } from '../../../../shared/Components/shared-dialog/shared-dialog.component';

@Component({
  selector: 'app-home-withdrawal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MapComponent,
    SharedDialogComponent,
  ],
  templateUrl: './home-withdrawal.component.html',
  styleUrl: './home-withdrawal.component.css',
})
export class HomeWithdrawalComponent implements AfterViewInit, OnInit {
  steps = steps;
  times = times;
  services = services;
  calendarDays = calendarDays;
  visible: boolean = false;
  selectedService: any;
  selectedDay = 5;
  selectedTime = 1;
  selectedPayment: any;
  pp: FormGroup | any;
  listOfInputs = listOfInputs;
  get listOfPaitent() {
    return this.pp.get('listOfPaitent') as FormArray;
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initialForm();
    this.calculateFirstStep();
    this.calculateSecondStep();
  }

  ngAfterViewInit(): void {}

  remove(index: number) {
    this.listOfPaitent.removeAt(index);
    if (this.listOfPaitent.length == 0) {
    }
  }

  openDialog() {
    this.visible = true;
  }

  initialForm() {
    this.pp = new FormGroup({
      name: new FormControl(),
      age: new FormControl(),
      listOfPaitent: new FormArray([]),
      packages: new FormGroup({
        name: new FormControl(),
        price: new FormControl(),
      }),
    });
  }

  calculateFirstStep() {
    this.listOfPaitent.valueChanges.subscribe((res) => {
      if (res.length == 0) {
        steps[0].finishStep = false;
      }
    });
  }

  calculateSecondStep() {
    (this.pp as FormGroup).valueChanges.subscribe((res: any) => {
      const packageName = res?.packages?.name;
      if (packageName == null) {
        steps[1].finishStep = false;
      } else if (packageName != null) {
        steps[1].finishStep = true;
      }
    });
  }

  get selectedServiceItem(): ServiceItem {
    return services[this.selectedService];
  }

  selectService(service: any, index: number): void {
    let x = this.pp.get('packages') as FormGroup;

    x.get('name')?.setValue(service.title);
    x.get('price')?.setValue(service.price);

    this.selectedService = index;
  }

  selectDay(index: number): void {
    this.selectedDay = index;
  }

  selectTime(index: number): void {
    this.selectedTime = index;
  }

  selectPayment(index: number): void {
    this.selectedPayment = index;
  }
}
