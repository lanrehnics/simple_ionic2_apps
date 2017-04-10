import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {}
  onSignup(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertController.create({
          title: 'Signup Failed',
          message: err.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
