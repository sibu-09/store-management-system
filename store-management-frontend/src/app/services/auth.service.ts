import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private USER_KEY = 'user'; // ✅ define user storage key

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(${this.baseUrl}/login, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(${this.baseUrl}/register, user);
  }

  saveToken(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  // ✅ Save logged-in user
 /* saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }*/

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem(this.USER_KEY); // ✅ clear user
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ✅ Proper getUser implementation
 /* getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }*/

  // auth.service.ts
saveUser(user: any) {
  // We must turn the object into a string to save it in localStorage
  localStorage.setItem('user', JSON.stringify(user));
  // Also save the email separately for easy filtering later
  localStorage.setItem('email', user.email); 
}

getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
}