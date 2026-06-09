import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNursePageComponent } from './main-nurse-page.component';

describe('MainNursePageComponent', () => {
  let component: MainNursePageComponent;
  let fixture: ComponentFixture<MainNursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNursePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainNursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
