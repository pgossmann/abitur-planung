import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent {
  // Information fields for Aufgabenfelder
  aufgabenfelder = [
    { class: 'field-1', name: 'Aufgabenfeld I: sprachlich-literarisch-künstlerisch' },
    { class: 'field-2', name: 'Aufgabenfeld II: gesellschaftswissenschaftlich' },
    { class: 'field-3', name: 'Aufgabenfeld III: mathematisch-naturwissenschaftlich' },
    { class: 'field-none', name: 'ohne Aufgabenfeld' }
  ];

  // Information points for students
  infoPoints = [
    'Keine Neuzuwahl von möglichen Abiturfächern nach 11/EF möglich',
    'Ein LK muss sein: D, M, fFS, reine NW',
    'Die 4 Abiturfächer müssen die 3 Aufgabenfelder abdecken (MU und KU decken das AF 1 nicht ab)',
    'Unter den Abiturfächern sind zwei der Fächer D, M, FS'
  ];
}