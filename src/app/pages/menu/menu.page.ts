import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";

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
      url: "/menu/(menucontent:dashboard)"
    },
    {
      title: "New chat",
      url: "/menu/(menucontent:new-chat)"
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}
}
