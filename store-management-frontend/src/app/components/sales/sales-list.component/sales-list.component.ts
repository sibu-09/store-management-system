import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SaleService, Sale } from '../../../services/sale.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  role: string = ''; // ✅ To check role (admin/user)

  constructor(private saleService: SaleService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Fetch sales
    this.saleService.getAllSales().subscribe({
      next: (data: Sale[]) => {
        this.sales = data;
      },
      error: (err: any) => {
        console.error('Error fetching sales:', err);
      }
    });

    // ✅ Example: Get role from localStorage (depends on your login implementation)
    this.role = localStorage.getItem('role') || 'USER';
  }

  deleteSale(id: number): void {
    if (this.role !== 'ADMIN') {
      alert('❌ Only admin can delete sales!');
      return;
    }

    if (confirm('Are you sure you want to delete this sale?')) {
      this.saleService.deleteSale(id).subscribe({
        next: () => {
          alert('Sale deleted successfully!');
          this.sales = this.sales.filter(s => s.id !== id);
        },
        error: err => console.error('Error deleting sale:', err)
      });
    }
  }

  editSale(id: number): void {
    if (this.role === 'ADMIN') {
      console.log('Navigating to edit sale ID:', id);
      this.router.navigate([`/admin-dashboard/sales/edit/${id}`]);
    } else {
      alert('❌ Only admin can edit sales!');
    }
  }
}
