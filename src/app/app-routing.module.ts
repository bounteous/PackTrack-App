import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './public/signup/signup.module#SignupPageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
