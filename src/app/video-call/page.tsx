
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
import { firebaseConfig } from '@/firebase/config';
import ChatSection from '@/components/video-call-components/ChatSection';
import Header from '@/components/video-call-components/Header';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import useRecordTimer from '@/hooks/useRecordTimer';

import Image from 'next/image';
import recordIcon from '@/assets/icons/record.svg';
import maximize from '@/assets/icons/maximize.svg';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

const servers = {
  iceServers: [
    {
      url: 'stun:stun.l.google.com:19302',
    },
    {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
    {
      url: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
  ],
  iceCandidatePoolSize: 10,
};

const VideoCall = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const pc = useRef(new RTCPeerConnection(servers));

  const [record, setRecord] = useState(false);
  const { startTimer, stopTimer, formattedTimer } = useRecordTimer();

  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isCalling) {
      stopTimer();
    }
  }, [isCalling]);

  useEffect(() => {
    let unsubscribe = () => {};

    if (callId) {
      const callDocRef = doc(firestore, 'calls', callId);
      unsubscribe = onSnapshot(callDocRef, () => {});
    }

    return unsubscribe;
  }, [callId]);

  const startWebcam = async () => {
    if (!localStream) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const remoteStream = new MediaStream();
        stream
          .getTracks()
          .forEach((track) => pc.current.addTrack(track, stream));

        pc.current.ontrack = (event) => {
          event.streams[0]
            .getTracks()
            .forEach((track) => remoteStream.addTrack(track));
        };

        setLocalStream(stream);
        setRemoteStream(remoteStream);

        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
        }
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    } else {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = null;
      }

      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
        setRemoteStream(null);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
      }
    }
  };

  const createCall = async () => {
    await startWebcam();

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
    await startWebcam();
    setIsCalling(true);

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

  const signalTrackStateChange = async (isEnabled) => {
    const callDoc = doc(firestore, 'calls', callId);
    await setDoc(callDoc, { videoEnabled: isEnabled }, { merge: true });
  };

  const signalNewTrack = async (track) => {
    const callDoc = doc(firestore, 'calls', callId);
    const newTrackInfo = {
      trackId: track.id,
      trackKind: track.kind,
      trackLabel: track.label,
    };
    await setDoc(callDoc, { newTrack: newTrackInfo }, { merge: true });
  };


  const handleVideoToggle = async () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const track = videoTracks[0];
        const isEnabled = track.enabled;
        track.enabled = !isEnabled;
        await signalTrackStateChange(!isEnabled);

        if (!isEnabled) {
          await signalNewTrack(track);
        }
      } else {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const newVideoTrack = newStream.getVideoTracks()[0];
        localStream.addTrack(newVideoTrack);
        signalNewTrack(newVideoTrack);
        updateVideoSources(localStream);
      }
    }
  };

  function updateVideoSources(stream) {
    const videoElements = document.querySelectorAll('video[local]');
    videoElements.forEach((video) => {
      video.srcObject = stream;
    });
  }

  const handleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      localStream?.getAudioTracks().forEach((track) => {
        track.enabled = !newMuteState;
      });
      return newMuteState;
    });
  };

  const handleEndCall = async () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const track = videoTracks[0];
        if (track.enabled) {
          track.enabled = false;
          await signalTrackStateChange(false);
        }
        track.stop();
        localStream.removeTrack(track);
      }
      setLocalStream(null);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = null;
      }
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
      setRemoteStream(null);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }

    if (pc.current) {
      pc.current.close();
    }

    setIsCalling(false);
  };

  const timerDoc = doc(firestore, 'timers', 'sharedTimer');

  const handleRecord = () => {
    setRecord(!record);
    if (!record) {
      startTimer(timerDoc);
    } else {
      stopTimer(timerDoc);
    }
  };

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

            <div
              className="relative rounded-t-2xl h-[643px]"
              id="video-container"
            >

              <div className="flex items-center space-x-2 py-2 px-6 absolute top-6 left-6 bg-neutral2 bg-opacity-50 rounded-full">
                <Image src={recordIcon} alt="Record" width={32} height={32} />
                <span className="text-white font-medium">{formattedTimer}</span>
              </div>

              <button
                onClick={handleFullScreen}
                className="z-[1] absolute top-6 right-6 w-[60px] h-[60px] bg-neutral2 rounded-full flex bg-opacity-50 justify-center items-center"
              >
                <Image src={maximize} alt="Maximize" width={32} height={32} />
              </button>


              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full rounded-t-2xl bg-black"
              />

              <p className="absolute bottom-6 left-6 py-2 px-6 text-center text-white text-[20px] font-semibold bg-neutral2 bg-opacity-50 rounded-full">
                Cameron Williamson
              </p>


              <div className="absolute bottom-5 right-5 bg-gray-800 p-1 rounded-2xl">

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

            <div className="flex justify-center items-center bg-background-second relative rounded-b-2xl">
            <Controls
                isCalling={isCalling}
                isMuted={isMuted}
                handleMute={handleMute}
                handleRecord={handleRecord}
                handleVideoToggle={handleVideoToggle}
              />
              <CallButton
                isCalling={isCalling}
                handleCall={isCalling ? handleEndCall : createCall}
              />
            </div>
          </div>
          <ChatSection />
        </div>
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

export default VideoCall;