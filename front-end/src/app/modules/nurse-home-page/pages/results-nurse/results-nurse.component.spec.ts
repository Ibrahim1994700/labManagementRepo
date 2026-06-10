import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNurseComponent } from './results-nurse.component';

describe('ResultsNurseComponent', () => {
  let component: ResultsNurseComponent;
  let fixture: ComponentFixture<ResultsNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsNurseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
