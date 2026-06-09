import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccountComponent } from './family-account.component';

describe('FamilyAccountComponent', () => {
  let component: FamilyAccountComponent;
  let fixture: ComponentFixture<FamilyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
