import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaecherWahltabelleComponent } from '../faecher-wahltabelle/faecher-wahltabelle.component';
import { AbiturValidationComponent } from '../abitur-validation/abitur-validation.component';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { AbiturPlanungService } from '../../services/abitur-planung.service';

@Component({
  selector: 'app-abitur-ef-planung',
  standalone: true,
  imports: [
    CommonModule,
    FaecherWahltabelleComponent,
    AbiturValidationComponent,
    InfoBoxComponent,
    ActionButtonsComponent
  ],
  templateUrl: './abitur-ef-planung.component.html',
  styleUrls: ['./abitur-ef-planung.component.scss']
})
export class AbiturEfPlanungComponent implements OnInit {
  title = 'Abitur - Planung 11. Klasse (EF)';

  constructor() { }

  ngOnInit(): void {
  }
}