const INIT_STATE = {
  AllUsers: [],
  Loading: true,
  sentNotificationStep: 1,
  openNotificationModel: undefined,

};

const ContactReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return {
        ...state,
        AllUsers: action.payload,
        Loading: false,
      };

    case 'SEND_NOTIFICATION_MODEL':
      return {
        ...state,
        sentNotificationStep: -1,
        openNotificationModel: undefined,
      };

    case 'SHOW_NOTIFICATION_MODEL':
      return {
        ...state,
        openNotificationModel: action.payload,
        sentNotificationStep: 1,
      };

    case 'SHOW_INVITATION_MODEL':
      return {
        ...state,
        sentNotificationStep: 2,
        openNotificationModel: action.payload,
      };
    case 'CANCEL_SEND_REQUEST':
      return {
        ...state,
        openNotificationModel: undefined,
        sentNotificationStep: -1,
      };
    case 'ACCEPT_SENT_REQUEST':
      return {
        ...state,
        openNotificationModel: action.payload,
        sentNotificationStep: 3,
      };
    case 'GENERATE_SECURITY_CODE':
      return {
        ...state,
        openNotificationModel: undefined,
        sentNotificationStep: -1,
      };
    case 'SHOW_GENERATING_CODE_MODEL':
      return {
        ...state,
        openNotificationModel: action.payload,
        sentNotificationStep: 3,
      };
    case 'SHOW_CONFIRMATION_CODE_MODEL':
      return {
        ...state,
        openNotificationModel: action.payload,
        sentNotificationStep: 4,
      };
    case 'REQUEST_SUCCEED':
      return {
        ...state,
        openNotificationModel: undefined,
        sentNotificationStep: -1,
      };


    default:
      return state;
  }
};

export default ContactReducer;