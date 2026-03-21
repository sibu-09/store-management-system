import { Routes } from '@angular/router';

// Common Components
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { CustomerListComponent } from './components/customers/customer-list.component/customer-list.component';

import { SalesListComponent } from './components/sales/sales-list.component/sales-list.component';
import { SalesEditComponent } from './components/sales/sales-edit.component/sales-edit.component';
import { ReportDashboardComponent } from './components/reports/report-dashboard.component/report-dashboard.component';
import { SalesReportComponent } from './components/reports/sales-report.component/sales-report.component';
import { CustomerReportComponent } from './components/reports/customer-report.component/customer-report.component';
import { InventoryReportComponent } from './components/reports/inventory-report.component/inventory-report.component';

// Auth Components
import { LoginComponent } from './components/auth/login.component/login.component';
import { RegisterComponent } from './components/auth/register.component/register.component';

// Dashboards
import { AdminDashboardComponent } from './components/admin-dashboard.component/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard.component/user-dashboard.component';

// Guards
import { AdminGuard } from './guards/admin.guard-guard';
import { AuthGuard } from './guards/auth.guard-guard';
import { LoginRedirectGuard } from './guards/login-redirect-guard';

// ✅ Add ProductListComponent import
import { ProductListComponent } from './components/products-list.component/products-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Authentication
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginRedirectGuard] },

  // Common Dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // 👑 ADMIN DASHBOARD
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'sales', component: SalesListComponent },
      { path: 'sales/edit/:id', component: SalesEditComponent, canActivate: [AdminGuard] }, // ✅ Only Admin
      {
        path: 'reports',
        children: [
          { path: '', component: ReportDashboardComponent },
          { path: 'sales', component: SalesReportComponent },
          { path: 'customers', component: CustomerReportComponent },
          { path: 'inventory', component: InventoryReportComponent }
        ]
      }
    ]
  },

  // 👤 USER DASHBOARD
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'sales', component: SalesListComponent }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '/login' }
];
