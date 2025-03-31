import { createChatIdDef } from "./Chat/createChatdef";
import { deleteChatIdDef } from "./Chat/delteChatDef";
import { getChatHistoryDef } from "./Chat/getChatHistory";
import { getChatIdsDef } from "./Chat/getChatIds";
import { sendMessageDef } from "./Chat/sendMessagedef";

export class ChatService {
    static createChat = createChatIdDef;
    static delteChat = deleteChatIdDef
    static getChatHistory = getChatHistoryDef
    static sendMessage = sendMessageDef
    static getChatIds = getChatIdsDef

}