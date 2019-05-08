// Modules
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
// Services
import { DealerService } from '../../providers/public/dealer.service';
// Models
import { DealerFront } from '../../models/dealer-front.model';
import { NavController } from '@ionic/angular';
// Page
import { SignupPage } from '../signup/signup.page';

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
    public navCtrl: NavController
  ) {
    this.dealer = new DealerFront();
  }

  ngOnInit() {
  }

  logIn() {
    this.__dealerService.login(this.dealer).subscribe(
      dealer => {
        this._authenticationService.login(dealer.token);
      }, err => {
        console.log('Error login: ', err);
      }
    )
  }

  signUp() {
    this.navCtrl.navigateForward('/signup')
  }

}
