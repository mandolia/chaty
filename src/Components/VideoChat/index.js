import React, { useRef, useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as Style from './style';
import { sendOfferCall, sendAnswerCall, } from '../../WebRTC'
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import MuteVideo from '../../Illustration/muteicon@3x.svg';
import CallVideo from '../../Illustration/receivevideocallicon.svg';
import ProfilButton from '../UI/ProfilButton';
import receivevideocallicon from '../../Illustration/receivevideocallicon.svg';
import silenticon from '../../Illustration/silenticon.svg';
import endreceiveaudiocallicons from '../../Illustration/volumeicon.svg';
import jhon from '../../Illustration/Henry.png'
import 'webrtc-adapter'
import { formatTime } from '../../helpers'
import firebase from 'firebase';
import useVideoRoom from '../../hooks/useVideoRoom'
import useTimer from '../../hooks/useTimer'
import useUserName from '../../hooks/useUserName'

const roomsRef = firestoreFirebase.collection('/rooms');
const usersRef = firestoreFirebase.collection('/users');

const VideoChat = (props) => {

  const {
    doVideoOffer,
    doCandidate,
    roomMetadata,
    videoStep,
    doAnswer,
    me,
    leaveRoom,

  } = props;

  const remoteVideoRef = useRef(null);
  const { timer, handleStart, handleReset } = useTimer();
  const [mute, setMute] = useState(false);
  const [displayVideo, setDisplayVideo] = useState(true);
  const [localconnection, localstream, localVideoRef] = useVideoRoom(videoStep, true);
  const [userName1] = useUserName(roomMetadata.participants.filter(e => e !== me.id)[0])

  const [displayVideoScreen, setDisplayVideoScreen] = useState(false);

  // Listening on Room with id === paricitpant.id
  const RoomQuery = roomsRef
    .where(firebase.firestore.FieldPath.documentId(), "==", roomMetadata.id);
  const [snapshot1, loading1, error1] = useCollectionData(RoomQuery, { idField: 'id' });

  // Listening on updating my candidate field.
  const UserQuery = usersRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==",
      roomMetadata.participants.filter(e => e === me.id)[0]);
  const [snapshot2, loading2, error2] = useCollectionData(UserQuery, { idField: 'id' });


  // Caller Receive Answer.
  useEffect(() => {
    if (!loading1 && snapshot1[0].video.type === 'answer' && snapshot1[0].video.from !== me.id) {
      async function StartingCall() {
        const answer = JSON.parse(snapshot1[0].video.answer)
        await localconnection.setRemoteDescription(answer);
      }
      StartingCall()
    }
  }, [loading1, snapshot1])

  // Setting candidate Data after filling remoteDescription value.
  useEffect(() => {
    if (!loading2 &&
      !loading1 &&
      snapshot1[0].video.type === 'answer' &&
      snapshot2[0].video.type === 'candidate' &&
      localconnection.remoteDescription !== null
    ) {
      // apply the new received candidate to the connection
      async function addCandidateCall() {
        const candidate = JSON.parse(snapshot2[0].video.candidate)
        await localconnection.addIceCandidate(new RTCIceCandidate(candidate))
        setDisplayVideoScreen(true);
        handleStart();
      }
      addCandidateCall()
    }
  }, [loading1, loading2, snapshot1, snapshot2]);

  useEffect(() => {
    if (!loading1 &&
      snapshot1[0].video.type === 'leave'
    ) {
      leaveRoom(me.id,
        roomMetadata.participants.filter(e => e !== me.id),
        roomMetadata.id, localconnection, localstream, localVideoRef,
        displayVideoScreen, setDisplayVideoScreen, handleReset, timer, 'video', roomMetadata)
    }

  }, [loading1, snapshot1]);

  const renderCallComponent = () => {
    return <div>
      {!loading1 && snapshot1[0].video.type === 'offer' && snapshot1[0].video.from === me.id ?
        <ProfilButton>Waiting {userName1} Response </ProfilButton> :
        <ProfilButton onClick={() => sendOfferCall(localconnection,
          localstream,
          roomMetadata,
          me,
          remoteVideoRef,
          doCandidate,
          doVideoOffer,3,'video')}>
          Call {userName1}
        </ProfilButton>
      }
    </div>
  }

  const renderAnswerComponent = () => {
    return <div>
      <ProfilButton onClick={() => sendAnswerCall(localconnection,
        localstream,
        roomMetadata,
        snapshot1[0],
        me,
        remoteVideoRef,
        doCandidate,
        doAnswer,
        'video'
      )}>Accept</ProfilButton>
      <ProfilButton onClick={() => leaveRoom(me.id,
        roomMetadata.participants.filter(e => e !== me.id),
        roomMetadata.id, localconnection, localstream, localVideoRef,
        true, setDisplayVideoScreen, handleReset, timer, 'video', roomMetadata)} >Decline</ProfilButton>
    </div>
  }


  const renderTwoVideoScreen = () => <div id="screenShare"><video
    className="videoInsert"
    muted={mute}
    ref={remoteVideoRef}
    autoPlay
    playsInline>
  </video>
    <div id="top">
      <div><h1>{formatTime(timer)}</h1></div>
      <video
        className="video" muted ref={localVideoRef} autoPlay playsInline>
      </video>
    </div>
    <div id="bottom">
      {mute ? <img alt="silent" onClick={() => setMute(!mute)} src={silenticon} /> :
        <img alt="silent" onClick={() => setMute(!mute)} src={endreceiveaudiocallicons} />
      }
      <ProfilButton
        onClick={() => {
          leaveRoom(me.id,
            roomMetadata.participants.filter(e => e !== me.id),
            roomMetadata.id, localconnection, localstream, localVideoRef,
            displayVideoScreen, setDisplayVideoScreen, handleReset, timer, 'video', roomMetadata);

        }}>End Call</ProfilButton>

      {displayVideo ? <img onClick={() => console.log('video')}
        alt="MuteVideo"
        src={CallVideo} /> :
        <img
          alt="silent"
          src={MuteVideo}
        />
      }
    </div>
  </div>


  const handleVideoChat = () => {

    return <>
      <div id="requestStep">
        <img src={jhon} alt="profil" id="profil" />
        <video id="profil"
          style={{ display: 'none' }}
          muted ref={localVideoRef} autoPlay playsInline></video>
        <video ref={remoteVideoRef}
          style={{ display: 'none' }}
          autoPlay
          playsInline>
        </video>
        <img alt="img" src={receivevideocallicon} />
        {
          loading1 ? <h2>loading1..</h2> :
            (snapshot1[0].video.from === '' || snapshot1[0].video.from === me.id) ?
              renderCallComponent() :
              renderAnswerComponent()}
      </div>
      {renderTwoVideoScreen()}
    </>


  };

  return (
    <Style.Wrapper display={displayVideoScreen}>
      {handleVideoChat()}
    </Style.Wrapper>
  );
};

export default VideoChat;
