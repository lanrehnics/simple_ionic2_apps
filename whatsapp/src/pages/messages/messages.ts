import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chat, Message } from 'api/models';
import { Observable } from 'rxjs';
import { Messages } from 'api/collections';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage implements OnInit {
  selectedChat: Chat;
  title: string;
  picture: string;
  messages: Observable<Message[]>
  constructor(public navParams: NavParams) {
    this.selectedChat = <Chat>navParams.get('chat');
    this.title = this.selectedChat.title;
    this.title = this.selectedChat.picture;

    console.log(this.selectedChat)
  }

  ngOnInit() {}
}
