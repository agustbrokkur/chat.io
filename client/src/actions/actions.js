export const updateRoomChat = (chat) => {
    return {
        type: "UPDATE_ROOM_CHAT",
        payload: chat
    }
}

export const updateUser = (newUser) => {
    return {
        type: "SET_NAME",
        payload: newUser
    };
};

export const userRoomStatus = (roomStatus) => {
    return {
        type: "SET_ROOM_STATUS",
        payload: roomStatus
    }
}

export const joinRoom = (roomInfo) => {
    return {
        type: "JOIN_ROOM",
        payload: roomInfo
    }
}

export const leaveRoom = () => {
    return {
        type: "LEAVE_ROOM"
    }
}

export const changeTopic = (topic) => {
    return {
        type:"SET_TOPIC",
        payload: topic
    }
}

export const updateUserlist = (userlist) => {
    return {
        type: "UPDATE_USERLIST",
        payload: userlist
    }
}

export const updateRooms = (rooms) => {
    return {
        type: "UPDATE_ROOMS",
        payload: rooms
    }
}
