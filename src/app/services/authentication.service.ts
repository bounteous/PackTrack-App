import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    // this.platform.ready().then(() => {
    //   this.checkToken();
    // }).catch((err) => {

    // })
  }

  async checkToken() {
    return await this.storage.get(TOKEN_KEY)
  }

  async login(token: string) {
    return await this.storage.set(TOKEN_KEY, `Bearer ${token}`)
  }

  async logout() {
    return await this.storage.remove(TOKEN_KEY)
  }

}
