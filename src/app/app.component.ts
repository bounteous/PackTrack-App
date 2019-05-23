import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "./services/authentication.service";
import { ChatService } from "./providers/private/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private __authenticationService: AuthenticationService,
    private __chatService: ChatService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (!(await this.__authenticationService.getToken()))
        this.router.navigateByUrl("/login");
      this.__chatService.getNotifyCreated().subscribe((message: string) => {
        debugger
      });
      this.__chatService.createSid();
    });
  }
}
