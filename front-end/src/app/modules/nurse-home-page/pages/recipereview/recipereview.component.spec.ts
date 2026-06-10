import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipereviewComponent } from './recipereview.component';

describe('RecipereviewComponent', () => {
  let component: RecipereviewComponent;
  let fixture: ComponentFixture<RecipereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipereviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
