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
      // if (localStorage.getItem('loginVet') == 'true') {
      //   this.router.navigateByUrl('/home');
      //   return true;
      // } else if (localStorage.getItem('loginClient') == 'true') {
      //   localStorage.clear();
      //   this.router.navigateByUrl('/login');
      //   alert('Usuario no autorizado');
      //   return false;
      // }
      // return false;
      return true;
    } else {
      // localStorage.clear();
      // alert('La sesión expiró, por favor inicie sesión de nuevo');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
