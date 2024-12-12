import { Timestamp } from "firebase/firestore";

export interface IMessage {
  chatId: string;
  createdAt: Timestamp;
  senderId: string;
  photo: string;
  senderName: string;
  text: string;
}