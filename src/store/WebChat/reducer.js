 
const INIT_STATE = {
  chatStep: 1,
  MyMessages: {},
  Loading: true,
  videoStep: 1,
  room: {},
  roomLoading: true,
  open: false,
  NotificationRoom:'',
  NotificationStep:0,
  Caller:''
};

const WebChatReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GO_CHAT_ROOM":
      return {
        ...state,
        chatStep: 1,
      };
    case "GO_AUDIO_ROOM":
      return {
        ...state,
        chatStep: 2,
      };
    case "GO_VIDEO_ROOM":
      return {
        ...state,
        chatStep: 3,
      };
    case "GET_MY_MESSAGES":
      return {
        ...state,
        MyMessages: action.payload,
        Loading: false,
      };

    case "ROOM_DATA":
      return {
        ...state,
        room: action.payload,
        roomLoading: false,
      };
    case "MODAL_NOTIFICATION":
      return {
        ...state,
        chatStep: action.payload,
        open: false,
      };

    case "CLOSE_NOTIFICATION":
      return {
        ...state,
        open: false
      };
      case "SHOW_NOTIFICATION":
        return {
          ...state,
          open: true,
          Caller:action.payload.data.from,
          NotificationRoom:action.payload.id,
          NotificationStep:action.payload.data.step,
        };
    default:
      return state;
  }
};

export default WebChatReducer;
