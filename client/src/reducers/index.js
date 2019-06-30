import { combineReducers } from "redux";
import user from "./userReducer";
import socket from "./socketReducer";
import room from "./roomReducer";
import chat from "./chatReducer";

export default combineReducers({
    user: user,
    socket: socket,
    room: room,
    chat: chat
});
