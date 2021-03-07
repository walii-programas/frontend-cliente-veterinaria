import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalAuthService } from '../services/globalAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(
    private gAuthService: GlobalAuthService,
    private router: Router
  ) {}
  
  canActivate() {
    if (this.gAuthService.getLoginStatus()) {
      return true;
    } else {
      this.router.navigateByUrl('/inicio');
      return false;
    }
  }
  
}
