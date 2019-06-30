import React from "react";

const RoomDetail = (props) => {
    const { name, joinRoom } = props;
    const style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: "1 1 33%",
        border: "1px solid gray",
        borderRadius: "5px",
        boxShadow: "6px 6px 2px gray",
        backgroundColor: "silver",
        maxWidth: "32%",
        marginTop: "5px"

    }

    const but = {
        backgroundColor: "lightskyblue",
        fontSize: "1.3em",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "5px"
    }

    const h2 = {
        color: "purple",
        fontSize: "1.8em",
        marginLeft: "5px"
    }

    return (
        <div style={ style }>
            <h2 style={ h2 }>{ name }</h2>
            <button style={ but } type="button" onClick={() => joinRoom(name)}>Join Room</button>
        </div>

    );
};

export default RoomDetail;
