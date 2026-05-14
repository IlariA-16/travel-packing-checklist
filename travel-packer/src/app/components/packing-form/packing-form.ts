import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Definiamo la struttura dei dati direttamente qui
export interface Item {
  id: number;
  name: string;
  quantity: number;
  packed: boolean;
}

@Component({
  selector: 'app-packing-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './packing-form.html',
  styleUrls: ['./packing-form.css']
})
export class PackingFormComponent {
  itemName: string = '';
  itemQuantity: number = 1;

  @Output() itemAdded = new EventEmitter<Item>();

  submitForm() {
    if (this.itemName.trim() === '') return;

    const newItem: Item = {
      id: Date.now(),
      name: this.itemName,
      quantity: this.itemQuantity,
      packed: false
    };

    this.itemAdded.emit(newItem);
    this.itemName = '';
    this.itemQuantity = 1;
  }
}
