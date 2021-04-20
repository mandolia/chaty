import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import firebase from 'firebase';
import { push } from 'connected-react-router';
import {
  ADD_GROUP_ACTION,
  BACK_TO_CONTACT,
  SELECT_GROUP_PERSON,
  REMOVE_GROUP_PERSON,
  ADD_GROUP_BY_NAME,
  GET_GROUP_BY_ID,
  GET_ALL_GROUPS,
  GROUP_ERROR,
  GO_TO_GROUP_DETAIL,
  SHOW_ALL_GROUP,
  ADD_MEMBERS,
  UPDATE_MEMBER,
  GO_TO_PRIVATE_ROOM
} from './actionType';
import { getMeByPhone } from '../../helpers'

const userRef = firestoreFirebase.collection('/users');
const roomsRef = firestoreFirebase.collection('/rooms');

export const showAllGroup = () => async (dispatch) => {
  dispatch({
    type: SHOW_ALL_GROUP
  })
};

export const goToPrivateRoom = (id) => async (dispatch) => {
  let room = {};

  await roomsRef
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => room = ({ id: doc.id, ...doc.data() }));
    })
  dispatch(push({
    pathname: `/webChat/group/${room.id}`
  }));
}

export const updateMember = (id) => async (dispatch, getState) => {
  const members = getState().GroupChatReducer.GroupPerson;
  let ExistingMembers = [];

  await roomsRef
    .where(firebase.firestore.FieldPath.documentId(), '==', id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        ExistingMembers = [...doc.data().participants]
      });
    }).then(async () => {

      const NewMembers = members.filter(e => !ExistingMembers.includes(e))

      await roomsRef.doc(id).update({
        participants: [...ExistingMembers, ...NewMembers],
      }).then(async doc => {
        await NewMembers.every(async e => await userRef.doc(e).update({
          groups: firebase.firestore.FieldValue.arrayUnion(`/rooms/${id}`)
        }))
        dispatch(push({
          pathname: `/groups/${id}`
        }));
      })
    })

};

export const AddMember = (id) => async (dispatch) => {

  dispatch(push({
    pathname: `/update/group/${id}`
  }));
};

export const addGroupAction = () => async (dispatch) => {
  dispatch(push({
    pathname: `/groups/contact`
  }));
};

export const goToGroupDetail = (id) => async (dispatch) => {

  dispatch(push({
    pathname: `/groups/${id}`
  }));

};

export const getGroupById = (id) => async (dispatch) => {
  let groupMetadata = {}
  await roomsRef
    .where(firebase.firestore.FieldPath.documentId(), '==', id)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.forEach((doc) => {
        groupMetadata = ({ id: doc.id, ...doc.data() })
      });
    })

  dispatch({
    type: GET_GROUP_BY_ID,
    payload: groupMetadata
  });
};

export const addNewGroup = (name) => async (dispatch, getState) => {
  const me = await getMeByPhone();
  const members = [...getState().GroupChatReducer.GroupPerson, me[0].id];
  const allGroups = getState().GroupChatReducer.allGroups;
  const VerifyName = allGroups.filter(group => {
    return group.name === name
  });
  const VerifyGroup = allGroups.filter(group => {
    return group.participants.every((e) => members.includes(e)) &&
      members.every((e) => group.participants.includes(e))
  });

  if (members.length < 2) {
    dispatch({
      type: GROUP_ERROR,
      payload: "Group member must be more than one !"
    });
  } else {
    if (VerifyName.length !== 0) {
      dispatch({
        type: GROUP_ERROR,
        payload: "Group name already Exist !"
      });
    } else {
      if (VerifyGroup.length !== 0) {
        dispatch({
          type: GROUP_ERROR,
          payload: "Group already exist with the same members !"
        });
      } else {

        await roomsRef.add({
          participants: members,
          name: name,
          admin: [me[0].id],
          audio:{
            answer:"",
            from:"",
            offer:"",
            type:""
          },
          video:{
            answer:"",
            from:"",
            offer:"",
            type:""
          }
        })
          .then(async doc => {
            await members.every(async e => await userRef.doc(e).update({
              groups: firebase.firestore.FieldValue.arrayUnion(`/rooms/${doc.id}`)
            }))
            dispatch(push({
              pathname: `/groups/${doc.id}`
            }));
          })
      }
    }
  }
};

export const getAllGroups = () => async (dispatch) => {
  const me = await getMeByPhone();
  let data = [];
  await userRef
    .where(firebase.firestore.FieldPath.documentId(), "==", me[0].id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        doc.data().groups.length > 0 ?
          doc.data().groups.every(async e => {
            await firestoreFirebase.doc(e).get().then(function (doc) {
              if (doc.exists) {
                const id = doc.id;
                data = [...data, { id, ...doc.data() }];
              }
            })
              .then(() => {
                dispatch({
                  type: GET_ALL_GROUPS,
                  payload: data,
                })
              })
          })
          :
          dispatch({
            type: GET_ALL_GROUPS,
            payload: data,
          })
      })
    })
};

export const selectGroupPerson = (PersonId) => async (dispatch) => {
  dispatch({
    type: SELECT_GROUP_PERSON,
    payload: PersonId,
  });
};

export const removeGroupPerson = (PersonId) => async (dispatch, getState) => {
  const GroupPersonState = getState().GroupChatReducer.GroupPerson;
  const index = GroupPersonState.indexOf(PersonId);
  dispatch({
    type: REMOVE_GROUP_PERSON,
    payload: index,
  });
};

export const backToContact = () => async (dispatch) => {
  dispatch({
    type: BACK_TO_CONTACT,
  });
};

export const exitGroup = (groupId) => async (dispatch) => {
  const me = await getMeByPhone();
  await userRef
    .doc(me[0].id)
    .update({
      groups: firebase.firestore.FieldValue.arrayRemove(`/rooms/${groupId}`)
    })
    .then(async () => {
      await roomsRef
        .doc(groupId)
        .update({
          participants: firebase.firestore.FieldValue.arrayRemove(me[0].id)
        })
        .then(() => {
          dispatch(push({
            pathname: `/groups`
          }));
        })
    })

};

export const addAdminToGroup = (groupId, contactId) => async (dispatch) => {

  await roomsRef
    .doc(groupId)
    .update({
      admin: firebase.firestore.FieldValue.arrayUnion(contactId)
    })
    .then(() => {
      dispatch(push({
        pathname: `/groups/${groupId}`
      }));
    })
};

export const deleteMemberFromGroup = (groupId, contactId) => async (dispatch) => {

  await userRef
    .doc(contactId)
    .update({
      groups: firebase.firestore.FieldValue.arrayRemove(`/rooms/${groupId}`)
    })
    .then(async () => {
      await roomsRef
        .doc(groupId)
        .update({
          participants: firebase.firestore.FieldValue.arrayRemove(contactId)
        })

    })
};

export const blockGroup = (id) => async (dispatch) => {
  const me = await getMeByPhone();
  const MyId = me[0].id;
  await userRef.doc(MyId).update({
    blockedGroups: firebase.firestore.FieldValue.arrayUnion(`/rooms/${id}`),
    groups: firebase.firestore.FieldValue.arrayRemove(`/rooms/${id}`),
  })
    .then(() => {
      dispatch(push({
        pathname: `/groups`
      }));
    })
};
