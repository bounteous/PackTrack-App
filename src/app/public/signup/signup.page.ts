import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DealerService } from 'src/app/providers/public/dealer.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DealerFront } from 'src/app/models/dealer-front.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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

  signUp() {
    this.__dealerService.signup(this.dealer).subscribe(
      dealer => {
        this.goBack()
      }, err => {
        console.log('Error signup: ', err);
      }
    )
  }

  goBack() {
    this.navCtrl.goBack()
  }

}
