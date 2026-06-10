import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsandPaymentsComponent } from './billsand-payments.component';

describe('BillsandPaymentsComponent', () => {
  let component: BillsandPaymentsComponent;
  let fixture: ComponentFixture<BillsandPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsandPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillsandPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
