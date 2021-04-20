import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Style from './CardStyle';
import ChatIcon from '../../../Illustration/Chat.svg';
import AudioCall from '../../../Illustration/AudioCall.svg';
import More from '../../../Illustration/More.svg';
import Stroke from '../../../Illustration/Stroke.svg';
import Success from '../../../Illustration/Success.svg';
import Joli from '../../../Illustration/Joli.png';

const Card = (props) => {
  const {
    picture,
    name,
    detail,
    id,
    selectGroupPerson,
    removeGroupPerson,
    GroupPerson,
    friends,
    PictureView,
    me
  } = props;

  const historyLocation = useHistory();
  const [toggle, setToggle] = useState(false);
  const HandleVideo = () => {
    historyLocation.push({
      pathname: '/alert',
      state: 3,
    });
  };

  const HandleAudio = () => {
    historyLocation.push({
      pathname: '/alert',
      state: 2,
    });
  };

  const HandleChat = () => {
    historyLocation.push({
      pathname: '/alert',
      state: 1,
    });
  };

  const handleSelectedCard = () => {
    if (GroupPerson.includes(id)) {
      return true;
    }
  };

  return (
    <Style.Wrapper>
      <Style.CardContainer selectImg={handleSelectedCard()}>
        <div id="img">
          {!handleSelectedCard()
            ? PictureView === "everybody" ? <img alt="profil" onClick={() => selectGroupPerson(id)} className="profil" src={picture} /> :
              friends.includes(me.id) ? <img alt="profil" onClick={() => selectGroupPerson(id)} className="profil" src={Joli} /> : null

            : (
              <>
                {
                  PictureView === "everybody" ? <img alt="profil" onClick={() => removeGroupPerson(id)} className="profil" src={picture} /> :
                    friends.includes(me.id) ? <img alt="profil" onClick={() => removeGroupPerson(id)} className="profil" src={Joli} /> : null}
                <img alt="icon" onClick={() => removeGroupPerson(id)} className="icon" src={Success} />
              </>
            )}
        </div>
        <Style.Description>
          <Style.PersonalInfo>
            <h1>{name}</h1>
            <span>{detail}</span>
          </Style.PersonalInfo>
          <Style.IconContainer>
            <div>
              <img alt="chat" src={ChatIcon} onClick={() => HandleChat()} />
            </div>
            <div>
              <img alt="audio" src={AudioCall} onClick={() => HandleAudio()} />
            </div>
            <div>
              <img alt="stroke" src={Stroke} onClick={() => HandleVideo()} />
            </div>
            <div>
              <img alt="more" src={More} onClick={() => setToggle(!toggle)} />
              {toggle && (
                <ul>
                  <li>Admin</li>
                  <li>Delete</li>
                  <li>Exit Group</li>
                </ul>
              )}

            </div>
          </Style.IconContainer>
        </Style.Description>
      </Style.CardContainer>
    </Style.Wrapper>
  );
};
export default Card;
