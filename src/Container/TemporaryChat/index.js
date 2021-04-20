import React, { useCallback, useEffect } from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import { connect, useSelector, useDispatch } from 'react-redux';
import SearchInput from '../../Components/UI/SearchInput';
import * as Style from './style';
import BodyContainer from '../../Common/Body';
import {
  next, NextCode,
  ConfirmationModel,
  AddContactToTeamChat,
  goToFirstStep,
  GoToPrivateRoom,
} from '../../store/TeamChat/action';
import DumbTeamChatComponent from '../../Components/TeamChat';
import { fetchMyData } from '../../store/Me/action';

const userRef = firestoreFirebase.collection('/users');

const TeamChat = (props) => {
  const { step, fetchMyData, AddContactToTeamChat,
    next, ConfirmationModel, NextCode, GoToPrivateRoom,
    goToFirstStep } = props;
  const dispatch = useDispatch();

  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  const goToFirstStepCall = useCallback(
    () => dispatch(goToFirstStep),
    [dispatch, goToFirstStep]
  );

  const ConfirmationModelCall = useCallback(
    () => dispatch(ConfirmationModel),
    [ConfirmationModel, dispatch]
  );

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall]);

  const me = useSelector((state) => state.MeReducer.Me);


  const query2 = userRef
  const [AllUsers, loading2, error2] = useCollectionData(query2, { idField: 'id' });

  const query = me.id && userRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==",
      me.id);

  const [MyData, loading1, error1] = useCollectionData(query, { idField: 'id' });

 

  return (<Style.Wrapper as={BodyContainer}>
    <Style.SearchBar>
      <SearchInput placeholder="Search" name="Search" iconSearch />
    </Style.SearchBar>
    {loading2 ? <h1>Loading ...</h1> :
      loading1 ? <h1>Loading ...</h1> :

        <DumbTeamChatComponent
          TeamData={AllUsers}
          step={step}
          next={next}
          NextCode={NextCode}
          MyTeamChatNotification={MyData === undefined ? [] :
            MyData[0].teamChatNotification}
          teamChatContact={MyData === undefined ? [] :
            MyData[0].teamChatContact}
          ConfirmationModel={ConfirmationModelCall}
          AddContactToTeamChat={AddContactToTeamChat}
          goToFirstStep={goToFirstStepCall}
          GoToPrivateRoom={GoToPrivateRoom}
          me={me}
        />}

  </Style.Wrapper>
  );
};
const mapStateToProps = (state) => ({
  step: state.TeamChatReducer.step,
});

export default connect(mapStateToProps,
  {
    next,
    NextCode,
    ConfirmationModel,
    fetchMyData,
    AddContactToTeamChat,
    goToFirstStep,
    GoToPrivateRoom,

  })(TeamChat);
