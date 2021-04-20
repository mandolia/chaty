import { firestoreFirebase } from "../../firebaseService/FirebaseIndex";
import firebase from "firebase";
import { push } from "connected-react-router";
import {
  GO_CHAT_ROOM,
  GO_AUDIO_ROOM,
  GO_VIDEO_ROOM,
  ROOM_DATA,
} from "./actionType";
import { getMeByPhone } from "../../helpers";

const messagesRef = firestoreFirebase.collection("/messages");
const ClearedMessagesRef = firestoreFirebase.collection("/clearedMessages");
const roomsRef = firestoreFirebase.collection("/rooms");
const usersRef = firestoreFirebase.collection("/users");
const historyRef = firestoreFirebase.collection("/history");

export const goToChatRoom = () => async (dispatch) => {
  dispatch({
    type: GO_CHAT_ROOM,
  });
};

export const goToAudioRoom = () => async (dispatch) => {
  dispatch({
    type: GO_AUDIO_ROOM,
  });
};

export const goToVideoRoom = () => async (dispatch) => {
  dispatch({
    type: GO_VIDEO_ROOM,
  });
};

export const GetRoomMetaData = (id) => async (dispatch) => {
  let room = {};
  await roomsRef
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        room = { id: doc.id, ...doc.data() };
      });
    });

  dispatch({
    type: ROOM_DATA,
    payload: room,
  });
};

export const clearMessages = (roomData) => async () => {
  await messagesRef
    .doc(roomData.id)
    .get()
    .then((querySnapshot) => {
      const entries = Object.entries(querySnapshot.data());
      entries.forEach(async (message) => {
        await ClearedMessagesRef.doc(roomData.id).set(
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
      await messagesRef.doc(roomData.id).delete();
    });
};

export const SendMessage = (data) => async (dispatch) => {
  const me = await getMeByPhone();
  const newId = messagesRef.doc();
  await messagesRef
    .doc(data.room)
    .set(
      {
        [newId.id]: {
          text: data.content,
          room: data.room,
          createdAt: firebase.firestore.Timestamp.now(),
          userId: me[0].id,
          read: false,
        },
      },
      { merge: true }
    )
    .then(async (doc) => {
      dispatch({
        type: "SEND_MESSAGE",
      });
    });
};

export const readMessage = (roomData) => async (dispatch) => {
  const me = await getMeByPhone();
  let unReadMessages = [];
  await messagesRef
    .where(firebase.firestore.FieldPath.documentId(), "==", roomData.id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        const entries = Object.entries(doc.data());
        unReadMessages = entries.filter((e) => {
          return e[1].userId !== me[0].id && e[1].read === false;
        });
        unReadMessages = unReadMessages.map((e) => e[0]);
      });
    })
    .then(() => {
      let messages = [];
      unReadMessages.every(async (message) => {
        await messagesRef
          .doc(roomData.id)
          .get()
          .then((querySnapshot) => {
            messages = { id: message, ...querySnapshot.data()[message] };
          })
          .then(async () => {
            if (messages.id === message) {
              await messagesRef.doc(roomData.id).update({
                [message]: {
                  createdAt: messages.createdAt,
                  read: true,
                  room: messages.room,
                  text: messages.text,
                  userId: messages.userId,
                },
              });
            }
          });
      });
    });
};

export const doVideoOffer = (room, offer, type, step) => async (dispatch) => {
  const me = await getMeByPhone();
  await roomsRef.doc(room).update({
    [type]: {
      type: "offer",
      from: me[0].id,
      offer: JSON.stringify(offer),
      step: step,
    },
  });
};

export const doCandidate = (to, candidate, type) => async (dispatch) => {
  const me = await getMeByPhone();
  await usersRef.doc(to).update({
    [type]: {
      type: "candidate",
      from: me[0].id,
      candidate: JSON.stringify(candidate),
    },
  });
};

export const doVideoAnswer = (room, answer, type) => async (dispatch) => {
  console.log(type);
  const me = await getMeByPhone();
  await roomsRef.doc(room).update({
    [type]: { type: "answer", from: me[0].id, answer: JSON.stringify(answer) },
  });
};

export const addHistory = async (room, type, history) => {
  const me = await getMeByPhone();
  await historyRef
    .doc(room.id)
    .set(
      {
        room: room.id,
        [type]: history,
      },
      { merge: true }
    )
    .then(async () => {
      if (type !== "chat") {
        await historyRef.doc(room.id).update({
          [me[0].id]: firebase.firestore.FieldValue.arrayUnion({
            duration: history,
            type: type,
            date: firebase.firestore.Timestamp.now(),
          }),
        });
      }
    })
    .then(async () => {
      await usersRef.doc(me[0].id).update({
        history: firebase.firestore.FieldValue.arrayUnion(
          `/history/${room.id}`
        ),
      });
    });
};

export const leaveRoom = (
  me,
  remoteUser,
  room,
  localconnection,
  localstream,
  localVideoRef,
  displayTwoVideo,
  setDisplayVideoScreen,
  handleReset,
  timer,
  type,
  roomMetadata
) => async (dispatch) => {
  if (displayTwoVideo) {
    const tracks = localVideoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    if (localstream) {
      localstream.getTracks().forEach((track) => track.stop());
    }

    if (localconnection) {
      localconnection.close();
    }

    setDisplayVideoScreen(false);
    handleReset();

    await roomsRef.doc(room).update({
      [type]: { type: "leave", answer: "", from: "", offer: "", step: "" },
      open: false,
    });
    if (type === "video") {
      await usersRef.doc(me).update({
        "video.type": "",
        "video.from": "",
        "video.candidate": "",
      });
      await usersRef.doc(remoteUser[0]).update({
        "video.type": "",
        "video.from": "",
        "video.candidate": "",
      });
    } else {
      await usersRef.doc(me).update({
        "audio.type": "",
        "audio.from": "",
        "audio.candidate": "",
      });
      await usersRef.doc(remoteUser[0]).update({
        "audio.type": "",
        "audio.from": "",
        "audio.candidate": "",
      });
    }
    addHistory(roomMetadata, type, timer);
  }
};

export const handleOpenNotification = (roomId, step) => async (dispatch) => {
  await roomsRef
    .doc(roomId)
    .update({
      open: true,
    })
    .then(() => {
      dispatch({
        type: "MODAL_NOTIFICATION",
        payload: step,
      });
      dispatch(
        push({
          pathname: `/webChat/${roomId}`,
        })
      );
    });
};

export const handleCloseNotification = (roomId, type) => async (dispatch) => {
  const me = await getMeByPhone();

  await roomsRef
    .doc(roomId)
    .update({
      [type]: { type: "leave", answer: "", from: "", offer: "", step: "" },
      open: false,
    })
    .then(() => {
      usersRef.doc(me[0].id).update({
        "video.type": "",
        "video.from": "",
        "video.candidate": "",
        "audio.type": "",
        "audio.from": "",
        "audio.candidate": "",
      });
    })
    .then(() => {
      dispatch({
        type: "CLOSE_NOTIFICATION",
      });
    });
};

export const ShowNotificationModal = (Rooms) => async (dispatch) => {
  const me = await getMeByPhone();
  if (
    Rooms[0].audio.from !== "" &&
    Rooms[0].audio.from !== me[0].id &&
    !Rooms[0].open
  ) {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        id: Rooms[0].id,
        step: 2,
        data: Rooms[0].audio,
      },
    });
  } else {
    if (
      Rooms[0].video.from !== "" &&
      Rooms[0].video.from !== me[0].id &&
      !Rooms[0].open
    ) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id: Rooms[0].id,
          step: 3,
          data: Rooms[0].video,
        },
      });
    }
  }
};

export const deleteMessage = (id, roomId) => async (dispatch) => {
  console.log(roomId,id)
  await messagesRef
    .doc(roomId)
    .get()
    .then((querySnapshot) => {
      const entries = Object.entries(querySnapshot.data());
      entries.forEach(async (message) => {
        if (message[0] === id) {
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
        }
      });
    })
    .then(async () => {
      await messagesRef.doc(roomId).update({
        [id]: firebase.firestore.FieldValue.delete(),
      });
    });
};
