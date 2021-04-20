import React, { useEffect, useCallback } from 'react';
import firebase from 'firebase';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import * as Style from './style';
import BodyContainer from '../../Common/Body';
import DumbContactComponent from '../../Components/Contact';
import SearchInput from '../../Components/UI/SearchInput';
import SortInput from '../../Components/UI/SortInput';
import {
  sendNotificationToContact,
  showNotificationModel,
  showInvitationModel,
  CancelSendRequest,
  AccepteSentRequest,
  generateSecurityCode,
  showConfirmationCode,
  showGeneratingCodeModel,
  requestSucceed,
  GoToPrivateRoom
} from '../../store/Contact/action';
import {
  checkMyNotification, fetchMyData, getMyAcceptedRequest, getMyConfirmationRequest,
} from '../../store/Me/action';

const userRef = firestoreFirebase.collection('/users');

const Contact = (props) => {
  const {
    fetchMyData,
    sendNotificationToContact,
    checkMyNotification,
    showNotificationModel,
    showInvitationModel,
    CancelSendRequest,
    AccepteSentRequest,
    generateSecurityCode,
    getMyAcceptedRequest,
    showGeneratingCodeModel,
    getMyConfirmationRequest,
    showConfirmationCode,
    requestSucceed,
    GoToPrivateRoom
  } = props;

  const dispatch = useDispatch()
  const sentNotificationStep = useSelector((state) => state.ContactReducer.sentNotificationStep);
  const openNotificationModel = useSelector((state) => state.ContactReducer.openNotificationModel);
  const me = useSelector((state) => state.MeReducer.Me);

  const query = me.id && userRef
    .where(firebase.firestore.FieldPath.documentId(),
      "==",
      me.id);

  const [snapshot, loading, error] = useCollectionData(query, { idField: 'id' });

  const query2 = me.id && userRef

  const [AllUsers, loading2, error2] = useCollectionData(query2, { idField: 'id' });

  const Loading = useSelector((state) => state.ContactReducer.Loading)
  const MyNotification = (snapshot !== undefined && snapshot[0].notification) || [];
  const confirmationCode = (snapshot !== undefined && snapshot[0].confirmationCode) || [];
  const AcceptedRequest = (snapshot !== undefined && snapshot[0].acceptedRequest) || [];
  const messagesNotification = useSelector((state) => state.MeReducer.messagesNotification)  

  const fetchMyDataCall = useCallback(
    () => dispatch(fetchMyData),
    [dispatch, fetchMyData]
  );

  const getMyAcceptedRequestCall = useCallback(
    () => dispatch(getMyAcceptedRequest),
    [dispatch, getMyAcceptedRequest]
  );

  const getMyConfirmationRequestCall = useCallback(
    () => dispatch(getMyConfirmationRequest),
    [dispatch, getMyConfirmationRequest]
  );

  const checkMyNotificationCall = useCallback(
    () => dispatch(checkMyNotification),
    [checkMyNotification, dispatch]
  );

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall]);

  useEffect(() => {
    getMyAcceptedRequestCall()
  }, [getMyAcceptedRequestCall]);

  useEffect(() => {
    getMyConfirmationRequestCall()
  }, [getMyConfirmationRequestCall]);

  useEffect(() => {
    checkMyNotificationCall();
  }, [checkMyNotificationCall]);

  return (
    <Style.Wrapper as={BodyContainer}>
      <Style.SearchBar>
        <SearchInput placeholder="Search" name="Search" iconSearch />
        <SortInput width="150px" height="40px" />
      </Style.SearchBar>
      {Loading && loading && loading2
        ? <h1>Loading ....</h1>
        : (
          <DumbContactComponent
            ContactData={AllUsers || []}
            MyNotification={MyNotification}
            sendNotificationToContact={sendNotificationToContact}
            sentNotificationStep={sentNotificationStep}
            openNotificationModel={openNotificationModel}
            showNotificationModel={showNotificationModel}
            showInvitationModel={showInvitationModel}
            CancelSendRequest={CancelSendRequest}
            AccepteSentRequest={AccepteSentRequest}
            generateSecurityCode={generateSecurityCode}
            AcceptedRequest={AcceptedRequest}
            confirmationCode={confirmationCode}
            showConfirmationCode={showConfirmationCode}
            showGeneratingCodeModel={showGeneratingCodeModel}
            requestSucceed={requestSucceed}
            GoToPrivateRoom={GoToPrivateRoom}
            messagesNotification={messagesNotification}
            me={me}
          />
        )}
    </Style.Wrapper>
  );
};


export default connect(null,
  {
    sendNotificationToContact,
    checkMyNotification,
    showNotificationModel,
    showInvitationModel,
    CancelSendRequest,
    fetchMyData,
    AccepteSentRequest,
    generateSecurityCode,
    getMyAcceptedRequest,
    showGeneratingCodeModel,
    showConfirmationCode,
    getMyConfirmationRequest,
    requestSucceed,
    GoToPrivateRoom
  })(Contact);
