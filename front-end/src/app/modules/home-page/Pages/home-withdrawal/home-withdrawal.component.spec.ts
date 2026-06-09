import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWithdrawalComponent } from './home-withdrawal.component';

describe('HomeWithdrawalComponent', () => {
  let component: HomeWithdrawalComponent;
  let fixture: ComponentFixture<HomeWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
