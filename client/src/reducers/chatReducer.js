const initialState = {
    roomChat: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "UPDATE_ROOM_CHAT":
            return action.payload;
        default: return state;
    }
}
