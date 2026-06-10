import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentandreservationmanagementComponent } from './appointmentandreservationmanagement.component';

describe('AppointmentandreservationmanagementComponent', () => {
  let component: AppointmentandreservationmanagementComponent;
  let fixture: ComponentFixture<AppointmentandreservationmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentandreservationmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentandreservationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
