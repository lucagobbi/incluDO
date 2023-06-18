import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {onAuthStateChanged} from "@angular/fire/auth";
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
    onAuthStateChanged(this.authService.auth, user => {
      if(user) {
        this.router.navigateByUrl('dashboard');
        return true;
      }
      return false;
    })
  }

}
