import React, { useEffect, useCallback } from "react";
import Button from "../Components/UI/ProfilButton";
 import { connect, useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Layout from "../Components/Layout";
import {
  firebaseDatabase,
  firestoreFirebase,
} from "../firebaseService/FirebaseIndex";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { fetchMyData } from "../store/Me/action";
import {
  handleOpenNotification,
  handleCloseNotification,
  ShowNotificationModal,
} from "../store/WebChat/action";
import Modal from "../Components/Modal";
import useUserName from "./useUserName";
import {ShowMessageNotification} from '../store/Me/action'
import {clearUserTempoChat} from '../store/TeamChat/action'
import {ReversTimeToSec} from '../helpers'

const roomsRef = firestoreFirebase.collection("/rooms");
const messagesRef = firestoreFirebase.collection("/messages");

const PrivateRoute = ({ component: Component, ...props }) => {
  const {
    handleCloseNotification,
    fetchMyData,
    handleOpenNotification,
    clearUserTempoChat,
    ShowNotificationModal,
    ShowMessageNotification
  } = props;
  const NotificationRoom = useSelector(
    (state) => state.WebChatReducer.NotificationRoom
  );
  const Caller = useSelector((state) => state.WebChatReducer.Caller);
  const NotificationStep = useSelector(
    (state) => state.WebChatReducer.NotificationStep
  );
  const token = localStorage.getItem("token");
  const me = useSelector((state) => state.MeReducer.Me);
  const Loading = useSelector((state) => state.MeReducer.Loading);
  const open = useSelector((state) => state.WebChatReducer.open);
  const [CallerName] = useUserName(Caller);
  const dispatch = useDispatch();

  const fetchMyDataCall = useCallback(() => dispatch(fetchMyData), [
    dispatch,
    fetchMyData,
  ]);

  const query =
    !Loading && roomsRef.where("participants", "array-contains", me.id);

  const [snapshot, loading, error] = useCollectionData(query, {
    idField: "id",
  });

  const query2 = messagesRef;
 
  const [snapshots1, loading1, error1] = useCollectionData(query2, {
    idField: "id",
  });
 
  // clear Temporary Chat
  useEffect(()=>{
    if(!Loading){
      me.teamChatContact.every(e=>{
        if(ReversTimeToSec(e.duration)===0){
          clearUserTempoChat(e.contactId)
      }})}

    
   },[Loading, me.teamChatContact])

  // handling message Notification
  useEffect(() => {
    if (!loading1 && !loading) {
      let messages = [];
      snapshot.map((e) => {
        const message = snapshots1.filter(({ id }) => id === e.id);
        messages = [...messages, ...message];
      });
      const a = messages.map(({ id, ...e }) => {
        return e;
      });
      const notificationMessage = a.filter(
        (e) =>
          Object.values(e)[0].read === false &&
          Object.values(e)[0].userId !== me.id
      );
      const userNotification = notificationMessage.map(
        (e) => Object.values(e)[0].userId
      );
      ShowMessageNotification(userNotification);
    }
  },[ShowMessageNotification, loading, loading1, me.id, snapshot, snapshots1]);

  // handling Video audio Notification Modal
  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall]);
  useEffect(() => {
    if (!loading && snapshot !== undefined) {
      const RoomsCall = snapshot.filter(
        ({ audio, video }) => audio.type === "offer" || video.type === "offer"
      );
      if (RoomsCall.length > 0) {
        ShowNotificationModal(RoomsCall);
      }
    }
  });

  useEffect(() => {
    // Assuming user is logged in
    if (!Loading) {
      const reference = firebaseDatabase.ref(`/online/${me.id}`);
      // Set the /users/:userId value to true
      reference.set(true).then(async () => console.log("connected"));
      // Remove the node whenever the client disconnects
      reference
        .onDisconnect()
        .remove()
        .then(async () => console.log("Disconnected"));
    }
  }, [Loading]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Layout>
      <Modal open={open}>
        <h1>You have a Call from {CallerName}</h1>
        <div id="button">
          <Button
            onClick={() =>
              handleOpenNotification(NotificationRoom, NotificationStep)
            }
          >
            Accept
          </Button>
          <Button
            onClick={() =>
              handleCloseNotification(
                NotificationRoom,
                NotificationStep === 2 ? "audio" : "video"
              )
            }
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Route
        {...props}
        render={(props) =>
          token ? <Component {...props} /> : alert("Please Authenticate")
        }
      />
    </Layout>
  );
};

export default connect(null, {
  fetchMyData,
  handleCloseNotification,
  handleOpenNotification,
  ShowNotificationModal,
  ShowMessageNotification,
  clearUserTempoChat
})(PrivateRoute);
