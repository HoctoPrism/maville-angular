import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: any;
  decodedToken?: { [key: string]: string };

   constructor(public router: Router, public _snackBar: MatSnackBar) { }

     // Set the token
  setToken(token: any) {
    if (token) {
      this.jwtToken = token;
    }
  }

    // Decode the token
  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwtToken);
  }

      // Get the username via the decoded token
  getUsername() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.username : null;
  }

      // Get the roles via the decoded token
  getRoles() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.roles : null;
  }

    // Get the expiration of the token via the decoded token
  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

    // Tell of the token is expired via the decoded token
    isTokenExpired(): boolean {
      const expiryTime: any = this.getExpiryTime();
        if (((1000 * expiryTime) - (new Date()).getTime()) <= 0) {
          let removeToken = localStorage.removeItem('access_token');
          this._snackBar.open("Votre token a expiré, veuillez-vous reconnecter", 'fermer', { duration: 8000 });
          this.router.navigate(['login']);
          return true;
        } else {
          return false;
        }
      }
    }

