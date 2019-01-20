import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private localStorage: LocalStorageService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isAuthenticated = this.localStorage.retrieve('isAuthenticated');

    if (isAuthenticated === true) {
      return true;
    }
    else {
      // this.router.navigate(['/user'], 
      // {
      //   queryParams: {
      //     login: true
      //   }
      // }
      // );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
