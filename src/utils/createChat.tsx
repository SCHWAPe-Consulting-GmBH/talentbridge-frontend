import { firestore } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function createChat(chatName: string, creatorId: string) {
  const chatRef = collection(firestore, 'chats');
  const chatDoc = await addDoc(chatRef, {
    name: chatName,
    participants: [creatorId],
  });
  console.log('Chat created with ID:', chatDoc.id);
}