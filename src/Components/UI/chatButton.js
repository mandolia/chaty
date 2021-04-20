import React from 'react';
import * as Style from './style';
import video from '../../Illustration/Icon/Web/Regular/VideoCall.svg';
import chat from '../../Illustration/Icon/Web/Regular/Chat.svg';
import audio from '../../Illustration/Icon/Web/Regular/AudioCall.svg';
import block from '../../Illustration/Icon/Web/Action/Block.svg';
import clear from '../../Illustration/Icon/Web/Action/Clear.svg';
import audioWhite from '../../Illustration/Icon/Web/Regular/AudioWhite.svg';
import videoWhite from '../../Illustration/Icon/Web/Regular/VideoWhite.svg';
import chatWhite from '../../Illustration/Icon/Web/Regular/ChatWhite.svg';

const ChatButton = ({
  color, icon, border, children, ...props
}) => {
  const IconHandler = () => {
    switch (icon) {
      case 'chat':
        return <img className="Icon" src={chat} />;
      case 'audio':
        return <img className="Icon" src={audio} />;
      case 'block':
        return <img className="Icon" src={block} />;
      case 'clear':
        return <img className="Icon" src={clear} />;
      case 'video':
        return <img className="Icon" src={video} />;
      case 'audioWhite':
        return <img className="Icon" src={audioWhite} />;
      case 'videoWhite':
        return <img className="Icon" src={videoWhite} />;
      case 'chatWhite':
        return <img className="Icon" src={chatWhite} />;
    }
  };
  return (

    <Style.ChatButton textColor={props.text} color={color} borderColor={border} {...props}>
      <button {...props}>
        {IconHandler()}
        {children}
      </button>


    </Style.ChatButton>

  );
};

export default ChatButton;
