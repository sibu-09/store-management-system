import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {
  totalSales = 0;
  totalProducts = 0;
  totalCustomers = 0;
  lowStockProducts = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData(): void {
    // 1️⃣ Fetch total sales
    this.http.get<any[]>('http://localhost:8080/api/sales').subscribe({
      next: (sales) => {
        this.totalSales = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
      },
      error: (err) => console.error('Error loading sales data:', err)
    });

    // 2️⃣ Fetch total products and low stock
    this.http.get<any[]>('http://localhost:8080/api/products').subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.lowStockProducts = products.filter(p => p.quantity <= 5).length;
      },
      error: (err) => console.error('Error loading products:', err)
    });

    // 3️⃣ Fetch total customers
    this.http.get<any[]>('http://localhost:8080/api/customers').subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
      },
      error: (err) => console.error('Error loading customers:', err)
    });
  }
}
