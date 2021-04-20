import React, { useEffect, useState, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { useList } from "react-firebase-hooks/database";
import * as Style from './style';
import Jolie from '../../Illustration/Henry.png';
import Input from '../../Components/UI/AuthInput';
import BodyContainer from '../../Common/Body';
import { SendMessage, GetRoomMetaData, readMessage } from '../../store/WebChat/action'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'webrtc-adapter';
import ChatScreen from '../../Components/ChatScreen';
import { firestoreFirebase, firebaseDatabase } from '../../firebaseService/FirebaseIndex';
import useTimer from '../../hooks/useTimer'
import { ChangeChatDuration } from '../../store/TeamChat/action';
import useTimerCountDown from '../../hooks/useTimerCountDown';
import { fetchMyData } from '../../store/Me/action';
import useUserName from '../../hooks/useUserName';
import usePrevious from '../../hooks/usePrevious';

const messagesRef = firestoreFirebase.collection('/messages');

const ChatOnline = (props) => {
  const { SendMessage, fetchMyData,
    readMessage, GetRoomMetaData, ChangeChatDuration } = props;
  const { timer, handleStart } = useTimer();
  const roomLoading = useSelector((state) => state.WebChatReducer.roomLoading)
  const roomMetadata = useSelector((state) => state.WebChatReducer.room)
  const me = useSelector((state) => state.MeReducer.Me)
  const [fixedDuration, setfixedDuration] = useState("0h:00min");
  const [leftTime] = useTimerCountDown(timer, fixedDuration);
  const CallingUser = !roomLoading && roomMetadata.participants.filter(e => e !== me.id)[0];
  const [connected, setConnectStatus] = useState(false);
  const [snapshots, loading2, error2] = useList(firebaseDatabase.ref(`/online`));
  const [userName] = useUserName(CallingUser)
  const PreviousConnected = usePrevious(connected);
  const dispatch = useDispatch();

  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  useEffect(() => {
    fetchMyDataCall()
  }, [fetchMyDataCall]);

  useEffect(() => {
    if (!loading2) {
      setConnectStatus(false)
      snapshots.forEach((childSnapshot) => {
        childSnapshot.key === CallingUser && setConnectStatus(childSnapshot.val())
      })
    }
  }, [CallingUser, loading2, snapshots])

  const query = messagesRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==", props.match.params.id)

  const [snapshot, loading, error] = useCollectionData(query, { idField: 'id' });

  const entries = !loading && snapshot[0] !== undefined ? Object.entries(snapshot[0]) : [];

  const Filtermessages = !loading && entries.filter(message => {
    return typeof message[1] === 'object'
  })

  const messages = !loading && Filtermessages.map(message => {
    return { id: message[0], ...message[1] }
  })

  const Sortedmessages = !loading && messages.sort((a, b) => a.createdAt - b.createdAt)


  useEffect(() => {
    GetRoomMetaData(props.match.params.id)
  }, [GetRoomMetaData, props.match.params.id])

  useEffect(() => {

    if (connected) {
      if (!roomLoading) {
        handleStart();
        me.teamChatContact && me.teamChatContact.every((contact => {
          if (contact.contactId === roomMetadata.participants.filter(e => e !== me.id)[0]) {
            setfixedDuration(contact.duration)
          }
        }))
      }
    }
    function EndChat() {
      if (!roomLoading && (connected || PreviousConnected)) {
        ChangeChatDuration(leftTime, roomMetadata.participants.filter(e => e !== me.id)[0], fixedDuration)
      }
    }
    return () => EndChat()
  }, [timer, connected, roomLoading, me]);

  return (
    loading2 ? <h1>Loading </h1> :
      <Style.Wrapper as={BodyContainer}>
        <Style.LeftContainer>
          <div id="image">
            <img alt="profil" src={Jolie} />
          </div>
          <div id="spanConnected">
            <Input
              type="text"
              name="name"
              disabled
              value={userName}
              icon="blackcontact"
              placeholder="Full name"
            />
            <Style.Connected connected={connected} />
          </div>
          <Input type="text" disabled value='Developer' name="function" icon="success" placeholder="Developers" />

        </Style.LeftContainer>
        <Style.RightContainer backgroundColor={true}>
          {roomLoading ? <h1>Loading ..</h1> :
            <ChatScreen
              roomMetadata={roomMetadata}
              SendMessage={SendMessage}
              messages={Sortedmessages}
              me={me}
              readMessage={readMessage}
              loading={loading}
            />}
        </Style.RightContainer>
      </Style.Wrapper>
  );
};

export default connect(null,
  {
    GetRoomMetaData,
    SendMessage,
    ChangeChatDuration,
    fetchMyData,
    readMessage
  })(ChatOnline);

