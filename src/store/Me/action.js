import { firestoreFirebase, firebaseStorage } from '../../firebaseService/FirebaseIndex';
import firebase from 'firebase';
import {
  GET_MY_DATA, CHECK_MY_NOTIFICATION, UPLOADING_IMAGE_FAILD,
  UPLOADING_IMAGE, USER_DATA,
  GET_MY_CONFIRMATION_REQUEST, GET_MY_ACCEPTED_REQUEST,
} from './actionType';
import { getMeByPhone } from '../../helpers';

const usersRef = firestoreFirebase.collection('/users');

export const fetchMyData = () => async (dispatch) => {
  const me = await getMeByPhone();

  dispatch({
    type: GET_MY_DATA,
    payload: me[0],
  });
};

export const fetchClientData = (id) => async (dispatch) => {

  let user = {};
  await usersRef
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => user = ({ id: doc.id, ...doc.data() }));
    })
    .then(() => {
      dispatch({
        type: USER_DATA,
        payload: user
      })
    }
    )
};

export const saveAvatar = (image) => async (dispatch) => {
  const me = await getMeByPhone();
  const UploadTask = firebaseStorage.ref(`Profile-Images/${me[0].id}`).put(image);
  UploadTask.on('state_changed',
    (snapshot) => {
      dispatch({
        type: 'START_UPLODING',
      })
    },
    (error) => {
      console.log("Avatar error:", error)
      dispatch({
        type: UPLOADING_IMAGE_FAILD,
        payload: "Faild to Upload Picture"
      });

    },
    () => {
      firebaseStorage.ref('Profile-Images').child(me[0].id).getDownloadURL().then(url => {
        return usersRef.doc(me[0].id).update({
          avatar: url
        })
          .then(() => {
            dispatch({
              type: UPLOADING_IMAGE,

            });
          })
      })
    })
};

export const checkMyNotification = () => async (dispatch) => {
  const me = await getMeByPhone();
  dispatch({
    type: CHECK_MY_NOTIFICATION,
    payload: me[0].notification,
  });
};

export const getMyAcceptedRequest = () => async (dispatch) => {
  const me = await getMeByPhone();
  dispatch({
    type: GET_MY_ACCEPTED_REQUEST,
    payload: me[0].acceptedRequest,
  });
};

export const getMyConfirmationRequest = () => async (dispatch) => {
  const me = await getMeByPhone();
  dispatch({
    type: GET_MY_CONFIRMATION_REQUEST,
    payload: me[0].confirmationCode,
  });
};

export const editProfil = (
  name,
  number,
  status,
  profilPicture,
  profilView,
  privateChat,
  onlineStatus
) => async () => {

  const me = await getMeByPhone();
  await usersRef.doc(me[0].id).update({
    name: name,
    status: status,
    mobile: number,
    PictureView: profilPicture.value,
    profilView: profilView.value === "yes" ? true : false,
    privateChat: privateChat.value === "yes" ? true : false,
    onlineStatus: onlineStatus.value,
  }).then(() => {
    alert("Profil updated")
  })
};

export const blockContact = (id) => async () => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(MyId).update({
    blockedUsers: firebase.firestore.FieldValue.arrayUnion(id)
  });
};

export const unBlockContact = (id) => async () => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(MyId).update({
    blockedUsers: firebase.firestore.FieldValue.arrayRemove(id)
  });
};

export const ImConnected = async () => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(MyId).update({
    connected: true,
  });
};

export const ImDisConnected = async () => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await usersRef.doc(MyId).update({
    connected: false,
  });
};


export const ShowMessageNotification = (userNotification) => async (dispatch) => {
  dispatch({
    type:'MESSAGE_NOTIFICATION',
    payload: userNotification 
  });
};