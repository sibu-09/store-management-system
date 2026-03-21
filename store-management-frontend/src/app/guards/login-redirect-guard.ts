import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // ✅ If user is logged in, redirect to proper dashboard
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      if (role === 'ADMIN') {
        return this.router.parseUrl('/admin-dashboard');
      } else if (role === 'USER') {
        return this.router.parseUrl('/user-dashboard');
      }
    }
    // ✅ Otherwise, allow access to /login or /register
    return true;
  }
}
