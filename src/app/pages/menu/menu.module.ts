import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";
import { MenuRoutingModule } from "./menu-routing.module";
import { DashboardPageModule } from "../../members/dashboard/dashboard.module";
import { NewChatPageModule } from "../../members/new-chat/new-chat.module";
import { ListChatsPageModule } from "src/app/members/list-chats/list-chats.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRoutingModule,
    DashboardPageModule,
    NewChatPageModule,
    ListChatsPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
