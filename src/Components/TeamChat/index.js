import React from 'react';
import CardLayout from './style';
import Card from './Card';

const DumbTeamChatComponent = ({ TeamData, MyTeamChatNotification,
  NextCode, step, next, me, ConfirmationModel,
  goToFirstStep, GoToPrivateRoom, CloseModal, open, AddContactToTeamChat, teamChatContact }) => (

  <CardLayout>
    {TeamData.map(({
      avatar, name, profilView, status,
      PictureView, profile, history, id,
    }, index) => (
      me.id !== id && profilView && !(me.blockedUsers.includes(id)) &&
      <Card
        PictureView={PictureView}
        key={id}
        step={step}
        next={next}
        index={index}
        locked={profile}
        name={name}
        picture={avatar}
        detail={status}
        history={history}
        NextCode={NextCode}
        goToFirstStep={goToFirstStep}
        me={me}
        CloseModal={CloseModal}
        ConfirmationModel={ConfirmationModel}
        MyTeamChatNotification={MyTeamChatNotification}
        AddContactToTeamChat={AddContactToTeamChat}
        teamChatContact={teamChatContact}
        open={open}
        GoToPrivateRoom={GoToPrivateRoom}
        id={id}
      />
    ))}
  </CardLayout>
);

export default DumbTeamChatComponent;
