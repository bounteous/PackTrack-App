import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../providers/private/chat.service";
import { SharedModule } from "../../shared/shared.module";
import { ChatFront } from "../../models/chat-front.model";
import { createChangeDetectorRef } from "@angular/core/src/view/refs";

@Component({
  selector: "app-list-chats",
  templateUrl: "./list-chats.page.html",
  styleUrls: ["./list-chats.page.scss"]
})
export class ListChatsPage implements OnInit {
  public chats: ChatFront;
  public chatsResp: Boolean = false;
  public usernameConnected: String;

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
        this.usernameConnected = await this.__sharedModule.usernameLogged();
        this.chats = this.chatWith(res);
        console.log(this.usernameConnected);
        this.chatsResp = true;
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }

  chatWith(chats): ChatFront {
    let c_chat = 0;
    for (let chat of chats) {
      for (let allowed of chat.alloweds) {
        if (allowed.username !== this.usernameConnected) {
          chats[c_chat]._to = allowed.username;
        }
      }
      c_chat += 1;
    }
    return chats;
  }
}
