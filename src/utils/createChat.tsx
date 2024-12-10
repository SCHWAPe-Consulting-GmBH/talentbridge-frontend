import { firestore } from '@/firebase/config';
import { IChatCreator } from '@/types/chat';
import { collection, addDoc } from 'firebase/firestore';

export async function createChat(chatName: string, owner: IChatCreator) {
  if (!chatName) {
    return;
  }
  
  const chatRef = collection(firestore, 'chats');
  const chatDoc = await addDoc(chatRef, {
    name: chatName,
    owner: owner.id,
    participants: [owner],
  });
}