import { Component, OnInit } from '@angular/core';
import { Chats, Messages } from 'api/collections';
import { Chat } from 'api/models';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { MessagesPage } from '../messages/messages';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {
  chats;

  constructor(private navCtrl: NavController) {
  }

  showMessages(chat) {
    this.navCtrl.push(MessagesPage, {chat});
  }

  ngOnInit() {
      this.chats = Chats
        .find({})
        .mergeMap((chats: Chat[]) =>
          Observable.combineLatest(
            ...chats.map((chat: Chat) =>
              Messages
                .find({chatId: chat._id})
                .startWith(null)
                .map(messages => {
                  if (messages) chat.lastMessage = messages[0];
                  return chat;
                })
            )
          )
        ).zone();
      }


  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }
}
