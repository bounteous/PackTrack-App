import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/providers/private/chat.service";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-new-chat",
  templateUrl: "./new-chat.page.html",
  styleUrls: ["./new-chat.page.scss"]
})
export class NewChatPage implements OnInit {
  public username: string;

  constructor(
    private __chatService: ChatService,
    private __sharedModule: SharedModule
  ) {}

  ngOnInit() {}

  create() {
    this.__chatService.create(this.username).subscribe(
      async res => {
        await this.__sharedModule.simpleOk({
          message: res.msg,
          duration: 3000
        })
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
