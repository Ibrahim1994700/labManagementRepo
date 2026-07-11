import { CommonModule, WeekDay } from '@angular/common';
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

import { listOfInputs, steps } from './models';
import { MapComponent } from '../../../../shared/Components/map/map.component';
import { SharedDialogComponent } from '../../../../shared/Components/shared-dialog/shared-dialog.component';
import { HomeWithDrwalService } from './home-with-drwal.service';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';

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
  times: any;
  selectedTab: string = 'packages';
  calendarDays: any;
  visible: boolean = false;
  selectedService: boolean = true;
  selectSpecificBranch: any;
  selectedDay!: number | any;
  selectedTime!: number | any;
  selectedPayment: any;
  mainFormGroup!: FormGroup;
  listOfInputs = listOfInputs;
  AllBranches!: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('patientScrollContainer') patientScrollContainer!: ElementRef;
  @ViewChild('serviceScrollContainer') serviceScrollContainer!: ElementRef;
  branchId = new Subject<string>();
  branchDetails!: any;
  selectedServices: any;
  detailPanelOpen: boolean = false;
  selectedDetailService: any = null;
  showDetailsIcon!: boolean;
  ArrayOfWeek: any = [];

  get listOfPaitent() {
    return this.mainFormGroup.get('listOfPaitent') as FormArray;
  }
  get listOfPackages() {
    return this.mainFormGroup.get('listOfPackages') as FormArray;
  }

  get listOfTests() {
    return this.mainFormGroup.get('listOfTests') as FormArray;
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
    this.calculateForuthStep();

    this.getAllBranches();
    this.observeMainForm();
    this.GetBranchDetails();
    this.calculateWeekInfo();
  }

  GetBranchDetails() {
    this.branchId
      .pipe(switchMap((branchId) => this.service.GetBrancheDetails(branchId)))
      .subscribe({
        next: (res) => {
          if (res) {
            this.selectedDay = null;
            this.selectedTime = null;
            this.listOfPackages.clear();
            this.listOfTests.clear();
            this.mainFormGroup.get('dateOfBooking')?.reset();
            this.branchDetails = res;
            this.times = [];
            this.branchDetails.packages = this.branchDetails.packages.map(
              (item: any) => ({
                ...item,
                Selected: false,
                showDetailsIcon: false,
                icon: item.icon || 'bi-vial',
                tone: item.tone || 'default',
                type: 'package',
              }),
            );
            this.branchDetails.tests = this.branchDetails.tests.map(
              (item: any) => ({
                ...item,
                Selected: false,
                showDetailsIcon: false,
                icon: item.icon || 'bi-vial',
                tone: item.tone || 'default',
                type: 'test',
              }),
            );
            this.selectedTab == 'packages'
              ? (this.selectedServices = this.branchDetails.packages)
              : (this.selectedServices = this.branchDetails.tests);
            this.calendarDays = this.branchDetails.days;
          }
        },
      });
  }

  observeMainForm() {
    this.mainFormGroup
      .get('listOfPaitents')
      ?.valueChanges.subscribe((res) => {});
  }

  calculateForuthStep() {
    this.mainFormGroup
      .get('dateOfBooking')
      ?.valueChanges.subscribe((res: any) => {
        if (
          res.dayName &&
          res.monthName &&
          res.FromTime &&
          res.fromTimePeriod &&
          res.ToTime &&
          res.toTimePeriod
        ) {
          steps[3].finishStep = true;
        } else {
          steps[3].finishStep = false;
        }
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

      name: new FormControl(null),
      age: new FormControl(null),
      listOfPaitent: new FormArray([], [Validators.required]),
      listOfPackages: new FormArray([], [Validators.required]),
      listOfTests: new FormArray([], [Validators.required]),
      dateOfBooking: new FormGroup({
        dayName: new FormControl(null, [Validators.required]),
        monthName: new FormControl(null, [Validators.required]),
        FromTime: new FormControl(null, [Validators.required]),
        fromTimePeriod: new FormControl(null, [Validators.required]),
        ToTime: new FormControl(null, [Validators.required]),
        toTimePeriod: new FormControl(null, [Validators.required]),
      }),
      location: new FormGroup(
        {
          lat: new FormControl(null, [Validators.required]),
          lng: new FormControl(null, [Validators.required]),
          placeName: new FormControl(null, [Validators.required]),
          fullAddress: new FormControl(null, [Validators.required]),
        },
        [Validators.required],
      ),
      paymentMethod: new FormControl(null, [Validators.required]),
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
      if (this.listOfPackages.length != 0 || this.listOfTests.length != 0) {
        steps[2].finishStep = true;
      } else {
        steps[2].finishStep = false;
        this.selectedDay = null;
        this.selectedTime = null;
        this.times = [];
        //   this.mainFormGroup.get('dateOfBooking')?.reset();
      }
    });
  }

  locationSelected(event: any) {
    const locationGroup = this.mainFormGroup?.get('location') as FormGroup;
    locationGroup.get('lat')?.setValue(event.lat);
    locationGroup.get('lng')?.setValue(event.lng);
    locationGroup.get('placeName')?.setValue(event.placeName);
    locationGroup.get('fullAddress')?.setValue(event.fullAddress);
    this.steps[4].finishStep = true;
  }

  selectService(service: any): void {
    service.Selected = !service.Selected;

    if (service.type === 'package') {
      const formArray = this.listOfPackages;

      if (service.Selected) {
        formArray.push(
          new FormGroup({
            id: new FormControl(service.id),
            name: new FormControl(service.nameAr),
          }),
        );
      } else {
        const index = formArray.controls.findIndex(
          (x) => x.value.id === service.id,
        );

        if (index !== -1) {
          formArray.removeAt(index);
        }
      }
    }

    if (service.type === 'test') {
      const formArray = this.listOfTests;
      if (service.Selected) {
        formArray.push(
          new FormGroup({
            id: new FormControl(service.id),
            name: new FormControl(service.nameAr),
          }),
        );
      } else {
        const index = formArray.controls.findIndex(
          (x) => x.value.id === service.id,
        );

        if (index !== -1) {
          formArray.removeAt(index);
        }
      }
    }
  }

  selectDay(index: number, date: any): void {
    const Date = this.mainFormGroup.get('dateOfBooking') as FormGroup;
    Date.get('dayName')?.setValue(date?.dayNameAr);
    Date.get('monthName')?.setValue(date.monthNameAr);
    this.selectedDay = index;
    this.times = this.calendarDays.find(
      (x: { dayName: any }) => x?.dayName == date?.dayNameEn,
    ).times;
  }

  selectTime(index: number, time: any): void {
    this.selectedTime = index;
    this.mainFormGroup
      .get('dateOfBooking')
      ?.get('FromTime')
      ?.setValue(time.fromTime);
    this.mainFormGroup
      .get('dateOfBooking')
      ?.get('fromTimePeriod')
      ?.setValue(time.fromTimePeriod);
    this.mainFormGroup
      .get('dateOfBooking')
      ?.get('ToTime')
      ?.setValue(time.toTime);
    this.mainFormGroup
      .get('dateOfBooking')
      ?.get('toTimePeriod')
      ?.setValue(time.toTimePeriod);
  }

  selectPayment(paymentMethod: string, index: number): void {
    this.selectedPayment = index;
    this.mainFormGroup.get('paymentMethod')?.setValue(paymentMethod);
    this.steps[5].finishStep = true;
  }

  selectBranch(branch: any, id: any) {
    this.selectSpecificBranch = id;

    let BranchSelected = this.mainFormGroup.get('BranchSelected') as FormGroup;
    BranchSelected.get('id')?.setValue(branch.id);
    BranchSelected.get('name')?.setValue(branch.nameAr);
    this.branchId.next(branch.id);
  }

  closeDialog(event: any) {
    this.visible = false;
  }
  selectTab(tab: string) {
    if (tab === 'packages') {
      this.selectedServices = this.branchDetails.packages;
      this.selectedTab = tab;
    }
    if (tab === 'tests') {
      this.selectedServices = this.branchDetails.tests;
      this.selectedTab = tab;
    }
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

  scrollPatientLeft() {
    this.patientScrollContainer.nativeElement.scrollBy({
      left: -260,
      behavior: 'smooth',
    });
  }

  scrollPatientRight() {
    this.patientScrollContainer.nativeElement.scrollBy({
      left: 260,
      behavior: 'smooth',
    });
  }

  scrollServiceLeft() {
    this.serviceScrollContainer.nativeElement.scrollBy({
      left: -280,
      behavior: 'smooth',
    });
  }

  scrollServiceRight() {
    this.serviceScrollContainer.nativeElement.scrollBy({
      left: 280,
      behavior: 'smooth',
    });
  }

  showDetails(service: any) {
    service.showDetailsIcon = true;
  }

  hideDetailsIcon(service: any) {
    service.showDetailsIcon = false;
  }

  openServiceDetails(service: any): void {
    this.selectedDetailService = service;
    this.detailPanelOpen = true;
  }

  closeServiceDetails(): void {
    this.detailPanelOpen = false;
    this.selectedDetailService = null;
  }

  objectEntries(obj: any): [string, any][] {
    if (!obj) return [];
    try {
      return Object.entries(obj);
    } catch {
      return [];
    }
  }

  calculateWeekInfo() {
    for (let i = 0; i <= 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      this.ArrayOfWeek.push({
        dayNameAr: date.toLocaleDateString('ar-EG', { weekday: 'long' }),
        dayNameEn: date.toLocaleDateString('en-US', { weekday: 'long' }),
        dayNumber: date.getDate(),
        monthNameAr: date.toLocaleDateString('ar-EG', { month: 'long' }),
        monthNumber: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  }

  isDayExist(dayName: string, index: number) {
    if (this.branchDetails) {
      const x: any[] = this.calendarDays.map((x: { dayName: string }) =>
        x?.dayName?.toLowerCase(),
      );
      if (x.includes(dayName?.toLowerCase())) {
        return 'متاح';
      } else {
        return 'متاح غير';
      }
    }
    return null;
  }

  ConverTime(time: any) {
    return `${time.toTime} ${time.fromTimePeriod} - ${time.fromTime} ${time.toTimePeriod} `;
  }

  submitBooking() {
    const listOfPackages = this.listOfPackages;
    const listOfTests = this.listOfTests;

    if (listOfPackages.length == 0 && listOfTests.length > 0) {
      listOfPackages?.clearValidators();
      listOfPackages?.updateValueAndValidity();
    } else if (listOfPackages.length > 0 && listOfTests.length == 0) {
      listOfTests?.clearValidators();
      listOfTests?.updateValueAndValidity();
    }

    const finishedSteps = steps.map((step) => step.finishStep);
    if (
      this.mainFormGroup.valid &&
      finishedSteps.every((step) => step === true)
    ) {
      alert('Booking submitted successfully!');
    }

    console.log(this.mainFormGroup.value);
    console.log(this.mainFormGroup.get('listOfTests'));

    console.log(finishedSteps);
  }
}
