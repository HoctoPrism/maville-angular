import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { JWTTokenService } from '../services/JWT/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public jwtTokenService: JWTTokenService,
    public router: Router,
    public _snackBar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  // Check if the user has a ROLE_ADMIN or not
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn) {
      this.jwtTokenService.setToken(this.authService.getToken());
      const userRole = this.jwtTokenService.getRoles();
    if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['']);
        this._snackBar.open("Vous n'êtes pas connecté avec un compte administrateur", 'fermer', { duration: 8000 });
        return false;
     }
      return true;
    }

    this.router.navigate(['']);
    this._snackBar.open("Vous n'êtes pas connecté avec un compte administrateur", 'fermer', { duration: 8000 });
    return false;
  }
}