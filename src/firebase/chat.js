import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export const deleteCollectionCallChatById = async (chatId) => {
  const messagesRef = collection(
    firestore,
    'callChat',
    String(chatId),
    'messages'
  );

  try {
    const querySnapshot = await getDocs(messagesRef);

    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(firestore, messagesRef.path, document.id))
    );

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};
export const deleteCallById = async (callId) => {
  try {
    // Створюємо посилання на документ у колекції "calls" за його ID
    const callDocRef = doc(firestore, 'calls', callId);

    // Видаляємо документ
    await deleteDoc(callDocRef);

    console.log(`Document with ID ${callId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting document with ID ${callId}:`, error);
  }
};