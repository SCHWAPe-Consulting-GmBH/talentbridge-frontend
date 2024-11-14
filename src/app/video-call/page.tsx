// 'use client';

// import React, { useState, useEffect } from 'react';
// import VideoDisplay from '@/components/video-call-components/VideoDisplay';
// import CallButton from '@/components/video-call-components/CallButton';
// import Controls from '@/components/video-call-components/Controls';
// import { setupPeerConnection } from '@/utils/peer';

// import Header from '@/components/video-call-components/Header';
// import ChatSection from '@/components/video-call-components/ChatSection';
// import useRecordTimer from '@/hooks/useRecordTimer';
// import { collection, doc } from 'firebase/firestore';
// import { firestore } from '@/firebase/config';

// export default function Home() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [isCalling, setIsCalling] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   const [record, setRecord] = useState(false);
//   const { recordTimer, startTimer, stopTimer, formattedTimer } =
//     useRecordTimer();

//   const callId = doc(collection(firestore, 'calls')).id;

// useEffect(() => {
//   if (!isCalling) {
//     stopTimer();
//   }
// }, [isCalling]);

// useEffect(() => {
//   return () => {
//     stopMediaStream(localStream);
//     if (peer) {
//       peer.destroy();
//     }
//   };
// }, [localStream, peer]);

//   const handleStartCall = async () => {
//     setIsCalling(true);
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(mediaStream);

//       const newPeer = setupPeerConnection(callId, true, mediaStream);
//       setPeer(newPeer);

//       newPeer.on('stream', (stream) => {
//         setRemoteStream(stream);
//       });
//     } catch (error) {
//       console.error('Failed to start call:', error);
//       //   setIsCalling(false);
//     }
//   };

//   const handleEndCall = () => {
//     if (peer) {
//       peer.destroy();
//       setPeer(null);
//     }
//     stopMediaStream(localStream);
//     setLocalStream(null);
//     setRemoteStream(null);
//     setIsCalling(false);
//   };

//   const handleMute = () => {
//     if (localStream) {
//       const audioTracks = localStream.getAudioTracks();
//       if (audioTracks.length > 0) {
//         audioTracks[0].enabled = !isMuted;
//         setIsMuted(!isMuted);
//       }
//     }
//   };

// const handleRecord = () => {
//   setRecord(!record);
//   if (!record) {
//     startTimer();
//   } else {
//     stopTimer();
//   }
// };

//   const handleVideoToggle = () => {
//     if (localStream) {
//       const videoTracks = localStream.getVideoTracks();
//       if (videoTracks.length > 0 && videoTracks[0].enabled) {
//         videoTracks.forEach((track) => track.stop());
//         localStream.removeTrack(videoTracks[0]);
//       } else {
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then((newStream) => {
//             const newVideoTrack = newStream.getVideoTracks()[0];
//             localStream.addTrack(newVideoTrack);
//             updateVideoSources(localStream);
//           })
//           .catch((error) => {
//             console.error('Failed to restart video', error);
//           });
//       }
//     }
//   };

//   function updateVideoSources(stream) {
//     const videoElements = document.querySelectorAll('video[local]');
//     videoElements.forEach((video) => {
//       video.srcObject = stream;
//     });
//   }

//   const stopMediaStream = (stream) => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   return (
//     <main className="px-[100px] pt-[100px] bg4 background-style bg-background">
//       <div className="max-w-[1240px] mx-auto">
//         <Header />
//         <div className="flex justify-between space-x-[24px] max-h-[761px]">
//           <div className="relative w-full max-w-[904px] h-full ">
//             <VideoDisplay
//               localStream={localStream}
//               remoteStream={remoteStream}
//               recordTimer={formattedTimer}
//             />

//             <div className="flex justify-center items-center bg-background-second relative rounded-b-2xl">
//               <Controls
//                 isCalling={isCalling}
//                 isMuted={isMuted}
//                 handleMute={handleMute}
//                 record={record}
//                 handleRecord={handleRecord}
//                 handleVideoToggle={handleVideoToggle}
//               />
//               <CallButton
//                 isCalling={isCalling}
//                 handleCall={isCalling ? handleEndCall : handleStartCall}
//               />
//             </div>
//           </div>
//           <ChatSection />
//         </div>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import {
//   getFirestore,
//   collection,
//   doc,
//   setDoc,
//   getDoc,
//   onSnapshot,
// } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCj19lqivXZVv6B3b6gJS0Ov-Djt-Xe8Qs',
//   authDomain: 'talent-bridge-9c2cc.firebaseapp.com',
//   projectId: 'talent-bridge-9c2cc',
//   storageBucket: 'talent-bridge-9c2cc.firebasestorage.app',
//   messagingSenderId: '454348850491',
//   appId: '1:454348850491:web:bac397262b3189e227231e',
//   measurementId: 'G-SJPHNEZGCW',
// };

// // Initialize Firebase and Firestore only if no apps have been initialized
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const firestore = getFirestore(app);

// // The rest of your WebRTC setup and component
// const servers = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const WebRTCApp = () => {
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [callId, setCallId] = useState('');
//   const pc = useRef(new RTCPeerConnection(servers));

//   const webcamVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const startWebcam = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     const remoteStream = new MediaStream();
//     stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
//     pc.current.ontrack = (event) => {
//       event.streams[0]
//         .getTracks()
//         .forEach((track) => remoteStream.addTrack(track));
//     };
//     setLocalStream(stream);
//     setRemoteStream(remoteStream);
//     webcamVideoRef.current!.srcObject = stream;
//     remoteVideoRef.current!.srcObject = remoteStream;
//   };

//   const createCall = async () => {
//     const callDoc = doc(collection(firestore, 'calls'));
//     const offerCandidates = collection(callDoc, 'offerCandidates');
//     const answerCandidates = collection(callDoc, 'answerCandidates');
//     setCallId(callDoc.id);

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         setDoc(doc(offerCandidates), event.candidate.toJSON());
//       }
//     };

//     const offerDescription = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offerDescription);

//     await setDoc(callDoc, { offer: offerDescription });

//     onSnapshot(callDoc, (snapshot) => {
//       const data = snapshot.data();
//       if (!pc.current.currentRemoteDescription && data?.answer) {
//         pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     onSnapshot(answerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           pc.current.addIceCandidate(candidate);
//         }
//       });
//     });
//   };

//   const answerCall = async () => {
//     const callDoc = doc(firestore, 'calls', callId);
//     const answerCandidates = collection(callDoc, 'answerCandidates');
//     const offerCandidates = collection(callDoc, 'offerCandidates');

//     pc.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         setDoc(doc(answerCandidates), event.candidate.toJSON());
//       }
//     };

//     const callData = (await getDoc(callDoc)).data();
//     const offerDescription = callData?.offer;
//     await pc.current.setRemoteDescription(
//       new RTCSessionDescription(offerDescription)
//     );

//     const answerDescription = await pc.current.createAnswer();
//     await pc.current.setLocalDescription(answerDescription);

//     await setDoc(callDoc, { answer: answerDescription });

//     onSnapshot(offerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           pc.current.addIceCandidate(candidate);
//         }
//       });
//     });
//   };

//   return (
//     <div className="flex flex-col items-center p-6 font-mono text-center text-gray-800">
//       <h2 className="text-2xl font-bold mb-4">1. Start your Webcam</h2>
//       <div className="flex gap-4 mb-4">
//         <div className="text-center">
//           <h3 className="text-lg font-semibold mb-2">Local Stream</h3>
//           <video
//             ref={webcamVideoRef}
//             autoPlay
//             playsInline
//             className="w-64 h-48 bg-gray-800"
//           />
//         </div>
//         <div className="text-center">
//           <h3 className="text-lg font-semibold mb-2">Remote Stream</h3>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className="w-64 h-48 bg-gray-800"
//           />
//         </div>
//       </div>
//       <button onClick={startWebcam} className="btn-primary mb-4">
//         Start Webcam
//       </button>

// <h2 className="text-2xl font-bold mb-4">2. Create a new Call</h2>
// <button
//   onClick={createCall}
//   disabled={!localStream}
//   className="btn-primary mb-4"
// >
//   Create Call (offer)
// </button>

// <h2 className="text-2xl font-bold mb-4">3. Join a Call</h2>
// <input
//   value={callId}
//   onChange={(e) => setCallId(e.target.value)}
//   placeholder="Enter Call ID"
//   className="input mb-2"
// />
// <button
//   onClick={answerCall}
//   disabled={!callId}
//   className="btn-primary mb-4"
// >
//   Answer
// </button>

// <h2 className="text-2xl font-bold mb-4">4. Hangup</h2>
// <button
//   onClick={() => pc.current.close()}
//   disabled={!remoteStream}
//   className="btn-primary"
// >
//   Hangup
// </button>
//     </div>
//   );
// };

// export default WebRTCApp;

'use client';

import { useRef, useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

import ChatSection from '@/components/video-call-components/ChatSection';
import Header from '@/components/video-call-components/Header';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import useRecordTimer from '@/hooks/useRecordTimer';

import Image from 'next/image';
import record from '@/assets/icons/record.svg';
import maximize from '@/assets/icons/maximize.svg';

const firebaseConfig = {
  apiKey: 'AIzaSyCj19lqivXZVv6B3b6gJS0Ov-Djt-Xe8Qs',
  authDomain: 'talent-bridge-9c2cc.firebaseapp.com',
  projectId: 'talent-bridge-9c2cc',
  storageBucket: 'talent-bridge-9c2cc.firebasestorage.app',
  messagingSenderId: '454348850491',
  appId: '1:454348850491:web:bac397262b3189e227231e',
  measurementId: 'G-SJPHNEZGCW',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const WebRTCApp = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const pc = useRef(new RTCPeerConnection(servers));

  const [record, setRecord] = useState(false);
  const { recordTimer, startTimer, stopTimer, formattedTimer } =
    useRecordTimer();

  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isCalling) {
      stopTimer();
    }
  }, [isCalling]);

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
    pc.current.ontrack = (event) => {
      event.streams[0]
        .getTracks()
        .forEach((track) => remoteStream.addTrack(track));
    };
    setLocalStream(stream);
    setRemoteStream(remoteStream);
    webcamVideoRef.current!.srcObject = stream;
    remoteVideoRef.current!.srcObject = remoteStream;
  };

  const createCall = async () => {
    setIsCalling(true);
    const callDoc = doc(collection(firestore, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');
    setCallId(callDoc.id);

    pc.current.onicecandidate = (event) => {
      if (event.candidate)
        setDoc(doc(offerCandidates), event.candidate.toJSON());
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);
    await setDoc(callDoc, { offer: offerDescription });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    const callDoc = doc(firestore, 'calls', callId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.current.onicecandidate = (event) => {
      if (event.candidate)
        setDoc(doc(answerCandidates), event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData?.offer;
    await pc.current.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);
    await setDoc(callDoc, { answer: answerDescription });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const handleMute = () => {
    setIsMuted((prev) => !prev);
    localStream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !isMuted));
  };

  const handleEndCall = () => {
    pc.current.close();
    setIsCalling(false);
    setLocalStream(null);
    setRemoteStream(null);
  };

  const handleRecord = () => {
    setRecord(!record);
    if (!record) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  // const handleVideoToggle = () => {
  //   localStream
  //     ?.getVideoTracks()
  //     .forEach((track) => (track.enabled = !track.enabled));
  // };

  const handleFullScreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className="px-[100px] pt-[100px] bg4 background-style bg-background">
      <div className="max-w-[1240px] mx-auto">
        <Header />
        <div className="flex justify-between space-x-[24px] max-h-[761px]">
          <div className="relative w-full max-w-[904px] h-full">
            {/* <VideoDisplay
              webcamVideoRef={webcamVideoRef}
              remoteVideoRef={remoteVideoRef}
              recordTimer={formattedTimer}
            /> */}

            {/* testFORVARD */}

            <div
              className="relative rounded-t-2xl h-[643px]"
              id="video-container"
            >
              {/* Timer and Record Indicator */}
              <div className="flex items-center space-x-2 py-2 px-6 absolute top-6 left-6 bg-neutral2 bg-opacity-50 rounded-full">
                <Image src={record} alt="Record" width={32} height={32} />
                <span className="text-white font-medium">{recordTimer}</span>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullScreen}
                className="z-[1] absolute top-6 right-6 w-[60px] h-[60px] bg-neutral2 rounded-full flex bg-opacity-50 justify-center items-center"
              >
                <Image src={maximize} alt="Maximize" width={32} height={32} />
              </button>

              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                // controls={false}
                autoPlay
                playsInline
                className="w-full h-full rounded-t-2xl bg-black"
              />

              {/* <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-64 h-48 bg-gray-800"
              /> */}

              <p className="absolute bottom-6 left-6 py-2 px-6 text-center text-white text-[20px] font-semibold bg-neutral2 bg-opacity-50 rounded-full">
                Cameron Williamson
              </p>

              {/* Local (Webcam) Video */}
              <div className="absolute bottom-5 right-5 bg-gray-800 p-1 rounded-2xl">
                {/* <video
          ref={webcamVideoRef}
          controls={false}
          autoPlay
          muted
          playsInline
          className="lg:w-[300px] lg:h-[180px] rounded-2xl"
        /> */}
                <video
                  ref={webcamVideoRef}
                  autoPlay
                  playsInline
                  className="w-64 h-48 bg-gray-800"
                />
                <p className="absolute bottom-4 left-4 py-2 px-6 text-center text-white text-[20px] font-semibold bg-neutral2 bg-opacity-50 rounded-full">
                  Cassie Jung
                </p>
              </div>
            </div>
            {/* testFORVARD */}

            <div className="flex justify-center items-center bg-background-second relative rounded-b-2xl">
              <Controls
                isCalling={isCalling}
                isMuted={isMuted}
                handleMute={handleMute}
                handleRecord={handleRecord}
                startWebcam={startWebcam}
              />
              <CallButton
                isCalling={isCalling}
                handleCall={isCalling ? handleEndCall : createCall}
              />
            </div>
          </div>
          <ChatSection />
        </div>
        {/* tetst */}
        {/* <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Local Stream</h3>
          <video
            ref={webcamVideoRef}
            autoPlay
            playsInline
            className="w-64 h-48 bg-gray-800"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Remote Stream</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-64 h-48 bg-gray-800"
          />
        </div> */}
        {/* test */}
      </div>
      <h2 className="text-2xl font-bold mb-4">2. Create a new Call</h2>
      <button
        onClick={createCall}
        disabled={!localStream}
        className="btn-primary mb-4"
      >
        Create Call (offer)
      </button>

      <h2 className="text-2xl font-bold mb-4">3. Join a Call</h2>
      <input
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        placeholder="Enter Call ID"
        className="input mb-2"
      />
      <button
        onClick={answerCall}
        disabled={!callId}
        className="btn-primary mb-4"
      >
        Answer
      </button>

      <h2 className="text-2xl font-bold mb-4">4. Hangup</h2>
      <button
        onClick={() => pc.current.close()}
        disabled={!remoteStream}
        className="btn-primary"
      >
        Hangup
      </button>
    </main>
  );
};

export default WebRTCApp;
