import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    }).catch((err) => {

    })
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
        if (res) this.authState.next(true)
      }, err => {

      }
    )
  }

  login(token: string) {
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authState.next(true);
    })
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authState.next(false);
    }).catch((err) => {

    })
  }

  isAuth() {
    return this.authState.value;
  }
}
