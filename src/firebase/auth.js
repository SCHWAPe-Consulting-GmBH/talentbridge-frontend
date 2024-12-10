import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { firestore } from '@/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const logOut = async () => {
  await signOut(auth);
};

export const saveUserData = async (userId, userData) => {
  const userRef = doc(firestore, 'users', userId);
  await setDoc(userRef, userData, { merge: true });
};

export const getUserData = async (userId) => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

export const updateUserPayment = async (userId, paymentData) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    await updateDoc(userRef, { payment: paymentData });

    console.log('Payment data updated successfully!');
  } catch (error) {
    console.error('Error updating payment data:', error);
    throw error;
  }
};

export const getUserPayment = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.payment) {
        console.log('Payment data:', userData.payment);
        return userData.payment;
      } else {
        console.log('No payment data for user.');
        return null;
      }
    } else {
      console.log('No such user document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching payment data:', error);
    throw error;
  }
};
