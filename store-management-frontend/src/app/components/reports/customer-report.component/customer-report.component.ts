import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
}

@Component({
  selector: 'app-customer-report',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit {

  customers: Customer[] = [];

  ngOnInit(): void {
    // Dummy data for testing
    this.customers = [
      { id: 1, name: 'Ravi Kumar', email: 'ravi@gmail.com', phone: '9876543210', totalPurchases: 12000 },
      { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '9765432109', totalPurchases: 9500 },
      { id: 3, name: 'Amit Singh', email: 'amit@gmail.com', phone: '9898989898', totalPurchases: 15800 }
    ];
  }

  getTotalCustomers(): number {
    return this.customers.length;
  }
}
