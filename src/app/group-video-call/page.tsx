'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  addDoc,
  collection,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'simple-peer';
import { VideoGroup } from '@/components/video-call-components/videoGroup';
import ChatSection from '@/components/video-call-components/ChatSection';
import { ControlsGroup } from '@/components/video-call-components/controlsGroup';
import { servers } from '@/utils/servers';

const GroupVideoCall = () => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const [roomId, setRoomId] = useState('');
  const [flag, setFlag] = useState(true);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const peersRef = useRef<Object[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  let userId: string | undefined = user?.uid;
  

  useEffect(() => {
    const handleDisconnect = async () => {
      const userRef = doc(firestore, 'users', userId!);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const roomID = userDoc.data().roomID;
        const roomRef = doc(firestore, 'rooms', roomID);

        await updateDoc(roomRef, {
          participants: arrayRemove(userId),
        });
      }
    };
    console.log(user?.getIdToken());
  console.log(user);
    return () => {
      handleDisconnect();
    };
  }, []);

  const createRoom = async () => {
    const roomRef = await addDoc(collection(firestore, 'rooms'), {
      participants: [],
      signals: [],
    });

    setRoomId(roomRef.id);
  };

  const joinRoom = async () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (stream) => {
        userVideo.current!.srcObject = stream;

        const roomRef = doc(firestore, 'rooms', roomId);
        const roomDoc = await getDoc(roomRef);

        if (roomDoc.exists()) {
          const roomData = roomDoc.data();
          const participants = roomData.participants || [];
          if (participants.includes(userId)) {
            return;
          }

          if (participants.length === 4) {
            alert('room full');
            return;
          }

          await updateDoc(roomRef, {
            participants: arrayUnion(userId),
          });

          if (flag) {
            setFlag(false);

            const roomData = roomDoc.data();
            const participants = roomData?.participants || [];

            const usersInThisRoom = participants.filter(
              (id: string) => id !== userId
            );

            const newPeers = usersInThisRoom
              .map((userID: string) => {
                if (
                  !peersRef.current.some(
                    (peerObj: any) => peerObj.peerID === userID
                  )
                ) {
                  const peer = createPeer(
                    userID,
                    userId!,
                    stream
                  );
                  peersRef.current.push({ peerID: userID, peer });
                  return peer;
                }
                return null;
              })
              .filter((peer: Peer.Instance) => peer !== null);

            setPeers((prevPeers) => [...prevPeers, ...newPeers]);
          }

          onSnapshot(roomRef, (snapshot) => {
            console.log(user?.getIdToken());
  console.log(user);
            const roomData = snapshot.data();
            const participants = roomData?.participants || [];

            participants.forEach((participantId: string) => {
              if (participantId !== userId) {
                const signals = roomData?.signals || [];
                signals.forEach((signalObj: any) => {
                  if (
                    signalObj.userToSignal === userId &&
                    signalObj.callerID === participantId &&
                    signalObj.signal.type === 'offer'
                  ) {
                    if (
                      !peersRef.current.some(
                        (peerObj: any) => peerObj.peerID === participantId
                      )
                    ) {
                      const peer = addPeer(
                        signalObj.signal,
                        participantId,
                        userVideo.current!.srcObject as MediaStream
                      );
                      peersRef.current.push({ peerID: participantId, peer });
                      setPeers((prevPeers) => [...prevPeers, peer]);
                    }
                  }
                });
              }
            });
          });
        }

        const userRef = doc(firestore, 'users', userId!);
        await setDoc(userRef, {
          roomID: roomId,
        });
      }).catch((error) => {
        console.error('Error accessing media devices:', error);
      });;
  };

  function createPeer(
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: servers,
    });

    peer.on('signal', (signal) => {
      const roomRef = doc(firestore, 'rooms', roomId);

      updateDoc(roomRef, {
        signals: arrayUnion({ userToSignal, callerID, signal }),
      });
    });

    return peer;
  }

  function addPeer(
    incomingSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: servers,
    });

    peer.on('signal', (signal) => {
      const roomRef = doc(firestore, 'rooms', roomId);
      updateDoc(roomRef, {
        signals: arrayUnion({ signal, callerID }),
      });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  console.log(userVideo);
  return (
    <main className="px-[100px] pt-[100px] bg4 background-style bg-background">
      <div className="max-w-[1240px] mx-auto">
        <ControlsGroup
          roomId={roomId}
          handleCreateRoom={createRoom}
          onChangeRoomId={setRoomId}
          handleJoinRoom={joinRoom}
        />
        <div className="flex justify-between space-x-[24px] max-h-[761px]">
          <div className="relative w-full max-w-[904px] h-full ">
            <div className="flex flex-wrap gap-3 h-full w-full max-h-[800px]">
              <video
                key={uuidv4()}
                muted
                ref={userVideo}
                autoPlay
                playsInline
                className="rounded-t-2xl bg-black object-cover h-full w-full"
              />
              {peers.map((peer) => {
                return <VideoGroup key={uuidv4()} peer={peer} />;
              })}
            </div>
          </div>
          <ChatSection />
        </div>
      </div>
    </main>
  );
};

export default GroupVideoCall;
