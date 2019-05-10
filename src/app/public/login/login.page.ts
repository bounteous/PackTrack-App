// Modules
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
// Services
import { DealerService } from '../../providers/public/dealer.service';
// Models
import { DealerFront } from '../../models/dealer-front.model';
import { NavController } from '@ionic/angular';
// Page
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public dealer: DealerFront;

  constructor(
    private __dealerService: DealerService,
    private __authenticationService: AuthenticationService,
    public navCtrl: NavController,
    private __sharedModule: SharedModule
  ) {
    this.dealer = new DealerFront();
  }

  ngOnInit() {
  }

  logIn() {
    this.__dealerService.login(this.dealer).subscribe(
      async res => {
        await this.__sharedModule.simpleOk({
          message: res.msg,
          duration: 4000,
        })
        await this.__authenticationService.login(res.access_token)
        this.navCtrl.navigateRoot('/menu/(menucontent:new-chat)')
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
