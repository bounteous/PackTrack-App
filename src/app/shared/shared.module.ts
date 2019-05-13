import { Component, OnInit, NgModule, Injectable } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Clipboard } from "@ionic-native/clipboard/ngx";

@Injectable({
  providedIn: "root"
})
export class SharedModule {
  private defaultDuration: Number = 4000;
  private route: String = "new-chat"; //'(menucontent:new-chat)';

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private clipboard: Clipboard
  ) {}

  async simpleOk(content) {
    const toast = await this.toastController.create({
      message: content.message,
      duration: content.duration || this.defaultDuration,
      color: "dark"
    });
    toast.present();
  }

  async simpleError(content) {
    const toast = await this.toastController.create({
      message: content.message,
      duration: content.duration || this.defaultDuration,
      color: "danger"
    });
    toast.present();
  }

  getMenuRoute() {
    console.log(this.route);
    return this.route;
  }

  setMenuRoute(newRoute) {
    return (this.route = newRoute);
  }

  async setStorage(key: any, value: any) {
    return await this.storage.set(key, value);
  }

  async getStorage(key: any) {
    return await this.storage.get(key);
  }

  async rmStorage(key: any) {
    return await this.storage.remove(key);
  }

  async usernameLogged() {
    const token_decoded = await this.getStorage("auth-token-decoded");
    return token_decoded.identity.username;
  }

  async clipboardCopy(_str) {
    this.clipboard.copy(_str);
    await this.simpleOk({
      message: "Secret of the key copied to the clipboard",
      duration: 5000
    });
  }
}
