import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SchulfachService } from './schulfach.service';
import { Schulfach } from '../models/schulfach.model';

export interface FachSelection {
  fach: Schulfach;
  value: string;
  hours: number;
  isLK1: boolean;
  isLK2: boolean;
  isGK1: boolean;
  isGK2: boolean;
}

export interface ValidationMessage {
  message: string;
  isError: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AbiturPlanungService {


  private fachSelectionsSubject = new BehaviorSubject<FachSelection[]>([]);
  fachSelections$ = this.fachSelectionsSubject.asObservable();

  private statusMessageSubject = new BehaviorSubject<string>('');
  statusMessage$ = this.statusMessageSubject.asObservable();

  private validationMessagesSubject = new BehaviorSubject<ValidationMessage[]>([]);
  validationMessages$ = this.validationMessagesSubject.asObservable();

  private isStatusSuccessSubject = new BehaviorSubject<boolean>(true);
  isStatusSuccess$ = this.isStatusSuccessSubject.asObservable();

  constructor(public schulfachService: SchulfachService) {
    this.initializeFachSelections();
  }

  private initializeFachSelections(): void {
    this.schulfachService.getAllFaecher().subscribe(faecher => {
      // Filter to include only available subjects
      const availableFaecher = faecher.filter(fach => fach.isAvailable);

      const selections: FachSelection[] = availableFaecher.map(fach => {
        // Use hoursEF as the default hours
        let defaultHours = fach.hoursEF || 3;
        let defaultValue = '';

        if (fach.name === 'Deutsch') {
          defaultValue = 'DEUTSCH';
        } else if (fach.name === 'Mathematik') {
          defaultValue = 'MATHE';
        } else if (fach.name === 'Sport') {
          defaultValue = 'SPORT';
        }

        return {
          fach,
          value: defaultValue,
          hours: defaultHours,
          isLK1: false,
          isLK2: false,
          isGK1: false,
          isGK2: false
        };
      });

      this.fachSelectionsSubject.next(selections);
    });
  }

  updateFachSelection(updatedSelection: FachSelection): void {
    const currentSelections = this.fachSelectionsSubject.value;
    const updatedSelections = currentSelections.map(selection =>
      selection.fach.id === updatedSelection.fach.id ? updatedSelection : selection
    );

    this.fachSelectionsSubject.next(updatedSelections);
  }

  getAufgabenfeldForFach(fachName: string): string {
    // Map subjects to their Aufgabenfeld
    if (['Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Latein'].some(f => fachName.includes(f))) {
      return '1';
    } else if (['Kunst', 'Musik'].some(f => fachName.includes(f))) {
      return '1-non';
    } else if (['Erdkunde', 'Sozialwissenschaften', 'Pädagogik', 'Philosophie', 'Geschichte', 'Religion'].some(f => fachName.includes(f))) {
      return '2';
    } else if (['Mathematik', 'Biologie', 'Physik', 'Chemie', 'Informatik'].some(f => fachName.includes(f))) {
      return '3';
    }
    return 'none';
  }

  getTotalHours(): number {
    return this.fachSelectionsSubject.value.reduce((total, selection) =>
      selection.fach.isSelected ? total + selection.hours : total, 0);
  }
  calculateTotal(): number {
    const total = this.getTotalHours();
    return total;
  }

  validateAbiturChoices(): ValidationMessage[] {
    const warnings: ValidationMessage[] = [];
    const selections = this.fachSelectionsSubject.value;

    // Get selected Abitur subjects
    const selectedLK1 = selections.filter(s => s.isLK1);
    const selectedLK2 = selections.filter(s => s.isLK2);
    const selectedGK1 = selections.filter(s => s.isGK1);
    const selectedGK2 = selections.filter(s => s.isGK2);

    // Combine all selected subjects
    const selectedAbiSubjects = [
      ...selectedLK1,
      ...selectedLK2,
      ...selectedGK1,
      ...selectedGK2
    ];

    // Check if exactly 4 subjects are selected
    if (selectedAbiSubjects.length !== 4) {
      warnings.push({
        message: `Es müssen genau 4 Abiturfächer gewählt werden. Aktuell: ${selectedAbiSubjects.length}`,
        isError: true
      });
    }

    // Check if LK1 and LK2 are selected
    if (selectedLK1.length === 0) {
      warnings.push({
        message: "LK1 muss ausgewählt werden.",
        isError: true
      });
    }

    if (selectedLK2.length === 0) {
      warnings.push({
        message: "LK2 muss ausgewählt werden.",
        isError: true
      });
    }

    // Check if a valid LK is selected (D, M, fFS, NW)
    const isValidLK1 = selectedLK1.some(s =>
      s.fach.name === 'Deutsch' ||
      s.fach.name === 'Mathematik' ||
      s.fach.name.includes('Englisch') ||
      s.fach.name.includes('Französisch') ||
      s.fach.name.includes('Spanisch') ||
      s.fach.name.includes('Latein') ||
      s.fach.name.includes('Biologie') ||
      s.fach.name.includes('Physik') ||
      s.fach.name.includes('Chemie')
    );

    const isValidLK2 = selectedLK2.some(s =>
      s.fach.name === 'Deutsch' ||
      s.fach.name === 'Mathematik' ||
      s.fach.name.includes('Englisch') ||
      s.fach.name.includes('Französisch') ||
      s.fach.name.includes('Spanisch') ||
      s.fach.name.includes('Latein') ||
      s.fach.name.includes('Biologie') ||
      s.fach.name.includes('Physik') ||
      s.fach.name.includes('Chemie')
    );

    if (!isValidLK1 && !isValidLK2) {
      warnings.push({
        message: "Mindestens ein LK muss D, M, Fremdsprache oder Naturwissenschaft sein.",
        isError: true
      });
    }

    // Check if at least two of the subjects are from D, M, FS
    const kernfachCount = selectedAbiSubjects.filter(s =>
      s.fach.name === 'Deutsch' ||
      s.fach.name === 'Mathematik' ||
      s.fach.name.includes('Englisch') ||
      s.fach.name.includes('Französisch') ||
      s.fach.name.includes('Spanisch') ||
      s.fach.name.includes('Latein')
    ).length;

    if (kernfachCount < 2) {
      warnings.push({
        message: "Unter den Abiturfächern müssen mindestens zwei der Fächer D, M, FS sein.",
        isError: true
      });
    }

    // Check if all three Aufgabenfelder are covered
    const subjectsWithAF = selectedAbiSubjects.map(s => {
      return {
        ...s,
        aufgabenfeld: this.getAufgabenfeldForFach(s.fach.name)
      };
    });

    const af1Valid = subjectsWithAF.some(s => s.aufgabenfeld === '1');
    const af2Valid = subjectsWithAF.some(s => s.aufgabenfeld === '2');
    const af3Valid = subjectsWithAF.some(s => s.aufgabenfeld === '3');

    if (!(af1Valid && af2Valid && af3Valid)) {
      warnings.push({
        message: "Die 3 Aufgabenfelder müssen durch die Abiturfächer abgedeckt werden. Beachte: Kunst und Musik (AF I*) decken das Aufgabenfeld I nicht ab!",
        isError: true
      });
    }

    // Update validation messages
    this.validationMessagesSubject.next(warnings);

    // If no warnings, add success message
    if (warnings.length === 0) {
      this.validationMessagesSubject.next([{
        message: "Glückwunsch! Deine Abiturfächer erfüllen alle Anforderungen.",
        isError: false
      }]);
    }

    return warnings;
  }

  resetForm(): void {
    this.schulfachService.reset().subscribe(faecher => {
      this.initializeFachSelections();
      this.validationMessagesSubject.next([]);
      this.showStatus('Alle Einträge wurden zurückgesetzt.', true);
    });
  }

  printForm(): void {
    window.print();
  }

  showStatus(message: string, isSuccess: boolean = true): void {
    this.statusMessageSubject.next(message);
    this.isStatusSuccessSubject.next(isSuccess);

    // Auto-hide the message after 3 seconds
    setTimeout(() => {
      this.statusMessageSubject.next('');
    }, 3000);
  }
}