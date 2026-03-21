import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {

  inventory: InventoryItem[] = [];

  ngOnInit(): void {
    // Dummy data — later you can fetch from Spring Boot backend
    this.inventory = [
      { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10, price: 55000 },
      { id: 2, name: 'Mouse', category: 'Accessories', quantity: 3, price: 700 },
      { id: 3, name: 'Keyboard', category: 'Accessories', quantity: 0, price: 1200 },
      { id: 4, name: 'Mobile Phone', category: 'Electronics', quantity: 15, price: 25000 }
    ];
  }

  getLowStockItems(): InventoryItem[] {
    return this.inventory.filter(item => item.quantity <= 5 && item.quantity > 0);
  }

  getOutOfStockItems(): InventoryItem[] {
    return this.inventory.filter(item => item.quantity === 0);
  }
}
