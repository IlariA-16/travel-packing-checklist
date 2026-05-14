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
  currentFilter: 'all' | 'active' | 'packed' = 'all'; // <-- AGGIUNTO per tracciare il filtro attivo
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const savedItems = localStorage.getItem('travelPackerItems');
      if (savedItems) {
        this.travelItems = JSON.parse(savedItems);
      }
    }
  }

  private saveToLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('travelPackerItems', JSON.stringify(this.travelItems));
    }
  }

  // <-- AGGIUNTO per decorare i testi con icone a tema automatiche
  private getAutomaticEmoji(name: string): string {
    const text = name.toLowerCase();
    if (text.includes('scarpe') || text.includes('snakers')) return '👟 ';
    if (text.includes('magliett') || text.includes('t-shirt') || text.includes('camicia')) return '👕 ';
    if (text.includes('pantalon') || text.includes('jeans')) return '👖 ';
    if (text.includes('spazzolin') || text.includes('dentifricio')) return '🪥 ';
    if (text.includes('carica') || text.includes('telefono') || text.includes('cav')) return '🔌 ';
    if (text.includes('passaporto') || text.includes('document')) return '🪪 ';
    if (text.includes('crema') || text.includes('solare') || text.includes('bagnoschiuma')) return '🧴 ';
    if (text.includes('costume')) return '🩱 ';
    if (text.includes('soldi') || text.includes('portafoglio') || text.includes('carta')) return '💳 ';
    return '📦 ';
  }

  addItem(newItem: Item) {
    newItem.name = this.getAutomaticEmoji(newItem.name) + newItem.name; // <-- Applica l'emoji
    this.travelItems.push(newItem);
    this.saveToLocalStorage();
  }

  toggleItem(id: number) {
    const item = this.travelItems.find(i => i.id === id);
    if (item) {
      item.packed = !item.packed;
      this.saveToLocalStorage();
    }
  }

  removeItem(id: number) {
    this.travelItems = this.travelItems.filter(i => i.id !== id);
    this.saveToLocalStorage();
  }

  // <-- AGGIUNTO: Funzione per svuotare l'intera lista
  clearAllItems() {
    if (confirm('Sei sicuro di voler svuotare completamente la valigia?')) {
      this.travelItems = [];
      this.saveToLocalStorage();
    }
  }

  // <-- AGGIUNTO: Calcola dinamicamente gli oggetti filtrati da mostrare
  get filteredItems(): Item[] {
    if (this.currentFilter === 'active') {
      return this.travelItems.filter(item => !item.packed);
    }
    if (this.currentFilter === 'packed') {
      return this.travelItems.filter(item => item.packed);
    }
    return this.travelItems;
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
