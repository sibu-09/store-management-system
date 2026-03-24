import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // ✅ Switched to Reactive
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Added ReactiveFormsModule
  template: `
    <div class="auth-container">
      <h2>📝 Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
        
        <div class="input-group">
          <input type="text" formControlName="username" placeholder="Username" 
                 [class.error-border]="isInvalid('username')" />
          <div class="error-text" *ngIf="isInvalid('username')">
            <small>Username (min 3 chars) is required.</small>
          </div>
        </div>

        <div class="input-group">
          <input type="password" formControlName="password" placeholder="Password" 
                 [class.error-border]="isInvalid('password')" />
          <div class="error-text" *ngIf="isInvalid('password')">
            <small>Password must be at least 6 characters.</small>
          </div>
        </div>

        <div class="input-group">
          <input type="text" formControlName="name" placeholder="Full Name" 
                 [class.error-border]="isInvalid('name')" />
          <div class="error-text" *ngIf="isInvalid('name')">
            <small *ngIf="registerForm.get('name')?.errors?.['required']">Full Name is required.</small>
            <small *ngIf="registerForm.get('name')?.errors?.['pattern']">Numbers/Symbols are not allowed.</small>
          </div>
        </div>

        <div class="input-group">
          <input type="email" formControlName="email" placeholder="Email" 
                 [class.error-border]="isInvalid('email')" />
          <div class="error-text" *ngIf="isInvalid('email')">
            <small>Please enter a valid email address.</small>
          </div>
        </div>

        <div class="input-group">
          <input type="text" formControlName="phone" placeholder="Phone (10 digits)" 
                 [class.error-border]="isInvalid('phone')" />
          <div class="error-text" *ngIf="isInvalid('phone')">
            <small>Enter a valid 10-digit phone number.</small>
          </div>
        </div>

        <div class="input-group">
          <input type="text" formControlName="address" placeholder="Address" 
                 [class.error-border]="isInvalid('address')" />
          <div class="error-text" *ngIf="isInvalid('address')">
            <small>Address is required.</small>
          </div>
        </div>

        <select formControlName="role">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" [disabled]="registerForm.invalid">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/login">Login here</a></p>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 40px auto;
      padding: 30px;
      background: linear-gradient(135deg, #f0f4ff, #e8f0fe);
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
    }

    .input-group {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input, select {
      width: 100%;
      margin: 8px 0;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    /* Professional Error Styling */
    .error-border {
      border: 1.5px solid #ef4444 !important;
      background-color: #fff5f5;
    }

    .error-text {
      width: 100%;
      text-align: left;
      color: #ef4444;
      margin-bottom: 5px;
      padding-left: 5px;
    }

    input:focus {
      border-color: #3b82f6;
      outline: none;
    }

    button {
      margin-top: 15px;
      padding: 10px 20px;
      width: 60%;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none !important;
    }

    h2 { color: #1e3a8a; margin-bottom: 20px; }
    p { margin-top: 15px; font-size: 14px; }
    a { color: #2563eb; text-decoration: none; font-weight: 500; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    // Defining the same rules we set in Spring Boot
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Letters only
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10 Digits only
      address: ['', Validators.required],
      role: ['USER']
    });
  }

  // Helper to check if a field is invalid and was touched
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          alert(res.message || '✅ Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          // If backend validation fails (e.g. User exists), show that message
          alert(err.error?.message || '❌ Registration failed!');
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Force show errors if they click submit
    }
  }
}
