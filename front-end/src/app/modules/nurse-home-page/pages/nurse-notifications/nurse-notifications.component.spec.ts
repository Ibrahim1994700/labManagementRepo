import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseNotificationsComponent } from './nurse-notifications.component';

describe('NurseNotificationsComponent', () => {
  let component: NurseNotificationsComponent;
  let fixture: ComponentFixture<NurseNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
