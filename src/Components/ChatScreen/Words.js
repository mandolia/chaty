import React from 'react';
import * as Style from './style';
import Ellipse14 from '../../Illustration/Clock.svg';
import Truch from '../../Illustration/Icon/Web/Action/Group35.svg';
import chatbubble from '../../Illustration/chatbubble.svg';
import Moment from 'react-moment';
const Quote = ({
  sender, img, time,roomId, name,deleteMessage, id,text, gradientMessage, avatar, read
}) => {

  return <Style.QuoteWrapper gradientMessage={gradientMessage} read={read} sender={sender}>
    <img id="avatar" alt="avatar" src={avatar} />
    <div>
      <div id="info">
        <h1>{name}</h1>
        <img alt="img" src={Ellipse14} />
        <p>{<Moment format='MMMM Do YYYY, h:mm:ss a'>{time}</Moment>}</p>
      </div>
      <div id="messageWrapper">
        {img ? <img id="asset" alt="asset" src={chatbubble} /> : <></>}
        <div id="messageContainer">
          <div id="message">
            <p>{text}</p>
          </div>
          <img onClick={()=>deleteMessage(id,roomId)} alt="Truch" src={Truch} />
        </div>
      </div>
    </div>
  </Style.QuoteWrapper>
};

export default Quote;
