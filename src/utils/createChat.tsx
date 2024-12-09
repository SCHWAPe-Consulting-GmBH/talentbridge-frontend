import { firestore } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function createChat(chatName: string, creatorId: string) {
  if (!chatName) {
    return;
  }
  
  const chatRef = collection(firestore, 'chats');
  const chatDoc = await addDoc(chatRef, {
    name: chatName,
    owner: creatorId,
    participants: [creatorId],
  });
}