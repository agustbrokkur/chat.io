const initialState = {
    name: "",
    nameSet: false,
    roomStatus: false,
    room: ""
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "SET_NAME":
            return action.payload;
        case "SET_ROOM_STATUS":
            return {
                ...state,
                roomStatus: action.payload.roomStatus,
                room: action.payload.room
            }
        default: return state;
    }
}
