import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PackingFormComponent, Item } from './components/packing-form/packing-form';
import { PackingListComponent } from './components/packing-list/packing-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PackingFormComponent, PackingListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  travelItems: Item[] = [];
  private isBrowser: boolean;

  // Iniettiamo il PLATFORM_ID per capire se siamo sul browser o sul server
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Eseguito all'avvio dell'applicazione
  ngOnInit() {
    if (this.isBrowser) {
      const savedItems = localStorage.getItem('travelPackerItems');
      if (savedItems) {
        this.travelItems = JSON.parse(savedItems);
      }
    }
  }

  // Salva lo stato attuale nel localStorage
  private saveToLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('travelPackerItems', JSON.stringify(this.travelItems));
    }
  }

  addItem(newItem: Item) {
    this.travelItems.push(newItem);
    this.saveToLocalStorage(); // <-- Salva dopo l'aggiunta
  }

  toggleItem(id: number) {
    const item = this.travelItems.find(i => i.id === id);
    if (item) {
      item.packed = !item.packed;
      this.saveToLocalStorage(); // <-- Salva dopo la spunta
    }
  }

  removeItem(id: number) {
    this.travelItems = this.travelItems.filter(i => i.id !== id);
    this.saveToLocalStorage(); // <-- Salva dopo l'eliminazione
  }

  get totalItems(): number {
    return this.travelItems.length;
  }

  get packedItems(): number {
    return this.travelItems.filter(item => item.packed).length;
  }

  get progressPercentage(): number {
    if (this.totalItems === 0) return 0;
    return Math.round((this.packedItems / this.totalItems) * 100);
  }
}
