import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
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
  @Input() visible: boolean = false;
  @Input() header!: string;
  @Input() listOfInputs: any;
  @Input() formGroup!: FormGroup;
  @Output() isClosed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  get listOfPaitents() {
    return this.formGroup.get('listOfPaitent') as FormArray;
  }

  saveProfile() {
    if (this.listOfPaitents.valid) {
      
      this.listOfPaitents.push(
        new FormGroup({
          name: new FormControl(this.formGroup.get('name')?.value),
          age: new FormControl(this.formGroup.get('age')?.value),
          
        }),
      );
      if (this.listOfPaitents.length == 1) {
        steps[1].finishStep = true;
      } else {
      }
      this.isClosed.emit(false);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onDialogClose() {
    this.isClosed.emit(false);
    this.formGroup.reset();
  }
}
