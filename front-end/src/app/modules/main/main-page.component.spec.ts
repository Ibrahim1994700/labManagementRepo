import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page/main-page.component';
import { beforeEach, describe } from 'node:test';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function expect(component: MainPageComponent) {
  throw new Error('Function not implemented.');
}

