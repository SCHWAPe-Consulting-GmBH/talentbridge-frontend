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

const deleteCollection = async (parentDoc, subcollection) => {
  const subColRef = collection(parentDoc, subcollection);
  const subColDocs = await getDocs(subColRef);

  await Promise.all(subColDocs.docs.map((doc) => deleteDoc(doc.ref)));
};

export const deleteCallById = async (callId) => {
  try {
    const callDocRef = doc(firestore, 'calls', callId);

    await deleteCollection(callDocRef, 'offerCandidates');
    await deleteCollection(callDocRef, 'answerCandidates');
    await deleteDoc(callDocRef);
    console.log(`Document with ID ${callId} deleted successfully.`);
  } catch (error) {
    console.error(
      `Error scheduling deletion for document with ID ${callId}:`,
      error
    );
  }
};

export const createCallWithLink = async (pc) => {
  try {
    // Створюємо документ для дзвінка
    const callDoc = doc(collection(firestore, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');

    // Генеруємо ID дзвінка
    const callId = callDoc.id;

    // Обробляємо ICE-кандидатів
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        setDoc(doc(offerCandidates), event.candidate.toJSON());
      }
    };

    // Створюємо пропозицію (offer)
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    // Зберігаємо пропозицію у Firestore
    await setDoc(callDoc, { offer: offerDescription });

    // Повертаємо ID дзвінка
    return callId;
  } catch (error) {
    console.error('Error creating call:', error);
    return null;
  }
};