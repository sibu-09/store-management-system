import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard-guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routeSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation for ADMIN role', () => {
    authServiceSpy.getRole.and.returnValue('ADMIN');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should block activation for non-admin roles', () => {
    authServiceSpy.getRole.and.returnValue('USER');
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user-dashboard']);
  });
});
