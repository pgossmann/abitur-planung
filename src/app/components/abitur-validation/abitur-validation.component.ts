import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbiturPlanungService, ValidationMessage } from '../../services/abitur-planung.service';

@Component({
  selector: 'app-abitur-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abitur-validation.component.html',
  styleUrls: ['./abitur-validation.component.scss']
})
export class AbiturValidationComponent implements OnInit {
  validationMessages: ValidationMessage[] = [];
  
  constructor(private abiturPlanungService: AbiturPlanungService) { }

  ngOnInit(): void {
    this.abiturPlanungService.validationMessages$.subscribe(messages => {
      this.validationMessages = messages;
    });
  }

  hasMessages(): boolean {
    return this.validationMessages.length > 0;
  }

  hasErrors(): boolean {
    return this.validationMessages.some(msg => msg.isError);
  }
}