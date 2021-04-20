import React, { useEffect, useCallback } from 'react';
import firebase from 'firebase';
import ChatButton from '../../../Components/UI/chatButton';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as Style from './style';
import Jolie from '../../../Illustration/Henry.png';
import Input from '../../../Components/UI/AuthInput';
import BodyContainer from '../../../Common/Body'
import {
  SendMessage,
  GetRoomMetaData,
  readMessage,
  clearMessages,
} from '../../../store/WebChat/action'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'webrtc-adapter';
import ChatScreen from '../../../Components/ChatScreen';
import { firestoreFirebase } from '../../../firebaseService/FirebaseIndex';
import { ChangeChatDuration } from '../../../store/TeamChat/action';
import { fetchMyData } from '../../../store/Me/action';
import { blockGroup } from '../../../store/GroupChat/action';

const messagesRef = firestoreFirebase.collection('/messages');

const ChatOnline = (props) => {
  const {
    SendMessage,
    fetchMyData,
    readMessage,
    GetRoomMetaData,
    clearMessages,
    blockGroup
  } = props;

  const roomLoading = useSelector((state) => state.WebChatReducer.roomLoading)
  const roomMetadata = useSelector((state) => state.WebChatReducer.room)
  const me = useSelector((state) => state.MeReducer.Me)

  const dispatch = useDispatch();

  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  useEffect(() => {
    fetchMyDataCall()
  }, [fetchMyDataCall]);

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

  return (
    roomLoading ? <h1>Loading ..</h1> : <Style.Wrapper as={BodyContainer}>
      <Style.LeftContainer>
        <div id="image">
          <img alt="profil" src={Jolie} />
        </div>
        <Input type="text" name="name" disabled value={roomMetadata.name} />
        <Input type="text" disabled value={`Members ${roomMetadata.participants.length}`} name="function" />
        <div id="button">
          <ChatButton onClick={() => clearMessages(roomMetadata)} icon="clear" border="#000" color="#fff" text="#000">Clear Chat</ChatButton>
          <ChatButton
            onClick={() => blockGroup(roomMetadata.id)}
            icon="block"
            border="#000"
            color="#fff"
            text="#000">
            Block
             </ChatButton>

        </div>
      </Style.LeftContainer>
      <Style.RightContainer backgroundColor={true}>

        <ChatScreen
          gradientMessage
          roomMetadata={roomMetadata}
          SendMessage={SendMessage}
          messages={Sortedmessages}
          me={me}
          readMessage={readMessage}
          loading={loading}
        />
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
    readMessage,
    clearMessages,
    blockGroup
  })(ChatOnline);

