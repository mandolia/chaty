const INIT_STATE = {
  Me: {},
  Loading: true,
  MyNotification: [],
  AcceptedRequest: [],
  confirmationCode: [],
  avatarLoading: false,
  avatarFaild: "",
  userProfil: {},
  loadingUser: true
};

const MeReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_MY_DATA':
      return {
        ...state,
        Me: action.payload,
        Loading: false,
      };
    case 'CHECK_MY_NOTIFICATION':
      return {
        ...state,
        MyNotification: action.payload,

      };

    case 'GET_MY_ACCEPTED_REQUEST':
      return {
        ...state,
        AcceptedRequest: action.payload,
      };
    case 'GET_MY_CONFIRMATION_REQUEST':
      return {
        ...state,
        confirmationCode: action.payload,
      };
    case 'UPLOADING_IMAGE':
      return {
        ...state,
        avatarLoading: false,
      };
    case 'UPLOADING_IMAGE_FAILD':
      return {
        ...state,
        avatarLoading: false,
        avatarFaild: action.payload
      };
    case 'START_UPLODING':
      return {
        ...state,
        avatarLoading: true,

      };
    case 'USER_DATA':
      return {
        ...state,
        userProfil: action.payload,
        loadingUser: false
      };
    case 'MESSAGE_NOTIFICATION':
      return {
        ...state,
        messagesNotification: action.payload,
      }
    default:
      return state;
  }
};

export default MeReducer;
