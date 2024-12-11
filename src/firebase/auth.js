'use client';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { firestore } from '@/firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// import { updateProfile } from 'firebase/auth';

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
    return null;
  }
};

export const updateUserPayment = async (userId, paymentData) => {
  try {
    const userRef = doc(firestore, 'users', userId);

 await setDoc(userRef, { payment: paymentData }, { merge: true });
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
import { updateProfile } from 'firebase/auth';

export const updateDisplayName = async (newDisplayName, newPhotoURL) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
      photoURL: newPhotoURL,
    });
    console.log('Display name updated successfully!');
  } catch (error) {
    console.error('Error updating display name:', error);
  }
};
