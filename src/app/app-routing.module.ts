import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: "./public/login/login.module#LoginPageModule"
  },
  {
    path: "signup",
    loadChildren: "./public/signup/signup.module#SignupPageModule"
  },
  {
    path: "members",
    loadChildren: "./members/member-routing.module#MemberRoutingModule"
  },
  {
    path: "",
    loadChildren: "./pages/menu/menu.module#MenuPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
