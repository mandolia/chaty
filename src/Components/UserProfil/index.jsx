import React from "react";
import * as Style from "./style";
import Bitmap from "../../Illustration/Bitmap.png";
import ProfilInput from "../UI/ProfilInput";
import ProfilButton from "../UI/ProfilButton";

const Profil = (props) => {
  const { userProfil, blockContact, unBlockContact, me } = props;

  return (
    <>
      <h1>Profil</h1>
      <Style.Wrapper>
        <Style.Hero>
          {userProfil.avatar ? (
            <img alt="Bitmap" src={userProfil.avatar} />
          ) : (
            <img alt="Bitmap" src={Bitmap} />
          )}
          <Style.InputInfo>
            <div id="ProfilInfo">
              <ProfilInput
                label="Name"
                value={userProfil.name}
                placeholder="Sandip Dave"
              />
              <ProfilInput
                value={userProfil.mobile}
                label="Number"
                placeholder="+91 (942) 900 0062"
              />
            </div>
            <ProfilInput
              value={userProfil.status}
              label="Status"
              placeholder="Life is Hell to waste some time with Lazy Peoples."
            />
          </Style.InputInfo>
        </Style.Hero>
      </Style.Wrapper>
      <Style.ButtonContainer>
        {me.blockedUsers.includes(userProfil.id) ? (
          <ProfilButton onClick={() => unBlockContact(userProfil.id)}>
            UnBlock
          </ProfilButton>
        ) : (
          <ProfilButton onClick={() => blockContact(userProfil.id)}>
            Block
          </ProfilButton>
        )}
        <ProfilButton>Clear Chat</ProfilButton>
      </Style.ButtonContainer>
    </>
  );
};

export default Profil;
