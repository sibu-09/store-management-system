import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()" #loginForm="ngForm">
        <input 
          type="text" 
          [(ngModel)]="username" 
          name="username" 
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          [(ngModel)]="password" 
          name="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit" [disabled]="!loginForm.valid">Login</button>
      </form>

      <p>Don't have an account? 
        <a routerLink="/register">Register here</a>
      </p>
    </div>
  `,
    styles: [`
    /* Background and layout */
    .auth-container {
      max-width: 400px;
      margin: 80px auto;
      padding: 30px;
      background: linear-gradient(135deg, #f0f4ff, #e8f0fe);
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
      color: #000;
    }

    h2 {
      color: #1e3a8a;
      font-size: 28px;
      margin-bottom: 25px;
      font-weight: 600;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input {
      width: 90%;
      margin: 10px 0;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
      outline: none;
    }

    button {
      margin-top: 15px;
      padding: 10px 20px;
      width: 60%;
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    button:hover:enabled {
      background: linear-gradient(135deg, #0056b3, #004494);
      transform: scale(1.05);
    }

    p {
      margin-top: 18px;
      font-size: 14px;
    }

    a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Responsive adjustments */
    @media (max-width: 480px) {
      .auth-container {
        width: 90%;
        padding: 20px;
      }

      input {
        width: 100%;
      }

      button {
        width: 80%;
      }
    }
  `]

})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        // ✅ Save token & role in localStorage
        this.authService.saveToken(res.token, res.role);

        // ✅ Save user details (NEW)
        if (res.user) {
          this.authService.saveUser(res.user);
        }

        alert('✅ Login successful!');

        // ✅ Redirect based on role
        const role = res.role?.toUpperCase();
        if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'USER') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('❌ Invalid username or password!');
      }
    });
  }
}
