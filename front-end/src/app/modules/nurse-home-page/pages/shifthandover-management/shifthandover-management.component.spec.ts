import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShifthandoverManagementComponent } from './shifthandover-management.component';

describe('ShifthandoverManagementComponent', () => {
  let component: ShifthandoverManagementComponent;
  let fixture: ComponentFixture<ShifthandoverManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShifthandoverManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShifthandoverManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
