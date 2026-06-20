import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { steps } from '../../../modules/home-page/Pages/home-withdrawal/models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-shared-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './shared-dialog.component.html',
  styleUrl: './shared-dialog.component.css',
})
export class SharedDialogComponent implements OnInit {
  x: any;
  ngOnInit(): void {
    this.x = this.formGroup;
  }
  @Input() visible: boolean = false;

  @Input() listOfPaitent: any;
  @Input() header!: string;
  @Input() listOfInputs: any;
  @Input() formGroup: any;
  @Output() isClosed = new EventEmitter<boolean>();
  get listOfPaitents() {
    return this.x.get('listOfPaitent') as FormArray;
  }

  saveProfile() {
    this.listOfPaitents.push(
      new FormGroup({
        name: new FormControl(this.formGroup.get('name')?.value, [
          Validators.required,
        ]),
        age: new FormControl(this.formGroup.get('age')?.value, [
          Validators.required,
        ]),
      }),
    );
    if (this.listOfPaitents.length == 1) {
      steps[0].finishStep = true;
    } else {
    }
    this.isClosed.emit(false)
  }
}
