<!-- user-dashboard.component.html -->
<div class="shell">

  <aside class="sidebar">
    <div class="brand">
      <div class="brand-icon">U</div>
      <span class="brand-name">User<strong>Pro</strong></span>
    </div>

    <nav class="nav">
      <a class="nav-item" routerLink="products" routerLinkActive="nav-item--active">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        Browse Products
      </a>
      <a class="nav-item" routerLink="sales" routerLinkActive="nav-item--active">
        <svg class="nav-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5h14M3 10h10M3 15h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Purchase History
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="user-chip">
        <div class="avatar">U</div>
        <div class="user-meta">
          <span class="user-name">My Account</span>
          <span class="user-role">Standard User</span>
        </div>
      </div>
    </div>
  </aside>

  <div class="body">
    <header class="topbar">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-sub">Welcome back — here's your overview.</p>
      </div>
      <button class="btn-logout" (click)="logout()">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M13 3h4v14h-4M8 14l4-4-4-4M12 10H3"
                stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
      </button>
    </header>

    <section class="cards-row">
      <div class="card card--link" routerLink="products">
        <div class="card-label">Products</div>
        <div class="card-value">Inventory</div>
        <p class="card-hint">View &amp; browse all items</p>
        <div class="card-arrow">→</div>
      </div>
      <div class="card card--link card--accent" routerLink="sales">
        <div class="card-label">Orders</div>
        <div class="card-value">My Sales</div>
        <p class="card-hint">Track purchase history</p>
        <div class="card-arrow">→</div>
      </div>
    </section>

    <section class="outlet-section">
      <router-outlet></router-outlet>
    </section>
  </div>

</div>