import React from 'react';
import * as Style from './CardStyle';
import ChatIcon from '../../../Illustration/Chat.svg';

const Card = (props) => {
    const {
        id,
        goToGroupDetail,
        picture,
        name,
        detail = "Working on iOS 13",
        goToPrivateRoom
    } = props;

    return (
        <Style.Wrapper>
            <Style.CardContainer>
                <div onClick={() => goToGroupDetail(id)} id="img">
                    <img alt="profil" className="profil" src={picture} />
                </div>
                <Style.Description>
                    <Style.PersonalInfo>
                        <h1>{name}</h1>
                        <span>{detail}</span>
                    </Style.PersonalInfo>
                    <Style.IconContainer>
                        <div onClick={() => goToPrivateRoom(id)}>
                            <img alt="chat" src={ChatIcon} />
                        </div>
                    </Style.IconContainer>
                </Style.Description>
            </Style.CardContainer>
        </Style.Wrapper>
    );
};

export default Card;