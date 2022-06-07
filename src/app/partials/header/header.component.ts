import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JWTTokenService } from 'src/app/services/JWT/jwttoken.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import { ThemeModeService } from 'src/app/services/theme-mode/theme-mode.service';

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

  onSwitch() {
    this.themeMode.onSwitch();
  }

  back() {
    this.location.back();
  }

}
