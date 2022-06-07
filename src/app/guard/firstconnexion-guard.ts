import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { JWTTokenService } from '../services/JWT/jwttoken.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FirstConnexionGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public _snackBar: MatSnackBar,
    public jwtTokenService: JWTTokenService,
    public userService: UserService,

  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.jwtTokenService.setToken(this.authService.getToken());
    let roles:any = this.jwtTokenService.getRoles();
    if(roles.length>1){
        roles.forEach((role:any) => {
            if(role=='ROLE_FIRSTCONNECTION'){
                this._snackBar.open("Veuillez changer votre mot de passe pour accèder au site", 'fermer', { duration: 8000 });
                this.router.navigate(['first-connection'])
            }
        });
        return true
    }
    return true;
  }
}