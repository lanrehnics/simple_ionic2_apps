import { Component } from "@angular/core";
import { AlertController, NavController, Alert } from "ionic-angular";
import { PhoneService } from "../../services/phone";

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {
    private phone: string = '';

    constructor(private alertCtrl: AlertController,
                private phoneService: PhoneService,
                private navCtrl: NavController
    ) {}
    
    onInputKeyPress({keyCode}: KeyboardEvent): void {
        if (keyCode === 13) {
            this.login();
        }
    }

    login(phone: string = this.phone): void {
        const alert = this.alertCtrl.create({
            title: 'Confirm',
            message: `Would you like to proceed with this phone number ${phone}`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.handleLogin(alert);
                        return false
                    }
                }
            ]
        });
        alert.present();
    }

    handleLogin(alert: Alert): void {
        alert.dismiss().then(()=> {
            return this.phoneService.verify(this.phone);
        })
        .catch((e) => {
            this.handleError(e)
        });
    }

    handleError(e: Error): void {
        console.error(e);

        const alert = this.alertCtrl.create({
            title: 'Oops!',
            message: e.message,
            buttons: ['Ok']
        });

        alert.present();
    }
}