import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './guard/auth-guard';
import { ConnexionGuard } from './guard/connexion-guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "accueil", component: AccueilComponent, canActivate: [ConnexionGuard]},
  { path: "", component: SigninComponent},
  { path: "login", component: SigninComponent },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    },
    children: [
      { path: 'user', component: UserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
