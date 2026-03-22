import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h2>📝 Register</h2>

      <form (ngSubmit)="onRegister()">
        <input
          type="text"
          name="username"
          [(ngModel)]="user.username"
          placeholder="Username"
          required
        />

        <input
          type="password"
          name="password"
          [(ngModel)]="user.password"
          placeholder="Password"
          required
        />

        <input
          type="text"
          name="name"
          [(ngModel)]="user.name"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          [(ngModel)]="user.email"
          placeholder="Email"
          required
        />

        <input
          type="text"
          name="phone"
          [(ngModel)]="user.phone"
          placeholder="Phone"
          required
        />

        <input
          type="text"
          name="address"
          [(ngModel)]="user.address"
          placeholder="Address"
          required
        />

        <select
          name="role"
          [(ngModel)]="user.role"
          required
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?
        <a routerLink="/login">Login here</a>
      </p>
    </div>
  `,
  styles: [`
    /* Layout */
    .auth-container {
      max-width: 400px;
      margin: 60px auto;
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
      margin-bottom: 20px;
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

    input,
    select {
      width: 90%;
      margin: 10px 0;
      padding: 10px 12px;

      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 8px;

      transition: all 0.3s ease;
    }

    input:focus,
    select:focus {
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

      background: linear-gradient(135deg, #22c55e, #16a34a);
      transition: all 0.3s ease;
    }

    button:hover {
      transform: scale(1.05);
      background: linear-gradient(135deg, #16a34a, #15803d);
    }

    /* Text */
    p {
      margin-top: 15px;
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

      input,
      select {
        width: 100%;
      }

      button {
        width: 80%;
      }
    }
  `]
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'USER'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        alert(res.message || '✅ Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        alert('❌ Registration failed!');
      }
    });
  }
}