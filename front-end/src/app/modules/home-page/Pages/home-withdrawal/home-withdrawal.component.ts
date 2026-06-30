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

import { listOfInputs, steps} from './models';
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
  times :any
  selectedTab: string = 'packages';
  calendarDays: any;
  visible: boolean = false;
  selectedService: boolean = true;
  selectSpecificBranch: any;
  selectedDay!: number | any;
  selectedTime = 1;
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
    this.getAllBranches();
    this.observeMainForm();
    this.GetBranchDetails();
    this.calculateWeekInfo();
  }

  GetBranchDetails() {
    this.selectedDay = null;
    this.branchId
      .pipe(switchMap((branchId) => this.service.GetBrancheDetails(branchId)))
      .subscribe({
        next: (res) => {
          if (res) {
            this.branchDetails = res;

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
      listOfPaitent: new FormArray([], [Validators.required]),
      listOfPackages: new FormArray([], [Validators.required]),
      listOfTests: new FormArray([], [Validators.required]),
      dateOfBooking: new FormGroup({
        dayName: new FormControl(null, [Validators.required]),
        monthName: new FormControl(null, [Validators.required]),
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
      const listOfPackages = res?.listOfPackages;
      const listOfTests = res?.listOfTests;

      if (listOfPackages.length != 0 || listOfTests.length != 0) {
        steps[2].finishStep = true;
      } else {
        steps[2].finishStep = false;
      }
    });
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
    Date.get('dayName')?.setValue(date.dayNameAr);
    Date.get('monthName')?.setValue(date.monthNameAr);
    this.selectedDay = index;
    
    this.times=this.calendarDays.find((x: { dayName: any; })=>x.dayName==date.dayNameEn).times
  }

  selectTime(index: number): void {
    this.selectedTime = index;
  }

  selectPayment(index: number): void {
    this.selectedPayment = index;
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
        x.dayName.toLowerCase(),
      );
      if (x.includes(dayName.toLowerCase())) {
        return 'متاح';
      } else {
        return 'متاح غير';
      }
    }
    return null;
  }

  ConverTime(time:any){
    debugger
    return `${time.toTime} ${time.fromTimePeriod} - ${time.fromTime} ${time.toTimePeriod} `
  }
}
