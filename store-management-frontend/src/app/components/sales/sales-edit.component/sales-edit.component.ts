import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sales-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit {
  saleId!: number;
  sale: any = {};

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      alert('❌ Access Denied! Only Admin can edit sales.');
      this.router.navigate(['/user-dashboard/sales']);
      return;
    }

    this.saleId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Fetch all sales & find by ID
    this.saleService.getAllSales().subscribe({
      next: (sales) => {
        this.sale = sales.find(s => s.id === this.saleId);
        if (!this.sale) {
          alert('Sale not found!');
          this.router.navigate(['/admin-dashboard/sales']);
        }
      },
      error: (err) => console.error('Error loading sale:', err)
    });
  }

  updateSale(): void {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      alert('❌ You are not allowed to update sales!');
      return;
    }

    this.saleService.updateSale(this.saleId, this.sale).subscribe({
      next: () => {
        alert('✅ Sale updated successfully!');
        this.router.navigate(['/admin-dashboard/sales']);
      },
      error: (err) => console.error('Error updating sale:', err)
    });
  }
}
