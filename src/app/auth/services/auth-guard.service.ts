import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');

    if (token) {
      // if token exists, route can be activated
      return true;
    } else {
      // navigate to /auth/login if token doesn't exist
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
