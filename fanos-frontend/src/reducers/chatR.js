const initialState = [];

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CHAT": return action.data;
        default: return state;
    }
}

export default chatReducer;
