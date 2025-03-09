import { Routes } from '@angular/router';
import { FaecherUebersichtComponent } from './components/faecher-uebersicht/faecher-uebersicht.component';
import { AbiturEfPlanungComponent } from './components/abitur-ef-planung/abitur-ef-planung.component';

export const routes: Routes = [
  { path: '', component: FaecherUebersichtComponent },
  { path: 'ef-planung', component: AbiturEfPlanungComponent },
  { path: '**', redirectTo: '' }
];