import { Injectable, signal, computed } from '@angular/core';

export interface PackingItem {
  id: number;
  name: string;
  packed: boolean;
}

@Injectable({ providedIn: 'root' })
export class PackingService {
  items = signal<PackingItem[]>([]);

  totalCount = computed(() => this.items().length);
  packedCount = computed(() => this.items().filter(i => i.packed).length);
  progressPercentage = computed(() => {
    return this.totalCount() === 0 ? 0 : Math.round((this.packedCount() / this.totalCount()) * 100);
  });

  private database: Record<string, string[]> = {
    mare: ['Costume', 'Crema solare', 'Telo mare'],
    montagna: ['Scarponi', 'Giacca a vento', 'Borraccia'],
    citta: ['Scarpe comode', 'Powerbank', 'Ombrello']
  };

  generateList(destination: string, days: number) {
    const base = ['Spazzolino', 'Documenti'];
    const specific = this.database[destination] || [];
    const clothing = [`${days}x Intimo`, `${days}x Magliette`];

    const fullList = [...base, ...specific, ...clothing].map((name, index) => ({
      id: index,
      name,
      packed: false
    }));

    this.items.set(fullList);
  }

  toggleItem(id: number) {
    this.items.update(curr => curr.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  }
}
