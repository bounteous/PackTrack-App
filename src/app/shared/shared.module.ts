import { Component, OnInit, NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedModule {
  private defaultDuration: Number = 4000;

  constructor(public toastController: ToastController) { }

  async simpleOk(content) {
    const toast = await this.toastController.create({
      message: content.message,
      duration: content.duration || this.defaultDuration,
      color: 'dark'
    });
    toast.present();
  }

  async simpleError(content) {
    const toast = await this.toastController.create({
      message: content.message,
      duration: content.duration || this.defaultDuration,
      color: 'danger'
    });
    toast.present();
  }
}
