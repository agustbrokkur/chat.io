import React from "react";
import SocketContext from "../../contexts/SocketContext";
import { connect } from "react-redux";
import { updateUser, updateUserlist, updateRooms } from "../../actions/actions";

const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
}

const otherStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const h1 = {
    margin: "20% 0% 15% 0",
    fontSize: "4em",
    fontStyle: "italic",
    marginTop: "14VH",
    marginBottom: "14VH"
}

const p = {
    fontSize: "2em",
    margin: "0 0 5% 0"
}

const div = {
    display: "flex",
    flexDirection: "column",

}

class Nickname extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: props.socket,
            name: "",
            nameChecked: false // Check if the user has tried selecting a nickname yet
        }
    };

    sendMessage(name) {
        const { socket } = this.context;
        const { updateUser } = this.props;

        socket.emit("adduser", name, function(available){
            if (available){
                updateUser({
                    name: name,
                    nameSet: true,
                    roomStatus: false,
                    room: ""
                });
            }
        });

        this.setState({
            name: "",
            nameChecked: true
        });
        socket.emit("users");
        socket.emit("rooms");
    }

    render() {
        const { name } = this.state;
        return (
            <div style={ style }>
                <h1 style={ h1 }>Chat.io</h1>
                <div>
                    {
                        this.state.nameChecked
                        ? <h3 style={{ color: "red" }}>NAME UNAVAILABLE</h3>
                        : <div></div>
                    }
                    <p style={ p }>Select a username</p>
                    <div style={ otherStyle }>
                        <input style={{ width: "200px", fontSize: "1.3em" }} type="text" value={ name } onChange={e => this.setState({ name: e.target.value })}  placeholder="Select a nickname"/>
                        <button style={{ fontSize: "1.3em", minWidth: "210px", backgroundColor: "white" }} type="button" onClick={() => this.sendMessage(name)}>Enter</button>
                    </div>
                </div>
            </div>
        );
    };
};

Nickname.contextType = SocketContext;

const mapStateToProps = (reduxStoreState) => {
    //console.log("Nickname", reduxStoreState)
    return {
        userlist: reduxStoreState.socket.users
    };
};

export default connect(mapStateToProps, { updateUser, updateUserlist, updateRooms })(Nickname);
