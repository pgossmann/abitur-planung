import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbiturPlanungService } from '../../services/abitur-planung.service';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {
  statusMessage: string = '';
  isStatusSuccess: boolean = true;
  
  constructor(private abiturPlanungService: AbiturPlanungService) { }

  ngOnInit(): void {
    this.abiturPlanungService.statusMessage$.subscribe(message => {
      this.statusMessage = message;
    });
    
    this.abiturPlanungService.isStatusSuccess$.subscribe(isSuccess => {
      this.isStatusSuccess = isSuccess;
    });
  }

  onSave(): void {
    this.abiturPlanungService.saveData();
  }

  onLoad(): void {
    this.abiturPlanungService.loadSavedData();
  }

  onReset(): void {
    if (confirm('Möchten Sie wirklich alle Einträge zurücksetzen?')) {
      this.abiturPlanungService.resetForm();
    }
  }

  onPrint(): void {
    this.abiturPlanungService.printForm();
  }

  onValidate(): void {
    this.abiturPlanungService.validateAbiturChoices();
  }
}