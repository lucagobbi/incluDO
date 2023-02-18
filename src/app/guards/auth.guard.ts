import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {onAuthStateChanged} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    onAuthStateChanged(this.authService.auth, user => {
      if(user) {
        return true;
      }
      this.router.navigateByUrl('login');
      return false;
    });
  }

}
