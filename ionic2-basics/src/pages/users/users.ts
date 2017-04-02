import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from './user/user';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  constructor(private navCtrl: NavController) {}

  onLoadUser(name: string) {
    this.navCtrl.push(UserPage, {'userName': name})
  }

  ionViewCanEnter() : boolean | Promise<boolean> {
    console.log('ionViewCanEnter')
    const rnd = Math.random();
    return rnd > 0.1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad')
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
  }

  ionViewCanLeave(): boolean | Promise<boolean> {
    const promise = new Promise( (resolve, reject) => {
      setTimeout(()=> {
        resolve()
      }, 1000);
    });
    return promise;
  }
}
