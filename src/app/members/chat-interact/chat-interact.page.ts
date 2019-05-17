import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "src/app/providers/private/chat.service";
import { SharedModule } from "src/app/shared/shared.module";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { MessageFront } from "../../models/message-front.model";
import { IonContent } from "@ionic/angular";

@Component({
  selector: "app-chat-interact",
  templateUrl: "./chat-interact.page.html",
  styleUrls: ["./chat-interact.page.scss"]
})
export class ChatInteractPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public chatId: string;
  public messages: MessageFront[];
  public message: string = "";

  public userId: string;
  public username: string;

  public toUsername: string;

  constructor(
    private __chatService: ChatService,
    private route: ActivatedRoute,
    private __sharedModule: SharedModule,
    private keyboard: Keyboard
  ) {
    this.messages = [new MessageFront()];
  }

  async ngOnInit() {
    this.userId = await this.__sharedModule.getUserId();
    this.username = await this.__sharedModule.getUsername();
    this.route.queryParams.subscribe(params => {
      this.chatId = params.chat_id;
      this.toUsername = params.to_username;
      this.list();
      this.scrollBottom();
    });
  }

  scrollBottom() {
    let that = this;
    setTimeout(()=>{that.content.scrollToBottom();},200); 
  }

  setMessage(_msg) {
    this.message = _msg;
  }

  list() {
    this.__chatService.messages(this.chatId).subscribe(
      async res => {
        this.messages = this.enrichMessages(res);
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
        this.messages = this.enrichMessages(res);

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

  enrichMessages(messages) {
    return messages.map(message => {
      if (message.from === this.userId) {
        message.style = "bg-white";
        message.username = this.username;
      } else {
        message.style = "bg-light";
        message.username = this.toUsername;
      }
      message.style = `${
        message.style
      } list-group-item list-group-item-action flex-column align-items-start `;

      return message;
    });
  }
}
