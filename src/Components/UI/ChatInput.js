import React from 'react';
import { Input, ChatContainer } from './style';
import Corporateemployee from '../../Illustration/Corporateemployee.svg';
import File from '../../Illustration/File.svg';
import Camera from '../../Illustration/Icon/Web/Action/Camera.svg';
import Image from '../../Illustration/Icon/Web/Action/Image.svg';
import Smile from '../../Illustration/Icon/Web/Action/Smile.svg';

const ChatInput = ({
  placeholder, name, iconSearch, ...props
}) => (
  <ChatContainer>
    <Input
      type="text"
      name={name}
      placeholder={placeholder}
      {...props}
    />
    {/* <ul>
      <img src={Smile} />
      <img src={Camera} />
      <img src={Image} />
      <img src={File} />
      <img src={Corporateemployee} />
    </ul> */}

  </ChatContainer>
);

export default ChatInput;
