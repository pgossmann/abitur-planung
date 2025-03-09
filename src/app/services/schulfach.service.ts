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
        // Always load from JSON file first to ensure we have the latest availability data
        this.loadInitialData();
    }
    private loadInitialData(): void {
        this.http.get<{ schulfaecher: Schulfach[] }>('assets/data/faecher.json')
            .pipe(
                map(response => response.schulfaecher)
            )
            .subscribe(faecher => {
                // If we have data in localStorage, merge the availability status from JSON
                // with the selection status from localStorage
                const savedData = localStorage.getItem('schulfaecher');
                if (savedData) {
                    try {
                        const savedFaecher = JSON.parse(savedData) as Schulfach[];

                        // Merge data - keep availability from JSON, but selection status from localStorage
                        const mergedFaecher = faecher.map(jsonFach => {
                            const savedFach = savedFaecher.find(f => f.id === jsonFach.id);
                            if (savedFach) {
                                return {
                                    ...jsonFach,
                                    isSelected: savedFach.isSelected
                                };
                            }
                            return jsonFach;
                        });

                        this.faecherSubject.next(mergedFaecher);
                        // Save the merged data back to localStorage
                        localStorage.setItem('schulfaecher', JSON.stringify(mergedFaecher));
                    } catch (e) {
                        console.error('Error merging localStorage data:', e);
                        this.faecherSubject.next(faecher);
                    }
                } else {
                    this.faecherSubject.next(faecher);
                }
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

    updateFach(updatedFach: Schulfach): Observable<Schulfach[]> {
        // Update the fach in our subject
        return this.getAllFaecher().pipe(
            map(faecher => {
                const index = faecher.findIndex(fach => fach.id === updatedFach.id);
                if (index !== -1) {
                    faecher[index] = updatedFach;
                    // Update the subject
                    this.faecherSubject.next([...faecher]);
                    // Save to localStorage
                    localStorage.setItem('schulfaecher', JSON.stringify(faecher));
                }
                return faecher;
            })
        );
    }

    getCategories(): string[] {
        return Object.values(SchulfachCategory);
    }
}