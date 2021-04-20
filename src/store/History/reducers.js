const INIT_STATE = {
    MyHistory: [],
    Loading: true,
    LoadingCalls:true


};

const HistoryReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_MY_HISTORY':
            return {
                ...state,
                MyHistory: action.payload,
                Loading: false,
            };

            case 'GET_MY_HISTORY_CALLS':
                return {
                    ...state,
                    MyHistoryCalls: action.payload,
                    LoadingCalls:false
                 };
        default:
            return state;
    }
};

export default HistoryReducer;