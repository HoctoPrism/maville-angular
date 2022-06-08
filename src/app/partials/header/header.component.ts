import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JWTTokenService } from 'src/app/services/JWT/jwttoken.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import { ThemeModeService } from 'src/app/services/theme-mode/theme-mode.service';
import { ModifyPasswordComponent } from 'src/app/user/dialogs/modify-password/modify-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = [];
  title: string = "";
  isDark: any = undefined;
  checked: any;
  logged: any;
  categories: any;
  modifyPasswordDialogRef?: MatDialogRef<ModifyPasswordComponent>;
  isLoading = false;
  err:any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private headerTitleService: HeaderTitleService,
    public themeMode: ThemeModeService,
    public token: JWTTokenService,
    private location: Location,
    private dialog: MatDialog
  ) {

    // Update the title dynamically
    this.headerTitleService.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });

    

    this.authService.errorSend.subscribe(
      data => {
        if (data === 'none') {
          this.logged = true
          this.userService.currentUser().subscribe(
            data => { this.user = data },
            err => { err.status }
          );
        }
      }
    )

  }

  logout() {
    this.authService.doLogout()
    this.logged = false;
  }

  ngOnInit(): void {
    this.themeMode.themeSlideChecked();
    this.checked = this.themeMode.getSlideChecked();
    this.token.setToken(this.authService.getToken());
    if (localStorage.getItem('access_token')) {
      this.token.isTokenExpired();
      this.logged = true;
      this.userService.currentUser().subscribe(
        data => { this.user = data },
        err => { err.status }
      );
    }
  }

    // Open a dialog that processes the user POST (new)
    modifyPasswordDialog(id:number){
      this.modifyPasswordDialogRef = this.dialog.open(ModifyPasswordComponent, {
        disableClose: true,
        data: { id: id }
      });
      this.modifyPasswordDialogRef.componentInstance.errorSend.subscribe(result => {
        this.isLoading = true;
        if ( result === 'none' ) {
          this.modifyPasswordDialogRef?.componentInstance.closeDialog()
          this.modifyPasswordDialogRef?.afterClosed().subscribe( result => {
            this.isLoading = false;
          })
        }
      }, err => { this.err = err })
    }

  onSwitch() {
    this.themeMode.onSwitch();
  }

  back() {
    this.location.back();
  }

}
