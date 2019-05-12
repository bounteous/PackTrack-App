// Modules
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
// Services
import { UserService } from '../../providers/public/user.service';
// Models
import { UserFront } from '../../models/user-front.model';
import { NavController } from '@ionic/angular';
// Page
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private user: UserFront;

  constructor(
    private __dealerService: UserService,
    private __authenticationService: AuthenticationService,
    public navCtrl: NavController,
    private __sharedModule: SharedModule
  ) {
    this.user = new UserFront();
  }

  ngOnInit() {
  }

  logIn() {
    this.__dealerService.login(this.user).subscribe(
      async res => {
        await this.__authenticationService.login(res.access_token)
        this.navCtrl.navigateRoot('/menu/(menucontent:dashboard)')
      }, async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000,
        })
      }
    )
  }

  signUp() {
    this.navCtrl.navigateForward('/signup')
  }

}
