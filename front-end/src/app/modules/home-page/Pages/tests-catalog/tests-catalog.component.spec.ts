import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCatalogComponent } from './tests-catalog.component';

describe('TestsCatalogComponent', () => {
  let component: TestsCatalogComponent;
  let fixture: ComponentFixture<TestsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestsCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
