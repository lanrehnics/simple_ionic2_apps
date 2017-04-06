import { MessageType } from "./models";
import { Chats } from "./collections/chats";
import { Messages } from "./collections/messages";

Meteor.methods({
    addMessage(type: MessageType, chatId: string, content: string) {
        const chatExists = !!Chats.collection.find(chatId).count()

        if (!chatExists) {
            throw new Meteor.Error('chat-not-exists', 'Chat does not exist');
        }
        return {
            messageId: Messages.collection.insert({
                chatId,
                content,
                createdAt: new Date(),
                type
            })
        };
    }    
});