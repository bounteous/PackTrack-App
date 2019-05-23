import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "src/app/providers/private/chat.service";
import { SharedModule } from "src/app/shared/shared.module";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { MessageFront } from "../../models/message-front.model";
import { IonContent, AlertController } from "@ionic/angular";
import { CryptService } from "../../services/crypt.service";

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

  public toUsername: string = "";

  public _decryptKey: string = "";
  public _cryptKey: string = "";

  constructor(
    private route: ActivatedRoute,
    private keyboard: Keyboard,
    public alertController: AlertController,
    private __chatService: ChatService,
    public __sharedModule: SharedModule,
    private __cryptService: CryptService
  ) {
    this.messages = [new MessageFront()];
  }

  async ngOnInit() {
    this.userId = await this.__sharedModule.getUserId();
    this.username = await this.__sharedModule.getUsername();
    this.route.queryParams.subscribe(async params => {
      this.chatId = params.chat_id;
      this.toUsername = params.to_username;
    });
    await this.presentAlertSecretConfirm({
      msg: "Insert the key for decrypt chat",
      decrypt: true
    });
  }

  scrollBottom() {
    let that = this;
    setTimeout(() => {
      that.content.scrollToBottom();
    }, 200);
  }

  setMessage(_msg) {
    this.message = _msg;
  }

  async list() {
    this.__chatService.messages(this.chatId).subscribe(
      async res => {
        this.messages = await this.enrichMessages(res);
        // this.scrollBottom();
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }

  async send() {
    const cryptMsg = await this.__cryptService.encryptMessage(
      this._cryptKey,
      this.message
    );
    this.__chatService.newMessage(this.chatId, cryptMsg).subscribe(
      async res => {
        this.messages = await this.enrichMessages(res);
        this.message = "";
        await this.list();
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }

  async enrichMessages(messages) {
    let count = 0;
    for (const item of messages) {
      if (item.from === this.userId) {
        messages[count].style = "bg-white";
        messages[count].username = this.username;
        messages[count].message = await this.__cryptService.decryptMessage(
          this._cryptKey,
          item.message
        );
      } else {
        messages[count].style = "bg-light";
        messages[count].username = this.toUsername;
        messages[count].message = await this.__cryptService.decryptMessage(
          this._decryptKey,
          item.message
        );
      }

      messages[count].style = `${
        messages[count].style
      } list-group-item list-group-item-action flex-column align-items-start `;
      count += 1;
    }
    return messages;
  }

  async askCryptKey() {
    await this.presentAlertSecretConfirm({
      msg: "Missing crypt key!",
      decrypt: false
    });
  }

  async presentAlertSecretConfirm(content) {
    const alert = await this.alertController.create({
      header: "Chat secret",
      subHeader: "AES256 CBC",
      inputs: [
        {
          name: "key",
          type: "text",
          placeholder: content.msg
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: async _data => {
            if (content.decrypt) {
              this._decryptKey = _data.key;
              await this.askCryptKey();
            } else {
              this._cryptKey = _data.key;
              await this.list();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
