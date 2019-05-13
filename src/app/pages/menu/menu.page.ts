import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { longStackSupport } from "q";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  selectedPath = "";
  pages = [
    {
      title: "Dashboard",
      icon: "nuclear",
      url: "/menu/(menucontent:dashboard)"
    },
    {
      title: "Chats",
      icon: "chatboxes",
      url: "/menu/(menucontent:list-chats)"
    },
    {
      title: "New chat",
      icon: "person-add",
      url: "/menu/(menucontent:new-chat)"
    },
    {
      title: "Logout",
      icon: "exit",
      action: "logout"
    }
  ];

  constructor(
    private router: Router,
    private __authenticationService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

  async logout() {
    await this.__authenticationService.logout();
  }
}
