// Modules
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SharedModule } from "../../shared/shared.module";
import * as io from "socket.io-client";
// rxjs
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private apiUrl: string;
  private socket: any;

  constructor(
    private httpClient: HttpClient,
    private __sharedModule: SharedModule
  ) {
    this.apiUrl = environment.server.host + environment.server.port;
    this.socket = io(`${this.apiUrl}/private`);
  }

  public create(username: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/chat", { username: username });
  }

  public notifyCreated(username: string) {
    this.socket.emit("new-chat", username);
  }

  async createSid() {
    let sid = await this.__sharedModule.getSid();
    if (!sid) {
      const user = await this.__sharedModule.getDecodedToken();
      sid = this.socket.emit("new-session", user.identity.identity);
      const split_sid = sid.id.split("#")[1];
      await this.__sharedModule.setStorage("sid", split_sid);
      return split_sid;
    }
    return sid;
  }

  public list(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/chat");
  }

  public messages(chat: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/message?chatId=${chat}`);
  }

  public newMessage(chat: string, msg: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + `/message?chatId=${chat}`, {
      message: msg
    });
  }

  public getNotifyCreated = () => {
    return Observable.create(observer => {
      this.socket.on("new_private_chat", message => {
        observer.next(message);
      });
    });
  };
}
