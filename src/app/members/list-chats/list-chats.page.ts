import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../providers/private/chat.service";
import { SharedModule } from "../../shared/shared.module";
import { ChatFront } from "../../models/chat-front.model";

@Component({
  selector: "app-list-chats",
  templateUrl: "./list-chats.page.html",
  styleUrls: ["./list-chats.page.scss"]
})
export class ListChatsPage implements OnInit {
  public chats: ChatFront;

  constructor(
    private __chatService: ChatService,
    private __sharedModule: SharedModule
  ) {
    this.chats = new ChatFront();
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.__chatService.list().subscribe(
      async res => {
        this.chats = res;
        console.log(this.chats)
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }
}
