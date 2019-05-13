import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/providers/private/chat.service";
import { SharedModule } from "../../shared/shared.module";
import { CryptService } from "../../services/crypt.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-new-chat",
  templateUrl: "./new-chat.page.html",
  styleUrls: ["./new-chat.page.scss"]
})
export class NewChatPage implements OnInit {
  public username: string;
  public _randomKey: string;
  public _randomSalt: string;

  private secureKey: string;
  private secureIV: string;

  constructor(
    private __chatService: ChatService,
    private __sharedModule: SharedModule,
    private __cryptService: CryptService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  create() {
    this.__chatService.create(this.username).subscribe(
      async res => {
        await this.secretsAlertPrompt();
        await this.__sharedModule.simpleOk({
          message: res.msg,
          duration: 2000
        });
      },
      async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000
        });
      }
    );
  }

  async genKeys() {
    return `${await this.__cryptService.generateSecureIV(
      this.secureIV
    )}-${await this.__cryptService.generateSecureKey(this.secureKey)}`;
  }

  async showSecretsAlert(_key) {
    const alert = await this.alertController.create({
      header: "Keys generated successfully",
      message: _key,
      buttons: [
        {
          text: "Copy clipboard",
          handler: async () => {
            await this.__sharedModule.clipboardCopy(_key);
          }
        }
      ]
    });

    await alert.present();
  }

  async secretsAlertPrompt() {
    const alert = await this.alertController.create({
      header: "Generate chat key",
      inputs: [
        {
          name: "secureKey",
          type: "text",
          placeholder: "Key file secret"
        },
        {
          name: "secureIV",
          type: "text",
          placeholder: "Salt for new key"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: async data => {
            this.secureKey = data.secureKey;
            this.secureIV = data.secureIV;
            await this.showSecretsAlert(await this.genKeys());
          }
        }
      ]
    });

    return await alert.present();
  }
}
