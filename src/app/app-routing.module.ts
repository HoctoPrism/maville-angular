import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './partials/signin/signin.component';
import { AuthGuard } from './guard/auth-guard';
import { UserComponent } from './user/user.component';
import { FestivalComponent } from './festival/festival.component';
import { TagComponent } from './tag/tag.component';
import {PlaceComponent} from "./place/place.component";

const routes: Routes = [
  { path: "accueil", component: AccueilComponent},
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
      { path: 'festival', component: FestivalComponent },
      { path: 'tag', component: TagComponent },
      { path: 'place', component: PlaceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
