import { firestore, customCollection } from '@/firebase/config';
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import Peer from 'simple-peer';

type Offer = any;
type Answer = any;
type Candidate = any;

type SignalData = {
  type: 'offer' | 'answer' | 'candidate';
  sdp?: string;
  candidate?: RTCIceCandidateInit;
};

const createOffer = async (callId: string, offer: Offer) => {
  const callDoc = doc(customCollection, callId);
  await setDoc(callDoc, {
    offer,
    offerCreated: serverTimestamp(),
  });
};

const listenForAnswer = (
  callId: string,
  onAnswerCallback: (answer: Answer) => void
) => {
  const callDoc = doc(customCollection, callId);
  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data();
    if (data && data.answer) {
      onAnswerCallback(data.answer);
    }
  });
};

const listenForOffers = (
  callId: string,
  onOfferCallback: (offer: Offer) => void
) => {
  const callDoc = doc(customCollection, callId);
  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data();
    if (data && data.offer && !data.answer) {
      onOfferCallback(data.offer);
    }
  });
};

const createAnswer = async (callId: string, answer: Answer) => {
  const callDoc = doc(customCollection, callId);
  await updateDoc(callDoc, { answer });
};

const addIceCandidate = async (
  callId: string,
  candidate: Candidate,
  type: string
) => {
  const candidateCollection = collection(customCollection, callId, type);
  await addDoc(candidateCollection, {
    candidate,
    timestamp: serverTimestamp(),
  });
};

const listenForIceCandidates = (
  callId: string,
  type: string,
  onCandidateCallback: (candidate: Candidate) => void
) => {
  const candidateCollection = collection(customCollection, callId, type);
  onSnapshot(candidateCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        onCandidateCallback(change.doc.data().candidate);
      }
    });
  });
};

export const setupPeerConnection = (
  callId: string,
  isInitiator: boolean,
  localStream: MediaStream
): Peer.Instance => {
  const peer = new Peer({
    initiator: isInitiator,
    trickle: false,
    stream: localStream,
  });

  peer.on('signal', (data: SignalData) => {
    if (data.type === 'offer') {
      createOffer(callId, data);
    } else if (data.type === 'answer') {
      createAnswer(callId, data);
    } else if (data.candidate) {
      addIceCandidate(
        callId,
        data.candidate,
        isInitiator ? 'offerCandidates' : 'answerCandidates'
      );
    }
  });

  listenForAnswer(callId, (answer) => {
    peer.signal(answer);
  });

  listenForIceCandidates(
    callId,
    'answerCandidates',
    (candidate: RTCIceCandidateInit) => {
      peer.signal({
        type: 'candidate',
        candidate: new RTCIceCandidate(candidate),
      });
    }
  );

  return peer;
};
