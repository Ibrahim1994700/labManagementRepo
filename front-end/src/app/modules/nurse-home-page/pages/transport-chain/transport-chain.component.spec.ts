import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportChainComponent } from './transport-chain.component';

describe('TransportChainComponent', () => {
  let component: TransportChainComponent;
  let fixture: ComponentFixture<TransportChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportChainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
