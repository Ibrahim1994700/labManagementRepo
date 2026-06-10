import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReceptionComponent } from './patient-reception.component';

describe('PatientReceptionComponent', () => {
  let component: PatientReceptionComponent;
  let fixture: ComponentFixture<PatientReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReceptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
