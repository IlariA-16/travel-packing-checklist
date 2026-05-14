import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Struttura dati identica a quella del form
export interface Item {
  id: number;
  name: string;
  quantity: number;
  packed: boolean;
}

@Component({
  selector: 'app-packing-list',
  standalone: true,
  imports: [CommonModule], // Permette di usare le direttive strutturali come ngFor e ngClass
  templateUrl: './packing-list.html',
  styleUrls: ['./packing-list.css']
})
export class PackingListComponent {
  // Riceve la lista degli oggetti dal componente principale (app)
  @Input() items: Item[] = [];

  // Comunica al componente principale quando un oggetto viene rimosso o spuntato
  @Output() togglePacked = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();

  onToggle(id: number) {
    this.togglePacked.emit(id);
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }
}
