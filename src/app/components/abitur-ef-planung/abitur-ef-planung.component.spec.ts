import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiturEfPlanungComponent } from './abitur-ef-planung.component';

describe('AbiturEfPlanungComponent', () => {
  let component: AbiturEfPlanungComponent;
  let fixture: ComponentFixture<AbiturEfPlanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbiturEfPlanungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbiturEfPlanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
