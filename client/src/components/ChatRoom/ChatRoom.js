import React from "react";
import { connect } from "react-redux";
import SocketContext from "../../contexts/SocketContext";
import { leaveRoom, userRoomStatus } from "../../actions/actions";
import ChatMessage from "../ChatMessage/ChatMessage";
import UserListDetail from "../UserListDetail/UserListDetail";

const style = {
    display: "flex",
    flexDirection: "column",
    minHeight: "80VH",
    textAlign: "center",
}

const leaveDiv = {
    display: "flex",
    justifyContent: "space-between"

}

const leaveStyle = {
    backgroundColor: "red",
    minWidth: "100px",
    minHeight: "50px",
    fontSize: "1.1em",
    margin: "5px 20px 5px 0px"
}

const chatUserList = {
    display: "flex",
    flexFlow: "row nowrap",
    maxHeight: "66VH",
    minHeight: "66VH",
    border: "3px solid black"
}

const chatStyle = {
    overflowY: "scroll",
    overflowAnchor: "auto",
    backgroundColor: "white",
    flexBasis: "90%"
}

const userListStyle = {
    overflowY: "scroll",
    overflowAnchor: "auto",
    backgroundColor: "white",
    flexBasis: "10%"
}

const messageStyle = {
    display: "flex",
    flexDirection: "row"
}

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }
    }

    sendMessage(room, message, user) {
        const { socket } = this.context;
        socket.emit("sendmsg", { roomName: room, msg: message });

        this.setState({
            message: ""
        });
    }

    leaveRoom(roomName) {
        const { socket } = this.context;
        const { leaveRoom, userRoomStatus } = this.props;

        userRoomStatus({ roomStatus: false, room: "" });
        leaveRoom();

        socket.emit("partroom", roomName);
    }

    render() {
        const { room, user, ops, topic, users, chat } = this.props;
        const { message } = this.state;
        return(
            <div style={ style }>
                <div style={ leaveDiv }>
                    <div></div>
                    <h2 style={{ fontSize: "2em", color: "purple" }}>{ room }</h2>
                    <button style={ leaveStyle } type="button" onClick={() => this.leaveRoom(room)}>Leave Room</button>
                </div>
                <div style={ chatUserList }>
                    <div style={ chatStyle }>
                        {
                            chat !== undefined
                            ? chat.map(c => <ChatMessage key={ c.timestamp } nick={ c.nick } timestamp={ c.timestamp } message={ c.message } />)
                            : <div></div>
                        }
                    </div>
                    <div style={ userListStyle }>
                        {
                            Object.keys(ops).map(o => <UserListDetail key={ o } name={ o } />)
                        }
                        {
                            Object.keys(users).map(u => <UserListDetail key={ u } name={ u } />)
                        }
                    </div>
                </div>
                <div style={ messageStyle }>
                    <input style={{ width: "100%", fontSize: "1.3em" }} type="text" value={ message } onChange={e => this.setState({ message: e.target.value })}  placeholder="Enter message here..."/>
                    <button style={{ minWidth: "10%", fontSize: "1.3em"  }} type="button" onClick={() => this.sendMessage(room, message, user)}>Send Message</button>
                </div>
            </div>
        )
    }
}

ChatRoom.contextType = SocketContext;

const mapStateToProps = (reduxStoreState) => {
    //console.log("ChatRoom", reduxStoreState);
    return {
        room: reduxStoreState.user.room,
        ops: reduxStoreState.room.ops,
        topic: reduxStoreState.room.topic,
        users: reduxStoreState.room.users,
        user: reduxStoreState.user.name,
        chat: reduxStoreState.chat.roomChat
    };
}

export default connect(mapStateToProps, { leaveRoom, userRoomStatus })(ChatRoom);
