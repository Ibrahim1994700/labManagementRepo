import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisrequestsComponent } from './analysisrequests.component';

describe('AnalysisrequestsComponent', () => {
  let component: AnalysisrequestsComponent;
  let fixture: ComponentFixture<AnalysisrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisrequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysisrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
