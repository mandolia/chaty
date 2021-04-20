import firebase from 'firebase';
import { push } from 'connected-react-router';
import {
  GET_ALL_USERS,
  SEND_NOTIFICATION_MODEL,
  SHOW_NOTIFICATION_MODEL,
  SHOW_INVITATION_MODEL,
  CANCEL_SEND_REQUEST,
  ACCEPT_SENT_REQUEST,
  GENERATE_SECURITY_CODE,
  SHOW_GENERATING_CODE_MODEL,
  SHOW_CONFIRMATION_CODE_MODEL,
  REQUEST_SUCCEED,

} from './actionType';
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import { parseJwt, getMeByPhone } from '../../helpers';
import { checkMyNotification } from '../Me/action';

const usersRef = firestoreFirebase.collection('/users');
const roomsRef = firestoreFirebase.collection('/rooms');

export const fetchAllUsers = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const res = await usersRef.get();
  const AllUsersDocuments = res.docs.filter((e) => e.data().mobile !== parseJwt(token).firebase.identities.phone[0]);
  const AllUserMetaData = AllUsersDocuments.map((e) => ({ id: e.id, ...e.data() }));
  dispatch({
    type: GET_ALL_USERS,
    payload: AllUserMetaData,
  });
};

export const generateSecurityCode = (code, id) => async (dispatch) => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(id).update({
    confirmationCode: firebase.firestore.FieldValue.arrayUnion({ code, Id: MyId }),

  });
  await usersRef.doc(MyId).update({
    acceptedRequest: firebase.firestore.FieldValue.arrayRemove(id),
  });
  dispatch({
    type: GENERATE_SECURITY_CODE,
  });
};

export const AccepteSentRequest = (index, id) => async (dispatch) => {
  const me = await getMeByPhone();
  await usersRef.doc(me[0].id).update({
    notification: firebase.firestore.FieldValue.arrayRemove(id),
    acceptedRequest: firebase.firestore.FieldValue.arrayUnion(id),
  });
  dispatch({
    type: ACCEPT_SENT_REQUEST,
    payload: index,
  });
};

export const sendNotificationToContact = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  await usersRef.doc(id).update({
    notification: firebase.firestore.FieldValue.arrayUnion(me[0].id),
  });
  dispatch({
    type: SEND_NOTIFICATION_MODEL,
    payload: id,
  });
};

export const showNotificationModel = (index) => async (dispatch) => {
  dispatch({
    type: SHOW_NOTIFICATION_MODEL,
    payload: index,
  });
};

export const showConfirmationCode = (index) => async (dispatch) => {
  dispatch({
    type: SHOW_CONFIRMATION_CODE_MODEL,
    payload: index,
  });
};

export const showInvitationModel = (index) => async (dispatch) => {
  dispatch({
    type: SHOW_INVITATION_MODEL,
    payload: index,
  });
};

export const CancelSendRequest = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  await checkMyNotification();
  await usersRef.doc(me[0].id).update({
    notification: firebase.firestore.FieldValue.arrayRemove(id),
  });
  dispatch({
    type: CANCEL_SEND_REQUEST,
  });
};

export const showGeneratingCodeModel = (index) => async (dispatch) => {
  dispatch({
    type: SHOW_GENERATING_CODE_MODEL,
    payload: index,
  });
};

export const requestSucceed = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  await usersRef.doc(me[0].id).update({
    friends: firebase.firestore.FieldValue.arrayUnion(id),
    confirmationCode: me[0].confirmationCode.filter(code => code.Id !== id)
  });
  await usersRef.doc(id).update({
    friends: firebase.firestore.FieldValue.arrayUnion(me[0].id),
  });

  dispatch({
    type: REQUEST_SUCCEED,
  });

};

export const GoToPrivateRoom = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  let room = {};
  await roomsRef.where('participants', 'array-contains', me[0].id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        if (doc.data().participants.every(elem => [me[0].id, id].indexOf(elem) > -1) && doc.data().temporary === false) {
          room = ({ id: doc.id, ...doc.data() })
        }
      });
    })

  if (Object.entries(room).length === 0) {
    await roomsRef.add({
      participants: [me[0].id, id],
      temporary: false,
      audio:{
        answer: "",
        from: "",
        offer: "",
        type: ""
      },
      video:{
        answer: "",
        from: "",
        offer: "",
        type: ""
      }
      
    })
      .then(async doc => {

        dispatch(push({
          pathname: `/webChat/${doc.id}`,
        }))
      }
      )
  } else {
    dispatch(push({
      pathname: `/webChat/${room.id}`
    }));
  }
};


