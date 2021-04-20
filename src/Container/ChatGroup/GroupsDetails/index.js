import React, { useEffect, useCallback } from 'react';
import BodyContainer from '../../../Common/Body';
import firebase from 'firebase';
import { GroupBar, Wrapper, ButtonContainer } from '../style';
import { connect, useSelector, useDispatch } from 'react-redux';
import SearchInput from '../../../Components/UI/SearchInput';
import Rectangle380 from '../../../Illustration/Rectangle380.svg';
import DumbGroupPerson from '../../../Components/GroupChat/GroupPerson';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestoreFirebase } from '../../../firebaseService/FirebaseIndex'
import {

  AddMember,
  showAllGroup,
  exitGroup,
  addAdminToGroup,
  deleteMemberFromGroup
} from '../../../store/GroupChat/action';
import { fetchMyData } from '../../../store/Me/action';

const roomRef = firestoreFirebase.collection('/rooms');

const GroupDetail = (props) => {
  const {
    AddMember,

    showAllGroup,
    fetchMyData,
    exitGroup,
    addAdminToGroup,
    deleteMemberFromGroup
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();
  const me = useSelector((state) => state.MeReducer.Me);

  const query = roomRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==",
      props.match.params.id);

  const [GroupMember, loading, error2] = useCollectionData(query, { idField: 'id' });


  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall])


  return (
    loading ? <h1>Loading  ....</h1> : <Wrapper as={BodyContainer}>
      <GroupBar>
        <img onClick={() => showAllGroup()} alt="search" src={Rectangle380} />
        <form onSubmit={handleSubmit}>
          <SearchInput disabled value={GroupMember[0].name} name="groupname" />
        </form>
        <SearchInput placeholder="Search" name="Search" iconSearch />
        <ButtonContainer>

          {GroupMember[0].admin.includes(me.id) ?
            <button onClick={() => AddMember(props.match.params.id)}> Add Member</button> :
            null}
        </ButtonContainer>
      </GroupBar>
      <DumbGroupPerson
        exitGroup={exitGroup}
        groupMetaData={GroupMember[0]}
        deleteMemberFromGroup={deleteMemberFromGroup}
        me={me}
        addAdminToGroup={addAdminToGroup}
        team={GroupMember[0].participants} />
    </Wrapper>

  );
};

export default connect(null,
  {
    showAllGroup,
    fetchMyData,
    AddMember,
    exitGroup,
    addAdminToGroup,
    deleteMemberFromGroup
  })(GroupDetail);
