import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaecherWahltabelleComponent } from './faecher-wahltabelle.component';

describe('FaecherWahltabelleComponent', () => {
  let component: FaecherWahltabelleComponent;
  let fixture: ComponentFixture<FaecherWahltabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaecherWahltabelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaecherWahltabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
