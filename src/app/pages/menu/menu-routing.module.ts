import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { DashboardPage } from '../../members/dashboard/dashboard.page';
import { NewChatPage } from '../../members/new-chat/new-chat.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        outlet: 'menucontent',
        component: DashboardPage
      },
      {
        path: 'new-chat',
        outlet: 'menucontent',
        component: NewChatPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/(menucontent:dashboard)'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
