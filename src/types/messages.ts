import { Timestamp } from "firebase/firestore";

export interface IMessage {
  id: string;
  chatId: string;
  createdAt: Timestamp;
  senderId: string;
  senderName: string;
  text: string;
}