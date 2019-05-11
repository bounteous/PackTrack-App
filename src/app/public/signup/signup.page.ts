import { Component, OnInit, NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/providers/public/user.service';
import { UserFront } from 'src/app/models/user-front.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
@NgModule({
  imports: [CommonModule, SharedModule]
})
export class SignupPage implements OnInit {
  public dealer: UserFront;

  constructor(
    private __dealerService: UserService,
    public navCtrl: NavController,
    public __sharedModule: SharedModule
  ) {
    this.dealer = new UserFront();
  }

  ngOnInit() {
  }

  signUp() {
    this.__dealerService.signup(this.dealer).subscribe(
      async res => {
        await this.__sharedModule.simpleOk({
          message: res.msg,
          duration: 4000,
        })
        this.goBack()
      }, async error => {
        await this.__sharedModule.simpleError({
          message: error.error.msg,
          duration: 4000,
        })
      }
    )
  }

  goBack() {
    this.navCtrl.goBack()
  }

}
