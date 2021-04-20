import React from 'react';
import * as Style from '../style';
import Card from './Card';
import Jhon from '../../../Illustration/Henry.png';
import useUserData from '../../../hooks/useUserData'

const GroupPerson = (props) => {
  const { team, me, groupMetaData, deleteMemberFromGroup,
    addAdminToGroup, exitGroup } = props;
  const [userMetaData, loading] = useUserData(team);

  return (
    loading ? <h1>Loading ...</h1> :
      <Style.CardLayout>
        {userMetaData.map(({
          name,
          status,
          profile,
          history,
          id,
          profilView,
          avatar,
          PictureView,
          friends,
        }, index) => (

          profilView &&
          <Card
            key={id}
            deleteMemberFromGroup={deleteMemberFromGroup}
            index={index}
            locked={profile}
            name={name}
            picture={avatar ? avatar : Jhon}
            detail={status}
            history={history}
            PictureView={PictureView}
            friends={friends}
            me={me}
            addAdminToGroup={addAdminToGroup}
            id={id}
            exitGroup={exitGroup}
            groupMetaData={groupMetaData}
          />
        ))}
      </Style.CardLayout>
  );
};

export default React.memo(GroupPerson);
