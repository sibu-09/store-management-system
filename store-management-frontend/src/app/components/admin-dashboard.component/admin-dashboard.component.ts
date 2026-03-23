import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <div class="header">
        <h2>👑 Admin Dashboard</h2>
        <button class="logout-btn" (click)="logout()">🚪 Logout</button>
      </div>

      <p class="welcome-text">Welcome, Admin! You have full access.</p>

      <!-- Navigation Icons -->
      <div class="nav-icons">
        <div class="nav-item" routerLink="products">
          <div class="icon">📦</div>
          <span>Products</span>
        </div>

        <div class="nav-item" routerLink="customers">
          <div class="icon">👥</div>
          <span>Customers</span>
        </div>

        <div class="nav-item" routerLink="sales">
          <div class="icon">💰</div>
          <span>Sales</span>
        </div>

        <div class="nav-item" routerLink="reports">
          <div class="icon">📊</div>
          <span>Reports</span>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    /* 🌈 Animated background gradient */
    .admin-container {
      text-align: center;
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(-45deg, #e3f2fd, #d1e9ff, #b3d4fc, #e0f7fa);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      width: 100%;
      max-width: 900px;
      animation: slideDown 1s ease;
    }

    h2 {
      color: #000;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .welcome-text {
      color: #111;
      font-size: 1.1rem;
      margin-bottom: 25px;
      opacity: 0;
      animation: fadeUp 1.2s ease forwards;
      animation-delay: 0.3s;
    }

    /* Logout button */
    .logout-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .logout-btn:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }

    /* Navigation Icons */
    .nav-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      flex-wrap: wrap;
      animation: fadeUp 1.3s ease forwards;
      animation-delay: 0.4s;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      opacity: 0;
      animation: fadeInCard 1s forwards;
    }

    .nav-item:nth-child(1) { animation-delay: 0.3s; }
    .nav-item:nth-child(2) { animation-delay: 0.5s; }
    .nav-item:nth-child(3) { animation-delay: 0.7s; }
    .nav-item:nth-child(4) { animation-delay: 0.9s; }

    .icon {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }

    .icon:hover {
      background-color: #007bff;
      color: white;
      transform: translateY(-6px) scale(1.1);
      box-shadow: 0 8px 15px rgba(0, 123, 255, 0.3);
    }

    .nav-item span {
      margin-top: 10px;
      font-size: 1rem;
      color: #000;
      font-weight: 500;
    }

    /* ✨ Animations ✨ */
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes fadeUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeInCard {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes slideDown {
      from { transform: translateY(-30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .nav-icons {
        gap: 25px;
      }
      .icon {
        width: 70px;
        height: 70px;
        font-size: 1.5rem;
      }
    }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
