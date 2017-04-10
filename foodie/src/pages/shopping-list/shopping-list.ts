import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from "ionic-angular";
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';
import { Http } from "@angular/http";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];
  
  constructor(private slService: ShoppingListService,
              private popoverController: PopoverController,
              private authService: AuthService,
              public http: Http) {}

  private loadItems() {
    this.listItems = this.slService.getItems();
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
    const popover = this.popoverController.create(SLOptionsPage);
    
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data.action === 'load') {

      } else {
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.storeList(token)
              .subscribe(
                () => console.log('Success'),
                error => {
                  console.log(error)
                }
              )
          })
          .catch()
      }
    })

  }
}
