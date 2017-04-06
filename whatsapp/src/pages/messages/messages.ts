import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chat, Message, MessageType } from 'api/models';
import { Observable } from 'rxjs';
import { Messages } from 'api/collections';
import { MeteorObservable } from 'meteor-rxjs';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage implements OnInit {
  selectedChat: Chat;
  title: string;
  picture: string;
  messages: Observable<Message[]>
  message: string = '';

  constructor(public navParams: NavParams) {
    this.selectedChat = <Chat>navParams.get('chat');
    this.title = this.selectedChat.title;
    this.picture = this.selectedChat.picture;
  }

  ngOnInit() {
    let isEven = false;

    this.messages = Messages.find(
      {chatId: this.selectedChat._id},
      {sort: {createdAt: 1}}
    ).map((messages: Message[]) => {
      messages.forEach((message: Message) => {
        message.ownership = isEven ? 'mine' : 'other';
        isEven = !isEven;
      });
      return messages;
    });
  }

  onInputKeypress({ keyCode }: KeyboardEvent): void {
    if (keyCode === 13) {
      this.sendTextMessage();
    }
  }

  sendTextMessage():void {
    if (!this.message) {
      return;
    }

    MeteorObservable.call('addMessage', MessageType.TEXT,
      this.selectedChat._id,
      this.message
    ).zone().subscribe(() => {
      this.message = '';
    });
  }
}
