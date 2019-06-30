import React from 'react';
import { connect } from "react-redux";
import SocketContext from "../contexts/SocketContext";
import Nickname from "./Nickname/Nickname";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { updateUser, updateUserlist, updateRooms, joinRoom, changeTopic, updateRoomChat } from "../actions/actions"

const style = {
     margin: "4% 10% 4% 10%",
     border: "3px solid black",
     borderRadius: "10px",
     boxShadow: "5px 5px 3px grey",
     backgroundColor: "Gainsboro",
     minHeight: "80VH"
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { socket } = this.context;
        const { roomStatus, room, updateUserlist, updateRooms, joinRoom, changeTopic, updateRoomChat } = this.props;
        socket.on("userlist", users => {
            updateUserlist(users);
        });

        socket.on("roomlist", rooms => {
            updateRooms(rooms)
        });

        socket.on("updateusers", (name, users, ops) => {
            const { roomStatus, room } = this.props;
            //console.log(roomStatus, name, room)
            if(roomStatus && name === room) {
                joinRoom({ name, users, ops });
            }
            //console.log("Room", room);
            //console.log("Users", users);
            //console.log("ops");
        });

        socket.on("updatetopic", (name, topic, username) => {
            const { room } = this.props;
            if(room === name) {
                changeTopic(topic);
            }
        });

        socket.on("updatechat", (name, history) => {
            const { room } = this.props;
            if(room === name) {
                updateRoomChat({ roomChat: history });
            }
        });

        socket.on("servermessage", (message, data, sender) => {
            //console.log("Message:", message);
            //console.log("Data:", data);
            //console.log("Sender:", sender);
        });
    }

    render() {
        const { nameSet, room } = this.props;
        //console.log(room);
        return (
            <div style={ style }>
                {
                    !nameSet
                    ? <Nickname />
                    : room === ""
                    ? <ChatList />
                    : <ChatRoom />
                }
            </div>
        );
    };
}

App.contextType = SocketContext;

const mapStateToProps = (reduxStoreState) => {
    //console.log("App", reduxStoreState);
    return {
        users: reduxStoreState.socket.users,
        rooms: reduxStoreState.socket.rooms,
        nameSet: reduxStoreState.user.nameSet,
        roomStatus: reduxStoreState.user.roomStatus,
        room: reduxStoreState.user.room
    };
}

export default connect(mapStateToProps, { updateUser, updateUserlist, updateRooms, joinRoom, changeTopic, updateRoomChat })(App);
