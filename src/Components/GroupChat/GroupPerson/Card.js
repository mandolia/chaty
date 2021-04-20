import React, { useState } from 'react';
import * as Style from './CardStyle';
import ChatIcon from '../../../Illustration/Chat.svg';
import AudioCall from '../../../Illustration/AudioCall.svg';
import More from '../../../Illustration/More.svg';
import Stroke from '../../../Illustration/Stroke.svg';
import Joli from '../../../Illustration/Joli.png';
import Delete from '../../../Illustration/deleteicon.svg';
import ExitGroup from '../../../Illustration/ExitGroup.svg';
import Add from '../../../Illustration/Add.svg';

const Card = (props) => {
  const {
    picture,
    name,
    detail,
    PictureView,
    friends,
    me,
    id,
    groupMetaData,
    exitGroup,
    addAdminToGroup,
    deleteMemberFromGroup
  } = props;

  const [toggle, setToggle] = useState(false);

  return (
    <Style.Wrapper>
      <Style.CardContainer>
        {PictureView === "everybody" ? <img alt="profil" className="profil" src={picture} /> :
          friends.includes(me.id) ? <img alt="profil" className="profil" src={Joli} /> : null
        }
        <Style.Description>
          <Style.PersonalInfo>
            <h1>{name}</h1>
            <span>{detail}</span>
          </Style.PersonalInfo>
          <Style.IconContainer>
            <div>
              <img alt="chat" src={ChatIcon} />
            </div>
            <div>
              <img alt="audio" src={AudioCall} />
            </div>
            <div>
              <img alt="stroke" src={Stroke} />
            </div>
            <div>
              <img alt="more" src={More} onClick={() => setToggle(!toggle)} />
              {toggle && (
                <ul>
                  {groupMetaData.admin.includes(id) ? <li>Admin</li> :
                    <li id="addAdmin" onClick={() => addAdminToGroup(groupMetaData.id, id)}><img src={Add} alt="add" />Admin</li>}

                  {groupMetaData.admin.includes(me.id) &&
                    id !== me.id &&
                    < li onClick={() => deleteMemberFromGroup(groupMetaData.id, id)}><img alt="delete"
                      src={Delete} />
                      <span>Delete</span>  </li>}

                  {me.id === id && <li onClick={() => exitGroup(groupMetaData.id)}><img alt="delete" src={ExitGroup} />
                    <span>Exit Group</span>  </li>}
                </ul>
              )}

            </div>
          </Style.IconContainer>
        </Style.Description>
      </Style.CardContainer>
    </Style.Wrapper >
  );
};
export default React.memo(Card);
