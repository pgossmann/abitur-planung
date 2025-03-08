import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Schulfach } from '../../models/schulfach.model';
import { SchulfachService } from '../../services/schulfach.service';

@Component({
  selector: 'app-faecher-uebersicht',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faecher-uebersicht.component.html',
  styleUrls: ['./faecher-uebersicht.component.scss']
})
export class FaecherUebersichtComponent implements OnInit {
  faecher: Schulfach[] = [];
  filteredFaecher: Schulfach[] = [];
  availableFaecherCount = 0;
  unwantedFaecherCount = 0;
  categories: string[] = [];
  selectedCategory: string = '';
  filterText: string = '';

  constructor(private schulfachService: SchulfachService) { }

  ngOnInit(): void {
    this.categories = this.schulfachService.getCategories();
    this.loadFaecher();
  }

  loadFaecher(): void {
    this.schulfachService.getAllFaecher().subscribe(faecher => {
      this.faecher = faecher;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.faecher];

    // Filter by category if selected
    if (this.selectedCategory) {
      result = result.filter(fach => fach.category === this.selectedCategory);
    }

    // Filter by text if provided
    if (this.filterText) {
      const filterTextLower = this.filterText.toLowerCase();
      result = result.filter(fach =>
        fach.name.toLowerCase().includes(filterTextLower)
      );
    }

    this.filteredFaecher = result;

    // Calculate counts
    this.availableFaecherCount = result.filter(f => f.isAvailable).length;
    this.unwantedFaecherCount = result.filter(f => f.isUnwanted).length;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onFilterTextChange(text: string): void {
    this.filterText = text;
    this.applyFilters();
  }

  toggleAvailability(fach: Schulfach): void {
    const updatedFach = { ...fach, isAvailable: !fach.isAvailable };
    this.schulfachService.updateFach(updatedFach);
    // Recalculate counts
    this.applyFilters();
  }

  toggleUnwanted(fach: Schulfach): void {
    const updatedFach = { ...fach, isUnwanted: !fach.isUnwanted };
    this.schulfachService.updateFach(updatedFach);
    // Recalculate counts
    this.applyFilters();
  }

  getRowClass(fach: Schulfach): string {
    if (!fach.isAvailable) return 'table-secondary';
    if (fach.isUnwanted) return 'table-danger';
    return '';
  }
}