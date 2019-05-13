import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "src/app/providers/private/chat.service";
import { SharedModule } from "src/app/shared/shared.module";
import { Keyboard } from "@ionic-native/keyboard/ngx";

@Component({
  selector: "app-chat-interact",
  templateUrl: "./chat-interact.page.html",
  styleUrls: ["./chat-interact.page.scss"]
})
export class ChatInteractPage implements OnInit {
  public chatId: string;
  public messages: string[];
  public message: string = '';

  constructor(
    private __chatService: ChatService,
    private route: ActivatedRoute,
    private __sharedModule: SharedModule,
    private keyboard: Keyboard
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.chatId = params.chat_id;
      this.list();
    });
  }

  setMessage(_msg) {
    this.message = _msg;
  }

  list() {
    this.__chatService.messages(this.chatId).subscribe(
      async res => {
        this.messages = res;
        this.keyboard.show();
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }

  send() {
    this.__chatService.newMessage(this.chatId, this.message).subscribe(
      async res => {
        this.messages = res;
        this.keyboard.hide();
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
