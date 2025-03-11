import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbiturPlanungService, FachSelection } from '../../services/abitur-planung.service';

@Component({
  selector: 'app-faecher-wahltabelle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faecher-wahltabelle.component.html',
  styleUrls: ['./faecher-wahltabelle.component.scss']
})
export class FaecherWahltabelleComponent implements OnInit {
  fachSelections: FachSelection[] = [];
  totalHours: number = 0;
  
  constructor(private abiturPlanungService: AbiturPlanungService) { }

  ngOnInit(): void {
    this.abiturPlanungService.fachSelections$.subscribe(selections => {
      this.fachSelections = selections;
      this.calculateTotal();
    });
  }

  getAufgabenfeldDisplay(fach: FachSelection): string {
    const aufgabenfeld = this.abiturPlanungService.getAufgabenfeldForFach(fach.fach.name);
    
    switch(aufgabenfeld) {
      case '1':
        return '<span class="aufgabenfeld af1" title="Aufgabenfeld I"></span> I';
      case '1-non':
        return '<span class="aufgabenfeld af1" title="Aufgabenfeld I*"></span> I*';
      case '2':
        return '<span class="aufgabenfeld af2" title="Aufgabenfeld II"></span> II';
      case '3':
        return '<span class="aufgabenfeld af3" title="Aufgabenfeld III"></span> III';
      case 'none':
        return '<span class="aufgabenfeld af-none" title="ohne Aufgabenfeld"></span> -';
      default:
        return '-';
    }
  }

  onChangeValue(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const updatedSelection: FachSelection = { 
      ...fach, 
      value: target.value 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
  }

  onChangeHours(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const hours = parseInt(target.value) || 0;
    const updatedSelection: FachSelection = { 
      ...fach, 
      hours 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
    this.calculateTotal();
  }

  onChangeLK1(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    // Uncheck any other LK1 if this one is checked
    if (isChecked) {
      this.fachSelections.forEach(selection => {
        if (selection.isLK1 && selection.fach.id !== fach.fach.id) {
          const updatedSelection: FachSelection = { 
            ...selection, 
            isLK1: false 
          };
          this.abiturPlanungService.updateFachSelection(updatedSelection);
        }
      });
    }
    
    const updatedSelection: FachSelection = { 
      ...fach, 
      isLK1: isChecked 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
  }

  onChangeLK2(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    // Uncheck any other LK2 if this one is checked
    if (isChecked) {
      this.fachSelections.forEach(selection => {
        if (selection.isLK2 && selection.fach.id !== fach.fach.id) {
          const updatedSelection: FachSelection = { 
            ...selection, 
            isLK2: false 
          };
          this.abiturPlanungService.updateFachSelection(updatedSelection);
        }
      });
    }
    
    const updatedSelection: FachSelection = { 
      ...fach, 
      isLK2: isChecked 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
  }

  onChangeGK1(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const updatedSelection: FachSelection = { 
      ...fach, 
      isGK1: target.checked 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
  }

  onChangeGK2(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const updatedSelection: FachSelection = { 
      ...fach, 
      isGK2: target.checked 
    };
    this.abiturPlanungService.updateFachSelection(updatedSelection);
  }

  calculateTotal(): void {
    this.totalHours = this.abiturPlanungService.calculateTotal();
  }

  isFixedValue(fach: FachSelection): boolean {
    return ['Deutsch', 'Mathematik', 'Sport'].includes(fach.fach.name);
  }
  
  noSelectedSubjects(): boolean {
    const visibleSubjects = this.fachSelections.filter(
      fach => fach.fach.isSelected || this.isFixedValue(fach)
    );
    // Consider showing this message only if there are no subjects beyond the default ones
    return visibleSubjects.length <= 3; // Deutsch, Mathe, Sport only
  }
  
  onToggleSelected(fach: FachSelection, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isSelected = target.checked;
    
    // Do not allow deselection of mandatory subjects
    if (fach.fach.isMandatory && !isSelected) {
      // Reset the checkbox to checked
      setTimeout(() => {
        target.checked = true;
      });
      return;
    }
    
    // Update the Schulfach object's isSelected property
    const updatedFach = {...fach.fach, isSelected};
    fach.fach.isSelected = isSelected;
    this.calculateTotal();
    // Call the service to update the Schulfach
    this.abiturPlanungService.schulfachService.updateFach(updatedFach);
  }
  
  isMandatory(fach: FachSelection): boolean {
    return fach.fach.isMandatory === true;
  }
  
  getRowClass(fach: FachSelection): string {
    // If the subject is not selected, make it gray
    if (!fach.fach.isSelected && !this.isMandatory(fach)) {
      return 'table-secondary';
    }
    
    // Color-code by subject category
    const category = fach.fach.category;
    
    if (category === 'Sprachen') {
      return 'subject-languages';
    } else if (category === 'Mathematik') {
      return 'subject-math';
    } else if (category === 'Naturwissenschaften') {
      return 'subject-science';
    } else if (category === 'Gesellschaftswissenschaften') {
      return 'subject-social';
    } else if (category.includes('Religion') || category.includes('Ethik')) {
      return 'subject-religion';
    } else if (category.includes('Kunst') || category.includes('Musik')) {
      return 'subject-arts';
    } else if (category === 'Sport') {
      return 'subject-sport';
    }
    
    return '';
  }
}