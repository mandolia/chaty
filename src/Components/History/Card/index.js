import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Style from "./style";
import ChatIcon from "../../../Illustration/Chat.svg";
import AudioCall from "../../../Illustration/AudioCall.svg";
import More from "../../../Illustration/More.svg";
import Stroke from "../../../Illustration/Stroke.svg";
import ChatActive from "../../../Illustration/Icon/Active/Chat.svg";
import VideoActive from "../../../Illustration/Icon/Active/VideoCall.svg";
import AudioActive from "../../../Illustration/Icon/Active/AudioCall.svg";
import { formatTime } from "../../../helpers";
import Joli from "../../../Illustration/Joli.png";
import historyicon from "../../../Illustration/historyicon.svg";
import blockicon from "../../../Illustration/blockicon.svg";
import clearicon from "../../../Illustration/clearicon.svg";
import deleteicon from "../../../Illustration/deleteicon.svg";

const Card = (props) => {
  const {
    userData,
    audio,
    video,
    chat,
    goToPrivateRoom,
    roomId,
    userId,
    blockContact,
    ClearHistory,
    DeleteHistory,
  } = props;

  const [toggle, setToggle] = useState(false);
  const history = useHistory();
  return (
    <Style.Wrapper>
      <Style.CardContainer>
        <img
          className="profil"
          alt="profil"
          src={userData.avatar ? userData.avatar : Joli}
        />
        <Style.Description>
          <Style.PersonalInfo>
            <h1>{userData.name}</h1>
            <span>{userData.detail}</span>
          </Style.PersonalInfo>
          <Style.IconContainer>
            <div>
              <img
                src={chat ? ChatActive : ChatIcon}
                alt="chatIcon"
                onClick={() => goToPrivateRoom(roomId)}
              />
              <span>{chat && formatTime(chat)}</span>
            </div>
            <div>
              <img
                src={audio ? AudioActive : AudioCall}
                alt="audioIcon"
                onClick={() => goToPrivateRoom(roomId)}
              />
              <span>{audio && formatTime(audio)}</span>
            </div>
            <div>
              <img
                src={video ? VideoActive : Stroke}
                alt="stroke"
                onClick={() => goToPrivateRoom(roomId)}
              />
              <span>{video && formatTime(video)}</span>
            </div>
            <div onClick={() => setToggle(!toggle)}>
              <img alt="more" src={More} />
              {toggle && (
                <Style.MoreContainer>
                  <li onClick={() => blockContact(userId)}>
                    <img alt="block" src={blockicon} /> Block
                  </li>
                  <li onClick={() => ClearHistory(roomId)}>
                    <img alt="clear" src={clearicon} /> Clear
                  </li>
                  <li onClick={() => DeleteHistory(roomId)}>
                    <img alt="delete" src={deleteicon} />
                    Delete
                  </li>
                  <li onClick={() => history.push(`/historyCalls/${roomId}/${userId}`)}>
                    <img alt="history" src={historyicon} /> Call History
                  </li>
                </Style.MoreContainer>
              )}
            </div>
          </Style.IconContainer>
        </Style.Description>
      </Style.CardContainer>
    </Style.Wrapper>
  );
};

export default Card;
