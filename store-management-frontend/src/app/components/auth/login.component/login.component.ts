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

      <form #loginForm="ngForm" (ngSubmit)="onLogin()">
        <input
          type="text"
          name="username"
          [(ngModel)]="username"
          placeholder="Username"
          required
        />

        <input
          type="password"
          name="password"
          [(ngModel)]="password"
          placeholder="Password"
          required
        />

        <button type="submit" [disabled]="!loginForm.valid">
          Login
        </button>
      </form>

      <p>
        Don't have an account?
        <a routerLink="/register">Register here</a>
      </p>
    </div>
  `,
  styles: [`
    /* Layout */
    .auth-container {
      max-width: 400px;
      margin: 80px auto;
      padding: 30px;
      text-align: center;
      font-family: 'Segoe UI', sans-serif;

      background: linear-gradient(135deg, #f0f4ff, #e8f0fe);
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      color: #000;
    }

    /* Heading */
    h2 {
      margin-bottom: 25px;
      font-size: 28px;
      font-weight: 600;
      color: #1e3a8a;
    }

    /* Form */
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input {
      width: 90%;
      margin: 10px 0;
      padding: 10px 12px;

      font-size: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;

      transition: all 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
    }

    /* Button */
    button {
      width: 60%;
      margin-top: 15px;
      padding: 10px 20px;

      font-weight: 600;
      color: #fff;

      border: none;
      border-radius: 8px;
      cursor: pointer;

      background: linear-gradient(135deg, #007bff, #0056b3);
      transition: all 0.3s ease;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    button:hover:enabled {
      transform: scale(1.05);
      background: linear-gradient(135deg, #0056b3, #004494);
    }

    /* Text */
    p {
      margin-top: 18px;
      font-size: 14px;
    }

    a {
      font-weight: 500;
      color: #2563eb;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Responsive */
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token, res.role);

          if (res.user) {
            this.authService.saveUser(res.user);
          }

          alert('✅ Login successful!');

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