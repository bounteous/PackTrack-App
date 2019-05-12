import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { SharedModule } from "../shared/shared.module";
import * as JWT from 'jwt-decode';

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(
    private storage: Storage,
    private platform: Platform,
    private __sharedModule: SharedModule
  ) {
    // this.platform.ready().then(() => {
    //   this.checkToken();
    // }).catch((err) => {
    // })
  }

  async checkToken() {
    return await this.__sharedModule.getStorage(TOKEN_KEY);
  }

  async login(token: string) {
    await this.setDecodeToken(token);
    return await this.__sharedModule.setStorage(TOKEN_KEY, `Bearer ${token}`);
  }

  async setDecodeToken(token) {
    return await this.__sharedModule.setStorage(
      `${TOKEN_KEY}-decoded`,
      JWT(token)
    );
  }

  async logout() {
    return await this.storage.remove(TOKEN_KEY);
  }
}
