// Modules
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
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
    private _authenticationService: AuthenticationService,
    private __dealerService: DealerService,
    public navCtrl: NavController,
    private __sharedModule: SharedModule
  ) {
    this.dealer = new DealerFront();
  }

  ngOnInit() {
  }

  logIn() {
    this.__dealerService.login(this.dealer).subscribe(
      async res =>  {
        await this.__sharedModule.simpleOk({
          message: res.msg,
          duration: 4000,
        })
        this._authenticationService.login(res.access_token);
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
