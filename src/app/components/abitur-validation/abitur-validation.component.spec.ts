import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiturValidationComponent } from './abitur-validation.component';

describe('AbiturValidationComponent', () => {
  let component: AbiturValidationComponent;
  let fixture: ComponentFixture<AbiturValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbiturValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbiturValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
