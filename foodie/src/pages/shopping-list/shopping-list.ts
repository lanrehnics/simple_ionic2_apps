import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Http } from "@angular/http";
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];
  
  constructor(private slService: ShoppingListService,
              private popoverController: PopoverController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {}

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

  private handleError(errorMessage: string) {
    this.alertController.create({
      title: "an error occured",
      message: errorMessage,
      buttons: ['ok']
    }).present()
  }

  ionViewWillEnter() {
    this.loadItems();
  }
  
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingController.create({
      content: 'Please wait'
    })
    const popover = this.popoverController.create(DatabaseOptionsPage);
    
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (!data) { return; }
      if (data.action === 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.fetchList(token)
              .subscribe(
                (list: Ingredient[]) =>{
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              )
          })
      } else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.storeList(token)
              .subscribe(
                () => loading.dismiss(),
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              )
          })
          .catch()
      }
    })

  }
}
