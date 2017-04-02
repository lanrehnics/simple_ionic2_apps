import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-buyout',
  templateUrl: 'buyout.html'
})
export class BuyoutPage {
  item :string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

  goToRoot() {
      this.navCtrl.popToRoot();
  }

}
