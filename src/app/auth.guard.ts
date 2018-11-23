import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './services/login.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginService, private router: Router) {}

  canActivate() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
