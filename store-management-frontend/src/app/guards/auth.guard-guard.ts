import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // ✅ Check if logged in (token exists)
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      alert('Please login first.');
      return this.router.parseUrl('/login');
    }
  }
}
