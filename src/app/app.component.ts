import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaecherUebersichtComponent } from './components/faecher-uebersicht/faecher-uebersicht.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FaecherUebersichtComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Abitur - Oberstufenplanung';
}