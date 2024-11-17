'use client';

import { useRef, useEffect, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import ChatSection from '@/components/video-call-components/ChatSection';
import Header from '@/components/video-call-components/Header';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import useRecordTimer from '@/hooks/useRecordTimer';

import { servers } from '@/utils/servers.ts';
import { Divider } from 'antd';
// import JoinCall from '../join-call/page';
import { JoinCallLayout } from '@/components/video-call-components/joinCall';

const VideoCall = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isJoinCall, setIsJoinCall] = useState(false);
  const pc = useRef(new RTCPeerConnection(servers));

  const [record, setRecord] = useState(false);
  const { startTimer, stopTimer, formattedTimer } = useRecordTimer();

  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  console.log(callId);
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

  const handleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      localStream?.getAudioTracks().forEach((track) => {
        track.enabled = !newMuteState;
      });
      return newMuteState;
    });
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

  const handleEndCall = async () => {
    const stopAndRemoveTracks = (stream) => {
      stream.getTracks().forEach((track) => {
        if (track.enabled) {
          track.enabled = false;
          track.stop();
          stream.removeTrack(track);
        }
      });
    };

    if (localStream) {
      stopAndRemoveTracks(localStream);
      setLocalStream(null);
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = null;
      }
    }

    if (remoteStream) {
      stopAndRemoveTracks(remoteStream);
      setRemoteStream(null);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }

    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }

    setIsCalling(false);
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

  useEffect(() => {
    let unsubscribe = () => {};

    if (callId) {
      const callDocRef = doc(firestore, 'calls', callId);
      unsubscribe = onSnapshot(callDocRef, () => {});
    }

    return unsubscribe;
  }, [callId]);

  return (
    <main className="px-[100px] pt-[100px] bg4 background-style bg-background">
      <div className="max-w-[1240px] mx-auto">
        <Header />
        <div className="flex justify-between space-x-[24px] max-h-[761px]">
          <div className="relative w-full max-w-[904px] h-full ">
            <VideoDisplay
              webcamVideoRef={webcamVideoRef}
              remoteVideoRef={remoteVideoRef}
              recordTimer={formattedTimer}
            />

            <div className="flex items-center justify-around bg-background-second relative rounded-b-2xl">
              <Controls
                isCalling={isCalling}
                isMuted={isMuted}
                handleMute={handleMute}
                handleRecord={handleRecord}
                handleVideoToggle={handleVideoToggle}
              />

              {isJoinCall && !isCalling && (
                <JoinCallLayout
                  callId={callId}
                  onChangeCallId={setCallId}
                  onAnswerCall={answerCall}
                  onChangeIsJoin={setIsJoinCall}
                  onChangeIsCalling={setIsCalling}
                />
              )}
              {!isJoinCall && !isCalling && (
                <div className="flex justify-end space-x-2 items-center">
                  <CallButton
                    isCalling={isCalling}
                    handleCall={isCalling ? handleEndCall : createCall}
                  />
                  <p className="text-themetext font-bold text-[18px]">or</p>
                  <button
                    onClick={() => setIsJoinCall(true)}
                    className="font-bold text-white rounded-lg shadow py-[14px] px-[20px] right-4 bg-primary btn_green_hover"
                  >
                    Join call
                  </button>
                </div>
              )}

              {!isJoinCall && isCalling && (
                <CallButton
                  isCalling={isCalling}
                  handleCall={isCalling ? handleEndCall : createCall}
                />
              )}
            </div>
          </div>
          <ChatSection />
        </div>
      </div>
    </main>
  );
};

export default VideoCall;
