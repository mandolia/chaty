import React, { useCallback, useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { useList } from "react-firebase-hooks/database";
import { useHistory } from "react-router-dom";
import { firebaseDatabase } from "../../../firebaseService/FirebaseIndex";
import * as Style from "./style";
import ChatIcon from "../../../Illustration/Chat.svg";
import AudioCall from "../../../Illustration/AudioCall.svg";
import More from "../../../Illustration/More.svg";
import Stroke from "../../../Illustration/Stroke.svg";
import OTPSucess from "../../../Illustration/SuccessOtp.svg";
import Joli from "../../../Illustration/Joli.png";
import Lock from "../../../Illustration/Lockiconwithtransparentbg.svg";
import Invite from "../../../Illustration/Invite.svg";

const Card = (props) => {
  const {
    picture,
    friends,
    name,
    status,
    index,
    id,
    showGeneratingCodeModel,
    AccepteSentRequest,
    me,
    showNotificationModel,
    sendNotificationToContact,
    MyNotification,
    sentNotificationStep,
    openNotificationModel,
    showInvitationModel,
    CancelSendRequest,
    generateSecurityCode,
    AcceptedRequest,
    confirmationCode,
    showConfirmationCode,
    requestSucceed,
    GoToPrivateRoom,
    PrivateChat,
    PictureView,
    messagesNotification,
  } = props;

  const [code, setCode] = useState();
  const [connected, setConnectStatus] = useState(false);
  const [snapshots, loading, error] = useList(firebaseDatabase.ref(`/online`));
  let history = useHistory();

  const goToProfil = (id) => {
    history.push({
      pathname: `/userProfil/${id}`,
    });
  };

  const checkNotificationType = useCallback(() => {
    if (AcceptedRequest.includes(id)) {
      showGeneratingCodeModel(index);
    } else if (MyNotification.includes(id)) {
      showInvitationModel(index);
    } else if (
      confirmationCode.filter((e) => {
        setCode(e.code);
        return e.Id === id;
      }).length > 0
    ) {
      showConfirmationCode(index);
    }
  }, [
    AcceptedRequest,
    MyNotification,
    confirmationCode,
    id,
    index,
    showConfirmationCode,
    showGeneratingCodeModel,
    showInvitationModel,
  ]);

  useEffect(() => {
    checkNotificationType();
  }, [checkNotificationType]);

  useEffect(() => {
    checkNotificationType();
  }, [checkNotificationType]);

  useEffect(() => {
    checkNotificationType();
  }, [checkNotificationType]);

  useEffect(() => {
    if (!loading) {
      setConnectStatus(false);
      snapshots.forEach((childSnapshot) => {
        childSnapshot.key === id && setConnectStatus(childSnapshot.val());
      });
    }
  }, [loading, snapshots]);

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const cancleNotificationRequest = () => CancelSendRequest(id);
  const accepteNotificationRequest = () => AccepteSentRequest(index, id);
  const insertCodeForMyRequest = () => {
    if (code === confirmPin[3]) {
      return requestSucceed(id);
    }
  };

  const OtpModelShow1 = () => (
    <Style.OTPModalContainer>
      <img alt="success" src={OTPSucess} />
      <span>Request Accepted</span>
      <p>
        Please generate password and share with
        {name} enjoy Messenger services on ENJOEE
      </p>
      <PinInput
        length={4}
        secret
        onChange={(value, i) => setPin((prev) => ({ ...prev, [i]: value }))}
        type="numeric"
        inputMode="number"
        style={{ width: "275px", height: "40px" }}
        inputStyle={{
          borderRadius: "5px",
          borderColor: "#47525D",
          height: "100%",
        }}
        inputFocusStyle={{ borderColor: "blue" }}
        autoSelect
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <Style.ButtonContainer>
        <button
          className="otp"
          onClick={() => generateSecurityCode(pin[3], id)}
        >
          Yes
        </button>
      </Style.ButtonContainer>
    </Style.OTPModalContainer>
  );

  const OtpModelShow2 = () => (
    <Style.OTPModalContainer>
      <p>
        Request accepted by
        {name}
        and generated password for you.
      </p>
      <p>enter password and enjoy messangr services on ENJOEE</p>
      <span>Password -{code}</span>
      <PinInput
        length={4}
        secret
        onChange={(value, i) =>
          setConfirmPin((prev) => ({ ...prev, [i]: value }))
        }
        type="numeric"
        inputMode="number"
        style={{ width: "275px", height: "40px" }}
        inputStyle={{
          borderRadius: "5px",
          borderColor: "#47525D",
          height: "100%",
        }}
        inputFocusStyle={{ borderColor: "blue" }}
        onComplete={(value, i) =>
          setConfirmPin((prev) => ({ ...prev, [i]: value }))
        }
        autoSelect
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <Style.ButtonContainer>
        <button className="otp" onClick={() => insertCodeForMyRequest()}>
          Yes
        </button>
      </Style.ButtonContainer>
    </Style.OTPModalContainer>
  );

  const sendNotificationRequest = () => (
    <Style.ModalContainer>
      <p>{`Would you like send chat request to ${name}.`}</p>
      <Style.ButtonContainer>
        <button className="red" onClick={() => cancleNotificationRequest(id)}>
          No
        </button>
        <button className="green" onClick={() => sendNotificationToContact(id)}>
          Yes
        </button>
      </Style.ButtonContainer>
    </Style.ModalContainer>
  );

  const receiveNotificationRequest = () => (
    <Style.ModalContainer>
      <p>{`${me.name} you received Chat request fron ${name}.`}</p>
      <Style.ButtonContainer>
        <button className="red" onClick={() => cancleNotificationRequest(id)}>
          No
        </button>
        <button className="green" onClick={() => accepteNotificationRequest()}>
          Yes
        </button>
      </Style.ButtonContainer>
    </Style.ModalContainer>
  );

  const generateCodeForNotificationRequest = () => OtpModelShow1();

  const HandleModelShow = () => {
    switch (sentNotificationStep) {
      case 1:
        return sendNotificationRequest();
      case 2:
        return receiveNotificationRequest();
      case 3:
        return generateCodeForNotificationRequest();
      case 4:
        return OtpModelShow2();
      default:
        return null;
    }
  };

  const ChatAction = () => {
    if (PrivateChat && me.friends.includes(id)) {
      GoToPrivateRoom(id);
    } else {
      if (PrivateChat && !me.friends.includes(id)) {
        showNotificationModel(index);
      } else {
        if (!PrivateChat) {
          GoToPrivateRoom(id);
        }
      }
    }
  };

  const renderProfilPicture = () => {
    if (PictureView === "everybody") {
      if (PrivateChat && me.friends.includes(id)) {
        return picture ? (
          <img
            alt="profil"
            onClick={() => goToProfil(id)}
            className="profil"
            src={picture}
          />
        ) : (
          <div className="noProfil">
            <h1>{name}</h1>
          </div>
        );
      } else {
        if (PrivateChat && !me.friends.includes(id)) {
          return picture ? (
            <div className="PrivateProfil">
              <img
                alt="profil"
                onClick={() => goToProfil(id)}
                className="lockProfil"
                src={picture}
              />
              <img alt="lock" className="lock" src={Lock} />
            </div>
          ) : (
            <div className="noProfilLock">
              <h1>{name}</h1>
            </div>
          );
        } else {
          if (!PrivateChat) {
            return picture ? (
              <img
                alt="profil"
                onClick={() => goToProfil(id)}
                className="profil"
                src={picture}
              />
            ) : (
              <div className="noProfil">
                <h1>{name}</h1>
              </div>
            );
          }
        }
      }
    } else {
      if (PictureView === "friends") {
        return friends.includes(me.id) ? (
          picture ? (
            <img
              alt="profil"
              onClick={() => goToProfil(id)}
              className="profil"
              src={picture}
            />
          ) : (
            <div className="noProfil">
              <h1>{name}</h1>
            </div>
          )
        ) : (
          <div className="noProfilLock">
            <h1>{name}</h1>
          </div>
        );
      }
    }
  };

  const renderCard = () => (
    <Style.CardContainer>
      {renderProfilPicture()}
      <Style.Description>
        <Style.PersonalInfo>
          <div>
            <h1>{name}</h1>
            <span>{status}</span>
          </div>
          <Style.Connected connected={connected} />
        </Style.PersonalInfo>

        <Style.IconContainer>
          {messagesNotification ? (
            <img onClick={() => ChatAction()} src={Invite} alt="invite" />
          ) : (
            <>
              <img alt="chat" src={ChatIcon} onClick={() => ChatAction()} />
              <img alt="audio" src={AudioCall} onClick={() => ChatAction()} />
              <img alt="stroke" src={Stroke} onClick={() => ChatAction()} />
              <img alt="more" src={More} />{" "}
            </>
          )}
        </Style.IconContainer>
      </Style.Description>
    </Style.CardContainer>
  );

  return (
    <Style.Wrapper>
      {renderCard()}
      {index === openNotificationModel && HandleModelShow()}
    </Style.Wrapper>
  );
};
export default React.memo(Card);
