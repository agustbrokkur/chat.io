import React from "react";
import SocketContext from "../../contexts/SocketContext";
import { connect } from "react-redux";
import { updateRooms, userRoomStatus } from "../../actions/actions";
import RoomDetail from "../RoomDetail/RoomDetail";

const div = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    backgroundColor: "Gainsboro",
    minHeight: "80VH"
}

const div1 = {
    display: "flex",
    flexDirection: "column",
    border: "3px solid black",
    flexGrow: "2",
    justifyContent: "space-between",
    width: "100%"
}

const div2 = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"

}

const div3 = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "5%",
    borderTop: "3px solid black",
}

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rooms: []
        }
        this.joinRoom = this.joinRoom.bind(this);
    }

    joinRoom(roomName) {
        const { socket } = this.context;
        const { updateRooms, userRoomStatus } = this.props;

        socket.emit("joinroom", { room: roomName }, function(success, reason) {
            if(success) {
                userRoomStatus({ roomStatus: true, room: roomName });
            } else {
                console.log(reason);
            }
        });

        this.setState({
            name: ""
        });

        socket.emit("rooms");
    }

    render() {
        // Room name
        // Number of users
        // Join button
        const { name } = this.state;
        const { rooms } = this.props;
        return (
            <div style={ div }>
                <h1>
                    Chat Rooms
                </h1>
                <div style={ div1 }>
                    <div style={ div2 }>
                        {
                            Object.keys(rooms).map(r => <RoomDetail key={ r } name={ r } topic={ rooms[r].topic } joinRoom={ this.joinRoom } />)
                        }
                    </div>
                    <div style={ div3 }>
                        <h3 style={{ fontSize: "1.8em" }}>Create New Room</h3>
                        <input style={{ width: "200px", fontSize: "1.3em" }} type="text" value={ name } onChange={e => this.setState({ name: e.target.value })}  placeholder="Room Name"/>
                        <button style={ { marginTop: "5px", width: "210px", fontSize: "1.3em", backgroundColor: "#339933" } } type="button" onClick={() => this.joinRoom(name)}>Create Room</button>
                    </div>
                </div>
            </div>
        )
    }
}


ChatList.contextType = SocketContext;

const mapStateToProps = (reduxStoreState) => {
    return {
        rooms: reduxStoreState.socket.rooms
    };
}
export default connect(mapStateToProps, { updateRooms, userRoomStatus })(ChatList);
