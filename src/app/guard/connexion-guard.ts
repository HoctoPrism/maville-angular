import { coerceNumberProperty } from '@angular/cdk/coercion';
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
export class ConnexionGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public _snackBar: MatSnackBar,
    public jwtTokenService: JWTTokenService,

  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
        this._snackBar.open("Accès non autorisé merci de vous connecter", 'fermer', { duration: 8000 });
        this.router.navigate(['login'])
    }
    return true;
  }
}