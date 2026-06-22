import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { listOfInputs, ServiceItem, services, steps, times } from './models';
import { MapComponent } from '../../../../shared/Components/map/map.component';
import { SharedDialogComponent } from '../../../../shared/Components/shared-dialog/shared-dialog.component';
import { HomeWithDrwalService } from './home-with-drwal.service';

@Component({
  selector: 'amainFormGroup-home-withdrawal',
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
  selectedTab: string = 'packages';
  services = services;
  calendarDays: any;
  visible: boolean = false;
  selectedService: any;
  selectSpecificBranch: any;
  selectedDay = 5;
  selectedTime = 1;
  selectedPayment: any;
  mainFormGroup!: FormGroup;
  listOfInputs = listOfInputs;
  AllBranches!: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  get listOfPaitent() {
    return this.mainFormGroup.get('listOfPaitent') as FormArray;
  }

  constructor(
    private ngZone: NgZone,
    private service: HomeWithDrwalService,
  ) {}

  ngOnInit(): void {
    this.initialForm();
    this.calculateFirstStep();
    this.calculateSecondStep();
    this.calculateThirdStep();
    this.getAllBranches();
    this.observeMainForm();
  }

  observeMainForm() {
    this.mainFormGroup.get('listOfPaitents')?.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  getAllBranches() {
    this.service.getAllBranches().subscribe({
      next: (res) => {
        this.AllBranches = res;
      },
      error: () => {},
      complete: () => {},
    });
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
    this.mainFormGroup = new FormGroup({
      BranchSelected: new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
      }),

      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      listOfPaitent: new FormArray([]),
      packages: new FormGroup({
        name: new FormControl(),
        price: new FormControl(),
      }),
    });
  }

  calculateFirstStep() {
    this.mainFormGroup
      .get('BranchSelected')
      ?.valueChanges.subscribe((res: any) => {
        if (res.id == null || res.name == null) {
          steps[0].finishStep = false;
        } else if (res.id && res.name) {
          steps[0].finishStep = true;
        }
      });
  }

  calculateSecondStep() {
    this.listOfPaitent.valueChanges.subscribe((res) => {
      if (res.length == 0) {
        steps[1].finishStep = false;
      } else {
        steps[1].finishStep = true;
      }
    });
  }

  calculateThirdStep() {
    (this.mainFormGroup as FormGroup).valueChanges.subscribe((res: any) => {
      const packageName = res?.packages?.name;
      if (packageName == null) {
        steps[2].finishStep = false;
      } else if (packageName != null) {
        steps[2].finishStep = true;
      }
    });
  }

  get selectedServiceItem(): ServiceItem {
    return services[this.selectedService];
  }

  selectService(service: any, index: number): void {
    let x = this.mainFormGroup.get('packages') as FormGroup;

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

  selectBranch(branch: any, id: any) {
    this.calendarDays = branch.days;
    this.selectSpecificBranch = id;

    let BranchSelected = this.mainFormGroup.get('BranchSelected') as FormGroup;
    BranchSelected.get('id')?.setValue(branch.id);
    BranchSelected.get('name')?.setValue(branch.nameAr);
  }

  closeDialog(event: any) {
    this.visible = false;
  }
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
}
