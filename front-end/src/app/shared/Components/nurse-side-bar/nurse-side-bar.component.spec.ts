import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSideBarComponent } from './nurse-side-bar.component';

describe('NurseSideBarComponent', () => {
  let component: NurseSideBarComponent;
  let fixture: ComponentFixture<NurseSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
