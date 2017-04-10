import { NgModule, ErrorHandler } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { MessagesPage } from '../pages/messages/messages';
import { PhoneService } from "src/services/phone";


@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    MessagesPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhoneService
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
