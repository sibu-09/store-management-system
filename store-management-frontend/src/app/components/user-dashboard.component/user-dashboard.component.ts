<div class="dashboard-wrapper">
  <aside class="sidebar">
    <div class="logo">
      <h3>User<span>Pro</span></h3>
    </div>
    <ul class="nav-menu">
      <li routerLinkActive="active-link">
        <a routerLink="products">📦 Browse Products</a>
      </li>
      <li routerLinkActive="active-link">
        <a routerLink="sales">💰 My Purchase History</a>
      </li>
    </ul>
  </aside>

  <main class="main-content">
    <header class="top-bar">
      <div class="header-info">
        <h2>👤 User Dashboard</h2>
        <p>Welcome back! Manage your account and orders here.</p>
      </div>
      <button class="logout-btn" (click)="logout()">🚪 Logout</button>
    </header>

    <div class="stats-container">
      <div class="stat-card" routerLink="products">
        <div class="stat-info">
          <h3>Products</h3>
          <p>View latest inventory</p>
        </div>
        <span class="arrow">→</span>
      </div>

      <div class="stat-card" routerLink="sales">
        <div class="stat-info">
          <h3>Sales</h3>
          <p>Track your orders</p>
        </div>
        <span class="arrow">→</span>
      </div>
    </div>

    <div class="outlet-container">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>

css -.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  .logo {
    padding: 20px 30px;
    h3 { 
      color: #1e293b; 
      font-weight: 800; 
      span { color: #3b82f6; }
    }
  }

  .nav-menu {
    list-style: none;
    padding: 0;
    margin-top: 20px;

    li {
      margin: 8px 15px;
      border-radius: 10px;
      transition: all 0.3s;

      a {
        display: block;
        padding: 12px 20px;
        text-decoration: none;
        color: #64748b;
        font-weight: 500;
      }

      &:hover { background: #f1f5f9; }
      &.active-link {
        background: #3b82f6;
        a { color: white; }
      }
    }
  }
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h2 { color: #0f172a; font-size: 28px; margin: 0; }
  p { color: #64748b; margin: 5px 0 0; }
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); background: #dc2626; }
}

/* Updated Rectangular Cards (No more odd circles) */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
    transform: translateY(-5px);
  }

  h3 { color: #1e293b; margin: 0; font-size: 22px; }
  p { color: #94a3b8; margin: 5px 0 0; font-size: 14px; }
  .arrow { color: #3b82f6; font-size: 24px; font-weight: bold; }
}

.outlet-container {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}4