import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './partials/signin/signin.component';
import { AuthGuard } from './guard/auth-guard';
import { ConnexionGuard } from './guard/connexion-guard';
import { UserComponent } from './user/user.component';
import { FestivalComponent } from './festival/festival.component';

const routes: Routes = [
  { path: "accueil", component: AccueilComponent},
  { path: "", component: AccueilComponent},
  { path: "login", component: SigninComponent },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    },
    children: [
      { path: 'user', component: UserComponent },
      { path: 'festival', component: FestivalComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
