const INIT_STATE = {
  step: 1,
  GroupPerson: [],
  groupMember: {},
  groupId: "",
  loadGroupMember: true,
  allGroups: [],
  loadGroups: true,
  groupError: '',
  update: false,
};

const GroupReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case 'UPDATE_MEMBER':
      return {
        ...state,
        step: 3,
        groupId: action.payload,
        GroupPerson: []
      };

    case 'ADD_MEMBERS':
      return {
        ...state,
        step: 2,
        update: true,
        groupError: '',
      };

    case 'SHOW_ALL_GROUP':
      return {
        ...state,
        step: 1,
        groupId: ''
      };

    case 'SELECT_GROUP_PERSON':
      return {
        ...state,
        GroupPerson: [...state.GroupPerson, action.payload],
      };

    case 'REMOVE_GROUP_PERSON':
      return {
        ...state,
        GroupPerson: [...state.GroupPerson.slice(0, action.payload), ...state.GroupPerson.slice(action.payload + 1)],
      };

    case 'BACK_TO_CONTACT':
      return {
        ...state,
        step: 1,
      };
    case 'GET_GROUP_BY_ID':
      return {
        ...state,
        groupMember: action.payload,
        loadGroupMember: false,
        groupError: '',
      };

    case 'GET_ALL_GROUPS':
      return {
        ...state,
        allGroups: [...action.payload],
        loadGroups: false
      };

    case 'GROUP_ERROR':
      return {
        ...state,
        groupError: action.payload
      };

    default:
      return state;
  }
};

export default GroupReducer;