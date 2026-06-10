import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesDeliveryComponent } from './samples-delivery.component';

describe('SamplesDeliveryComponent', () => {
  let component: SamplesDeliveryComponent;
  let fixture: ComponentFixture<SamplesDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplesDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SamplesDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
