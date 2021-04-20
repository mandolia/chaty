import React, { useState } from 'react';
import { CardLayout } from '../style';
import Card from './Card';
import Jhon from '../../../Illustration/Henry.png';
const Contact = (props) => {

  const {
    contact,
    selectGroupPerson,
    removeGroupPerson,
    GroupPerson,
    me
  } = props;

  const [openModel, setOpenModel] = useState();

  return (
    <CardLayout index={openModel}>
      {contact.map(({
        name, status, profilView,
        PictureView, avatar, id,friends,
      }, index) => me.id !== id &&
      profilView && !(me.blockedUsers.includes(id)) &&
        <Card
          key={id}
          friends={friends}
          openModel={openModel}
          setOpenModel={setOpenModel}
          index={index}
          name={name}
          picture={avatar ? avatar : Jhon}
          detail={status}
          id={id}
          me={me}
          PictureView={PictureView}
          selectGroupPerson={selectGroupPerson}
          removeGroupPerson={removeGroupPerson}
          GroupPerson={GroupPerson}
        />
      )}
    </CardLayout>
  );
};
export default Contact;
