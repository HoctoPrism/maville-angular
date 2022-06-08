import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './partials/signin/signin.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewUserComponent } from './user/dialogs/new/new-user.component';
import { UserComponent } from './user/user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UpdateUserComponent } from './user/dialogs/update/update-user.component';
import { DeleteUserComponent } from './user/dialogs/delete/delete-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModifyPasswordComponent } from './user/dialogs/modify-password/modify-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    UserComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    SigninComponent,
    NewUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    ModifyPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
