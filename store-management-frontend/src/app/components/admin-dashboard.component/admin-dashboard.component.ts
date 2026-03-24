import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-wrapper">
      <aside class="sidebar">
        <div class="sidebar-top">
          <div class="brand">
            <span class="logo">👑</span>
            <h2 class="nav-text">AdminPro</h2>
          </div>
          
          <nav class="nav-menu">
            <div class="nav-item" routerLink="products" routerLinkActive="active">
              <span class="icon">📦</span> <span class="nav-text">Products</span>
            </div>
            
            <div class="nav-item" routerLink="sales" routerLinkActive="active">
              <span class="icon">💰</span> <span class="nav-text">Sales</span>
            </div>
            <div class="nav-item" routerLink="reports" routerLinkActive="active">
              <span class="icon">📊</span> <span class="nav-text">Reports</span>
            </div>
          </nav>
        </div>

        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <span class="icon">🚪</span> <span class="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      <main class="main-content">
        <header class="top-bar">
          <div class="welcome">
            <h3>Dashboard Overview</h3>
            <p>Welcome back, Admin!</p>
          </div>
          <div class="avatar">A</div>
        </header>

        <section class="content-body">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      display: flex;
      height: 100vh; /* Force wrapper to screen height */
      overflow: hidden; /* Prevent body scroll */
      background-color: #f8f9fa;
    }

    .sidebar {
      width: 260px;
      background: white;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* CRITICAL: Pushes footer to absolute bottom */
      height: 100vh;
      position: sticky;
      top: 0;
    }

    .sidebar-top {
      display: flex;
      flex-direction: column;
    }

    .brand {
      padding: 30px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand h2 { font-size: 1.25rem; margin: 0; font-weight: 700; color: #2b2d42; }

    .nav-menu { padding: 10px 16px; }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 8px;
      color: #8d99ae;
      cursor: pointer;
      font-weight: 500;
      transition: 0.2s;
    }

    .nav-item:hover { background: #f0f4ff; color: #4361ee; }
    .nav-item.active { background: #4361ee; color: white; }

    /* --- Logout Footer --- */
    .sidebar-footer {
      padding: 20px 16px;
      border-top: 1px solid #f0f0f0;
      background: #fff; /* Ensures visibility */
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px;
      background: #fff0f0;
      color: #ef233c;
      border: 1px solid #ffcccc;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .logout-btn:hover { background: #ef233c; color: white; }

    /* --- Main Content --- */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto; /* Allows content to scroll while sidebar stays fixed */
    }

    .top-bar {
      height: 70px;
      background: white;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
    }

    .avatar {
      width: 35px; height: 35px; background: #4361ee; color: white;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }

    .content-body { padding: 30px; }

    /* Mobile Fix */
    @media (max-width: 768px) {
      .sidebar { width: 70px; }
      .nav-text { display: none; }
    }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService) {}
  logout() { this.authService.logout(); }
}