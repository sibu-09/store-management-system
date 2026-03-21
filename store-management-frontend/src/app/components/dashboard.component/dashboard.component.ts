import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ✅ make sure this path is correct

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h2>Store Management Dashboard</h2>
      <p *ngIf="role">Logged in as: <strong>{{ role }}</strong></p>

      <div class="card-container">

        <!-- 👑 ADMIN CARDS -->
        <ng-container *ngIf="role === 'ADMIN'; else userSection">
          <div class="card" routerLink="/products">
            <h3>Product</h3>
            <p>Manage all your products</p>
          </div>

          <div class="card" routerLink="/customers">
            <h3>Customers</h3>
            <p>View and manage customer details</p>
          </div>

          <div class="card" routerLink="/sales">
            <h3>Sales</h3>
            <p>Track and manage sales records</p>
          </div>

          <div class="card" routerLink="/reports">
            <h3>Reports</h3>
            <p>Analyze your business performance</p>
          </div>
        </ng-container>

        <!-- 🙋‍♂️ USER CARDS -->
        <ng-template #userSection>
          <div class="card" routerLink="/products">
            <h3>Products</h3>
            <p>Browse and view product details</p>
          </div>

          <div class="card" routerLink="/sales">
            <h3>Sales</h3>
            <p>View your purchase history</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      text-align: center;
      padding: 20px;
    }

    h2 {
      color: #333;
      margin-bottom: 10px;
    }

    .card-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 20px;
    }

    .card {
      width: 220px;
      height: 160px;
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, background-color 0.3s;
      padding: 20px;
    }

    .card:hover {
      transform: scale(1.05);
      background-color: #e0e7ff;
    }

    .card h3 {
      color: #007bff;
      margin-bottom: 10px;
    }

    .card p {
      color: #555;
    }
  `]
})
export class DashboardComponent implements OnInit {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
 // ✅ get user role from AuthService
  }
}
