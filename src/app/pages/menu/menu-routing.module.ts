import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { DashboardPage } from 'src/app/members/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        outlet: 'menucontent',
        component: DashboardPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/(menucontent:dashboard)'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
