import { firestoreFirebase } from "../../firebaseService/FirebaseIndex";
import firebase from "firebase";
import { getMeByPhone, getUserDataById } from "../../helpers";
import { push } from "connected-react-router";
import { GET_MY_HISTORY, GET_MY_HISTORY_CALLS } from "./actionType";
import { fetchMyData } from "../Me/action";
const usersRef = firestoreFirebase.collection("/users");
const roomRef = firestoreFirebase.collection("/rooms");

const messagesRef = firestoreFirebase.collection("/messages");
const ClearedMessagesRef = firestoreFirebase.collection("/clearedMessages");

export const getMyHistory = () => async (dispatch) => {
  const me = await getMeByPhone();
  let history = [];
  let a = [];
  let alluserData = [];

  await usersRef
    .doc(me[0].id)
    .get()
    .then((querySnapshot) => {
      history = querySnapshot.data().history;
    })
    .then(() => {
      if (history.length > 0) {
        history.every(async (e) => {
          await firestoreFirebase
            .doc(e)
            .get()
            .then(async (querySnapshot) => {
              await roomRef
                .doc(querySnapshot.data().room)
                .get()
                .then((e) => {
                  a = [
                    ...a,
                    {
                      ...querySnapshot.data(),
                      userId: e
                        .data()
                        .participants.filter((e) => e !== me[0].id)[0],
                    },
                  ];
                  return a;
                })
                .then((res) => {
                  alluserData = res.map(async (e) => {
                    const userData = await getUserDataById(e.userId);
                    return { ...e, userData };
                  });
                  return alluserData;
                })
                .then((res) => {
                  Promise.all(res).then((values) => {
                    dispatch({
                      type: GET_MY_HISTORY,
                      payload: values,
                    });
                  });
                });
            });
        });
      } else {
        dispatch({
          type: GET_MY_HISTORY,
          payload: [],
        });
      }
    });
};

export const goToPrivateRoom = (id) => async (dispatch) => {
  dispatch(
    push({
      pathname: `/webChat/${id}`,
    })
  );
};

export const blockContact = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(MyId).update({
    blockedUsers: firebase.firestore.FieldValue.arrayUnion(id),
  });
  dispatch(fetchMyData());
};

export const ClearHistory = (roomId) => async (dispatch) => {
  await messagesRef
    .doc(roomId)
    .get()
    .then((querySnapshot) => {
      const entries = Object.entries(querySnapshot.data());
      entries.forEach(async (message) => {
        await ClearedMessagesRef.doc(roomId).set(
          {
            [message[0]]: {
              text: message[1].text,
              room: message[1].room,
              createdAt: message[1].createdAt,
              userId: message[1].userId,
              read: message[1].read,
            },
          },
          { merge: true }
        );
      });
    })
    .then(async () => {
      await messagesRef.doc(roomId).delete();
    });
};

export const DeleteHistory = (id) => async (dispatch) => {
  const me = await getMeByPhone();

  await usersRef
    .doc(me[0].id)
    .update({
      history: firebase.firestore.FieldValue.arrayRemove(`/history/${id}`),
    })
    .then(() => {
      dispatch({
        type: GET_MY_HISTORY,
        payload: [],
      });
    });
};

export const CallHistory = (roomId) => async (dispatch) => {
  const me = await getMeByPhone();
  const MyId = me[0].id;

  await firestoreFirebase
    .doc(`/history/${roomId}`)
    .get()
    .then(async (querySnapshot) => {
      dispatch({
        type: GET_MY_HISTORY_CALLS,
        payload: querySnapshot.data()[MyId],
      });
    });
};
