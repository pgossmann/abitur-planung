import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaecherUebersichtComponent } from './faecher-uebersicht.component';

describe('FaecherUebersichtComponent', () => {
  let component: FaecherUebersichtComponent;
  let fixture: ComponentFixture<FaecherUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaecherUebersichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaecherUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
