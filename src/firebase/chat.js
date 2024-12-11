import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { query, where } from 'firebase/firestore';

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

const deleteCollection = async (parentDoc, subcollection) => {
  const subColRef = collection(parentDoc, subcollection);
  const subColDocs = await getDocs(subColRef);

  await Promise.all(subColDocs.docs.map((doc) => deleteDoc(doc.ref)));
};

export const deleteCallById = async (callId) => {
  try {
    const delay = 2 * 60 * 1000;

    console.log(`Document with ID ${callId} will be deleted in 2 min.`);

    setTimeout(async () => {
      const callDocRef = doc(firestore, 'calls', callId);

      await deleteCollection(callDocRef, 'offerCandidates');
      await deleteCollection(callDocRef, 'answerCandidates');
      await deleteDoc(callDocRef);

      console.log(`Document with ID ${callId} deleted successfully.`);
    }, delay);
  } catch (error) {
    console.error(
      `Error scheduling deletion for document with ID ${callId}:`,
      error
    );
  }
};

export const createCallWithLink = async (
  pc,
  nameCall,
  callDate,
  participants
) => {
  try {
    if (!callDate || !participants || participants.length === 0) {
      throw new Error('Date and participants are required.');
    }

    const callDoc = doc(collection(firestore, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');

    const callId = callDoc.id;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        setDoc(doc(offerCandidates), event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const callData = {
      nameCall: nameCall,
      offer: offerDescription,
      date: callDate,
      participants,
      createdAt: new Date().toISOString(),
    };

    await setDoc(callDoc, callData);

    return callId;
  } catch (error) {
    console.error('Error creating call:', error);
    return null;
  }
};

export const getUserCalls = async (uid) => {
  try {
    // Отримуємо ID поточного користувача
    const currentUserId = uid;
    if (!currentUserId) throw new Error('User is not authenticated');

    // Формуємо запит для отримання дзвінків поточного користувача
    const callsCollection = collection(firestore, 'calls');
    const userCallsQuery = query(
      callsCollection,
      where('participants', 'array-contains', currentUserId)
    );

    // Виконуємо запит
    const snapshot = await getDocs(userCallsQuery);

    // Формуємо масив дзвінків
    const calls = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return calls;
  } catch (error) {
    console.error('Error fetching user calls:', error);
    return [];
  }
};
