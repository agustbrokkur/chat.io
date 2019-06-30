const initialState = {
    users: [],
    rooms: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "UPDATE_USERLIST":
            return {
                ...state,
                users: action.payload,
            }
            //return action.payload;
        case "UPDATE_ROOMS":
            return {
                ...state,
                rooms: action.payload
            }
            //return action.payload;
        default: return state;
    }
}
