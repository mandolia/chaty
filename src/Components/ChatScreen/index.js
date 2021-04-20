import React, { useEffect, useState, useCallback, useRef } from 'react';
 import { firebaseDatabase } from '../../firebaseService/FirebaseIndex';
 import { useList } from "react-firebase-hooks/database";
import * as Style from './style';
import FooterButton from '../UI/FooterButton';
import ChatInput from '../UI/ChatInput';
import Quote from './Words';
import Jolie from '../../Illustration/Joli.png';
import Jhon from '../../Illustration/Martin.png';
import { getUserNameById } from '../../helpers'
import useTimer from '../../hooks/useTimer';
import usePrevious from '../../hooks/usePrevious';
 
 
const ChatScreen = (props) => {
  const {
    gradientMessage,
    roomMetadata,
    SendMessage,
    messages,
    loading,
    readMessage,
    addHistory,
    me ,
    deleteMessage
  } = props;

  const [content, setContent] = useState('');
  const [name, setName] = useState([]);
  const { timer, handleStart } = useTimer();
  const [connected, setConnectStatus] = useState(false);
  const [snapshots, loading2, error2] = useList(firebaseDatabase.ref(`/online`));
  const PreviousConnected = usePrevious(connected);

 

  useEffect(() => {
    if (!loading2) {
      const TargetUer = roomMetadata.participants.filter(e => e !== me.id)[0];
      setConnectStatus(false)
      snapshots.forEach((childSnapshot) => setConnectStatus(childSnapshot.key === TargetUer)
      )
    }
  }, [loading2, snapshots])

  useEffect(() => {

    if (connected &!roomMetadata.temporary) {
      handleStart();
    }

    function EndChat() {
      if ((connected || PreviousConnected) && !roomMetadata.temporary) {
        addHistory(roomMetadata, 'chat', timer)
      }
    }
    return () => EndChat()
  }, [timer, connected, me]);

  const dummy = useRef();

  const onFocus = () => {
    readMessage(roomMetadata)
  };
  const onBlur = () => { };

  const getMyName = useCallback(
    (id) => {
      getUserNameById(id).then(res => setName((name) => [...name, {
        id,
        name: res
      }]))
    }, []
  );
  // root app adding teamchat route..
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])


  useEffect(() => {
    roomMetadata.participants.map(e => getMyName(e))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    SendMessage({
      content,
      room: roomMetadata.id,

    })
    setContent('');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const date = new Date();

  return (
    <Style.RightSide>
      <Style.CrossWrapper>
        {!loading ? messages.map((metaData) => {
          return metaData.userId === me.id ? <Quote
            key={metaData.id}
            id={metaData.id}
            sender
            roomId={roomMetadata.id}
            deleteMessage={deleteMessage}
            read={metaData.read}
            avatar={Jolie}
            time={metaData.createdAt === null ? date : metaData.createdAt.toDate()}
            name={me.name}
            text={metaData.text}
          /> :
            <Quote
              key={metaData.id}
              id={metaData.id}
              roomId={roomMetadata.id}
              read
              deleteMessage={deleteMessage}
              avatar={Jhon}
              gradientMessage={gradientMessage}
              time={metaData.createdAt !== undefined && metaData.createdAt.toDate()}
              name={name.map(x => metaData.userId === x.id && x.name)}
              text={metaData.text}
            />

        }) : <h1>Loading</h1>}
        <span ref={dummy}></span>
      </Style.CrossWrapper>
      <Style.Footer>
        <form onSubmit={handleSubmit}>
        <ChatInput onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          name="chat"
          placeholder="Type here…"
          value={content} />
        <FooterButton type="submit"  >Send</FooterButton>
        </form>
      </Style.Footer>
    </Style.RightSide>
  );
};

export default React.memo(ChatScreen);
