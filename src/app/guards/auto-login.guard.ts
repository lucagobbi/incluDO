import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {onAuthStateChanged} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

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
