import {
  CONFIRMATION_STEP, OPEN_MODEL,
  GO_TO_LAST_STEP, GO_TO_SECOND_STEP,
  GO_TO_FIRST_STEP, FINISH_STEP,
  CLOSE_MODEL
} from './actionType';
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import { push } from 'connected-react-router';
import firebase from 'firebase';
import { getMeByPhone } from '../../helpers'


const userRef = firestoreFirebase.collection('/users');
const roomsRef = firestoreFirebase.collection('/rooms');

export const next = (id, time) => async (dispatch) => {

  dispatch({
    type: GO_TO_SECOND_STEP,
    payload: {
      id, time: time.value
    }
  });
}

export const NextCode = (id, code, setOpen) => async (dispatch, getState) => {
  const DataStepOne = getState().TeamChatReducer.DataStepOne;
  const me = await getMeByPhone();
  let teamChatNotification = [];

  await userRef
    .doc(id)
    .get()
    .then(async querySnapshot => {
      teamChatNotification = await querySnapshot.data().teamChatNotification.filter((chat) => {
        return chat.id !== me[0].id;
      })
    })
    .then(async () => {
      await userRef
        .doc(id)
        .update({
          teamChatNotification: [...teamChatNotification, {
            codeConfirmation: code,
            id: me[0].id,
            duration: DataStepOne.time
          }]
        })
    })
    .then(() => {
      setOpen(false)
      dispatch({
        type: GO_TO_LAST_STEP,
      });
    })
}

export const AddContactToTeamChat = (contactId, duration, codeConfirmation, setOpen) => async (dispatch) => {
  const me = await getMeByPhone();

  await userRef
    .doc(me[0].id)
    .update({
      teamChatNotification: firebase.firestore.FieldValue.arrayRemove({
        id: contactId,
        duration,
        codeConfirmation
      })
    }).then(async () => {
      await userRef
        .doc(contactId)
        .update({
          teamChatContact: firebase.firestore.FieldValue.arrayUnion({
            contactId: me[0].id,
            duration
          })
        })
        .then(async doc => {
          await userRef
            .doc(me[0].id)
            .update({
              teamChatContact: firebase.firestore.FieldValue.arrayUnion({
                contactId,
                duration
              })
            })
        }).then(() => {
          setOpen(false)
          dispatch({
            type: FINISH_STEP,
          });
        })

    })
}

export const clearUserTempoChat = (contactId) => async (dispatch) => {
  const me = await getMeByPhone();
  console.log(contactId)
  await userRef
  .doc(me[0].id)
  .update({
    teamChatContact: firebase.firestore.FieldValue.arrayRemove({
       contactId,
      duration:' 00h:00min',
   
    })
  })
}

export const ConfirmationModel = () => async (dispatch) => {

  dispatch({
    type: CONFIRMATION_STEP,
  });
}

export const goToFirstStep = () => async (dispatch) => {
  dispatch({
    type: GO_TO_FIRST_STEP,
  });

};

export const ChangeChatDuration = (newDuration, contactId) => async () => {
  const me = await getMeByPhone();
  let teamChatContactForMe = [];

  await userRef
    .doc(me[0].id)
    .get()
    .then(async querySnapshot => {
      teamChatContactForMe = await querySnapshot.data().teamChatNotification.filter((chat) => {
        return chat.id !== contactId;
      })
    })
    .then(async () => {
      await userRef
        .doc(me[0].id)
        .update({
          teamChatContact: [...teamChatContactForMe, {
            contactId: contactId,
            duration: newDuration
          }]
        })
    })

};

export const GoToPrivateRoom = (id) => async (dispatch) => {

  const me = await getMeByPhone();
  let room = {};
  await roomsRef.where('participants', 'array-contains', me[0].id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        if (doc.data().participants.every(elem => [me[0].id, id].indexOf(elem) > -1) && doc.data().temporary === true) {
          room = ({ id: doc.id, ...doc.data() })
        }
      });
    })

  if (Object.entries(room).length === 0) {
    await roomsRef.add({
      participants: [me[0].id, id],
      temporary: true,
      audio:{
        answer:"",
        from:"",
        offer:"",
        step:"",
        type:"leave"
      },
      video:{
        answer:"",
        from:"",
        offer:"",
        step:"",
        type:"leave"
      }
    })
      .then(async doc => {
        dispatch(push({
          pathname: `/webChat/team/${doc.id}`,
        }))
      }
      )
  } else {
    dispatch(push({
      pathname: `/webChat/team/${room.id}`
    }));
  }
};