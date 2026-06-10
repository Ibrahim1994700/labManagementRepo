import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenursinghomewithdrawalComponent } from './homenursinghomewithdrawal.component';

describe('HomenursinghomewithdrawalComponent', () => {
  let component: HomenursinghomewithdrawalComponent;
  let fixture: ComponentFixture<HomenursinghomewithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomenursinghomewithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomenursinghomewithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
