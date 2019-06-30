const initialState = {
    name: "",
    users: [],
    ops: [],
    topic: ""

}

export default function(state = initialState, action) {
    switch(action.type) {
        case "JOIN_ROOM":
            return {
                ...state,
                name: action.payload.name,
                users: action.payload.users,
                ops: action.payload.ops
            }
        case "LEAVE_ROOM":
            return initialState
        case "SET_TOPIC":
            return {
                ...state,
                topic: action.payload
            }
        default: return state;
    }
}
