import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Sale {
  id: number;
  customerName: string;
  date: string;
  totalAmount: number;
  paymentMode: string;
}

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  sales: Sale[] = [];

  ngOnInit(): void {
    // Dummy data - will be replaced with backend API data
    this.sales = [
      { id: 1, customerName: 'Ravi Kumar', date: '2025-10-25', totalAmount: 2500, paymentMode: 'UPI' },
      { id: 2, customerName: 'Priya Sharma', date: '2025-10-26', totalAmount: 4700, paymentMode: 'Credit Card' },
      { id: 3, customerName: 'Amit Singh', date: '2025-10-27', totalAmount: 1900, paymentMode: 'Cash' }
    ];
  }

  getTotalSales(): number {
    return this.sales.reduce((total, sale) => total + sale.totalAmount, 0);
  }
}
