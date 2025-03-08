import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Schulfach, SchulfachCategory } from '../models/schulfach.model';

@Injectable({
  providedIn: 'root'
})
export class SchulfachService {
  private faecherSubject = new BehaviorSubject<Schulfach[]>([]);
  faecher$ = this.faecherSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<{ schulfaecher: Schulfach[] }>('assets/data/faecher.json')
      .pipe(
        map(response => response.schulfaecher)
      )
      .subscribe(faecher => {
        this.faecherSubject.next(faecher);
      });
  }

  getAllFaecher(): Observable<Schulfach[]> {
    return this.faecher$;
  }

  getFaecherByCategory(category: string): Observable<Schulfach[]> {
    return this.faecher$.pipe(
      map(faecher => faecher.filter(fach => fach.category === category))
    );
  }

  updateFach(updatedFach: Schulfach): void {
    this.faecher$.pipe(
      take(1)
    ).subscribe(currentFaecher => {
      const updatedFaecher = currentFaecher.map(fach => 
        fach.id === updatedFach.id ? updatedFach : fach
      );
      this.faecherSubject.next(updatedFaecher);
    });
  }

  getCategories(): string[] {
    return Object.values(SchulfachCategory);
  }
}