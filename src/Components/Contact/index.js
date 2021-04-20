import React, { useState } from "react";
import * as Style from "./style";
import Card from "./Card";
 
const DumbContact = (props) => {
  const [, setReceiveNotifiation] = useState(false);

  const {
    sendNotificationToContact,
    ContactData,
    sentNotificationStep,
    MyNotification,
    openNotificationModel,
    showNotificationModel,
    showInvitationModel,
    CancelSendRequest,
    me,
    AccepteSentRequest,
    generateSecurityCode,
    showGeneratingCodeModel,
    confirmationCode,
    showConfirmationCode,
    AcceptedRequest,
    requestSucceed,
    GoToPrivateRoom,
    messagesNotification
  } = props;

  const ProfilView = (opts, id) => {
    return opts ? true : me.friends.includes(id);
  };

  return (
    <Style.CardLayout index={undefined}>
      {ContactData.map(
        (
          {
            avatar,
            name,
            profilView,
            status,
            privateChat,
            PictureView,
            profile,
            history,
            id,
            friends,
          },
          index
        ) =>
          id !== me.id &&
          ProfilView(profilView, id) &&
          !me.blockedUsers.includes(id) && (
            <Card
              key={id}
              PrivateChat={privateChat}
              PictureView={PictureView}
              friends={friends}
              openNotificationModel={openNotificationModel}
              sendNotificationToContact={sendNotificationToContact}
              showNotificationModel={showNotificationModel}
              MyNotification={MyNotification}
              sentNotificationStep={sentNotificationStep}
              showInvitationModel={showInvitationModel}
              setReceiveNotifiation={setReceiveNotifiation}
              CancelSendRequest={CancelSendRequest}
              AcceptedRequest={AcceptedRequest}
              showGeneratingCodeModel={showGeneratingCodeModel}
              showConfirmationCode={showConfirmationCode}
              confirmationCode={confirmationCode}
              requestSucceed={requestSucceed}
              me={me}
              AccepteSentRequest={AccepteSentRequest}
              generateSecurityCode={generateSecurityCode}
              index={index}
              locked={profile}
              name={name}
              picture={avatar}
              status={status}
              history={history}
              GoToPrivateRoom={GoToPrivateRoom}
              id={id}
              messagesNotification={messagesNotification.includes(id)}
            />
          )
      )}
    </Style.CardLayout>
  );
};

export default DumbContact;
