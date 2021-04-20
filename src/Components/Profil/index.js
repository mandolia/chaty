import React, { useState, useRef } from "react";
import * as Style from "./style";
import Bitmap from "../../Illustration/Bitmap.png";
import ProfilInput from "../UI/ProfilInput";
import ProfilButton from "../UI/ProfilButton";
import ProfilSelector from "../UI/ProfilSelector";
import ProfilFooter from "./ProfilFooter";

const Profil = (props) => {
  const { me, editProfil, LoadingAvatar, avatarFaild, saveAvatar } = props;

  const TreeOptions = [
    { value: "onlyme ", label: "Only me" },
    { value: "friends", label: "Friends" },
    { value: "everybody", label: "Every Body" },
  ];

  const TwoOptions = [
    { value: "friends", label: " Friends" },
    { value: "everybody", label: "Every Body" },
  ];

  const BooelanOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const [name, setName] = useState(me.name);
  const [number, setNumber] = useState(me.mobile);
  const [status, setStatus] = useState(me.status);
  const [profilPicture, setProfilPicture] = useState({
    value: me.PictureView,
    label: me.PictureView,
  });
  const [profilView, setProfilView] = useState(
    me.profilView
      ? { value: "yes", label: "Yes" }
      : { value: "no", label: "No" }
  );
  const [privateChat, setPrivateChat] = useState(
    me.privateChat
      ? { value: "yes", label: "Yes" }
      : { value: "no", label: "No" }
  );
  const [onlineStatus, setOnlineStatus] = useState({
    value: me.onlineStatus,
    label: me.onlineStatus,
  });
  const [Picture, setPicture] = useState("");
  const inputEl = useRef(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setPicture(image);
    }
  };

  const handleEdit = () => {
    editProfil(
      name,
      number,
      status,
      profilPicture,
      profilView,
      privateChat,
      onlineStatus
    );
  };

  return (
    <Style.Wrapper>
      <h1>Profil</h1>
      <Style.Hero>
        <input ref={inputEl} type="file" onChange={handleChange} id="file" />
        {LoadingAvatar ? (
          <h1>Loading ...</h1>
        ) : me.avatar ? (
          <img alt="Bitmap" src={me.avatar} />
        ) : Picture ? (
          <h1>{Picture.name} </h1>
        ) : (
          <img alt="Bitmap" src={Bitmap} />
        )}
        {avatarFaild ? <span>{avatarFaild}</span> : null}
        <Style.InputInfo>
          <div id="ProfilInfo">
            <ProfilInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sandip Dave"
            />
            <ProfilInput
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Number"
              placeholder="+91 (942) 900 0062"
            />
          </div>
          <ProfilInput
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            placeholder="Life is Hell to waste some time with Lazy Peoples."
          />
          <Style.ButtonContainer>
            <ProfilButton onClick={() => saveAvatar(Picture)}>
              Save Picture
            </ProfilButton>
            <ProfilButton onClick={() => handleEdit()}>Edit</ProfilButton>
          </Style.ButtonContainer>
        </Style.InputInfo>
      </Style.Hero>
      <Style.Setting>
        <h2>SETTINGS</h2>
        <div style={{ width: "360px" }}>
          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="gmail"
            options={TwoOptions}
            label="Sync Contact"
          />
        </div>
        <h3>Privacy and Security</h3>
        <Style.Privacy>
          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="everybody"
            onChange={(e) => console.log(e)}
            options={TreeOptions}
            label="Last Status"
          />

          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="Only Friend"
            options={TwoOptions}
            onChange={(e) => setProfilPicture(e)}
            value={profilPicture}
            label="Profile Picture"
          />

          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            value={onlineStatus}
            onChange={(e) => setOnlineStatus(e)}
            placeholder="Friends"
            options={TwoOptions}
            label="Online Status"
          />

          <ProfilInput
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="5 Contacts"
            value={`${me.blockedUsers.length} Contacts`}
            label="Block Contacts"
          />

          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="Yes"
            value={privateChat}
            onChange={(e) => setPrivateChat(e)}
            options={BooelanOptions}
            label="Private Chat "
          />

          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px solid #4A4A4A"
            placeholder="Yes"
            value={profilView}
            onChange={(e) => setProfilView(e)}
            options={BooelanOptions}
            label="Profile view "
          />
        </Style.Privacy>
        <h3>Notification</h3>
        <Style.Notification>
          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px 
            solid #4A4A4A"
            placeholder="No"
            options={BooelanOptions}
            label="Message Preview"
            onChange={(e) => console.log(e)}
          />

          <ProfilSelector
            width="350px"
            border="none"
            borderBottom="2px 
            solid #4A4A4A"
            placeholder="No"
            options={BooelanOptions}
            label="Sounds"
            onChange={(e) => console.log(e)}
          />
        </Style.Notification>
        <ProfilFooter />
      </Style.Setting>
    </Style.Wrapper>
  );
};

export default Profil;
