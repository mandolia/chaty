import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { Wrapper } from '../style';
import BodyContainer from '../../../Common/Body';
import DumbMyContact from '../../../Components/GroupChat/Contact';
import { GroupBar, ButtonContainer } from '../style';
import SearchInput from '../../../Components/UI/SearchInput';
import Rectangle380 from '../../../Illustration/Rectangle380.svg';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestoreFirebase } from '../../../firebaseService/FirebaseIndex';
import {
  selectGroupPerson,
  removeGroupPerson,
  addNewGroup,
  updateMember,
 
} from '../../../store/GroupChat/action';
import { fetchMyData } from '../../../store/Me/action';

const userRef = firestoreFirebase.collection('/users');
const roomRef = firestoreFirebase.collection('/rooms');

const Contact = (props) => {

  const {
    selectGroupPerson,
    removeGroupPerson,
    addNewGroup,
    updateMember,
   
    fetchMyData
  } = props;

  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewGroup(name)
  };

  const dispatch = useDispatch();

  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  const query2 = userRef;

  const GroupPerson = useSelector((state) => state.GroupChatReducer.GroupPerson)
  const groupError = useSelector((state) => state.GroupChatReducer.groupError);
  const me = useSelector((state) => state.MeReducer.Me);
  const [AllUsers, loading, error] = useCollectionData(query2, { idField: 'id' });


  const query = props.match.params.id !== undefined && roomRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==",
      props.match.params.id);

  const [GroupMember, loading2, error2] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall])

  const GetActualMember = () => {
    if (!loading2) {
      return AllUsers.filter(e => {
        return !GroupMember[0].participants.includes(e.id)
      })
    }
  }

  return (
    loading ? <h1>LOaidng ...</h1> :
      loading2 ? <h1>Loading ...</h1> :
        <Wrapper as={BodyContainer}>
          <GroupBar>
            <img alt="add" src={Rectangle380} />
            <form onSubmit={handleSubmit}>
              <SearchInput required placeholder="Group name"
                value={props.match.params.id !== undefined ? GroupMember[0].name : name}
                disabled={props.match.params.id !== undefined ? true : false}
                onChange={(e) => setName(e.target.value)} name="groupname" />
              {groupError}
              <ButtonContainer>
                {props.match.params.id === undefined ? <button style={{ zIndex: 9999 }}
                  onClick={() => addNewGroup()} >Done</button> :
                  <button style={{ zIndex: 9999 }} onClick={() => updateMember(props.match.params.id)}>
                    Update Member
                  </button>}
              </ButtonContainer>
            </form>
            <SearchInput style={{ width: "70px" }} disabled value={GroupPerson.length} />
          </GroupBar>
          <DumbMyContact
            selectGroupPerson={selectGroupPerson}
            removeGroupPerson={removeGroupPerson}
            contact={props.match.params.id !== undefined ? GetActualMember() :
              AllUsers}
            GroupPerson={GroupPerson}
            me={me}
          />
        </Wrapper >
  );
};

export default connect(null,
  {
    selectGroupPerson,
    removeGroupPerson,
    addNewGroup,
    updateMember,
 
    fetchMyData
  })(Contact);
