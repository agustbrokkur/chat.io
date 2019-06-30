import React from "react";

const ChatMessage = (props) => {
    const { nick, timestamp, message } = props;
    const style = {
        marginLeft: "5px",
        fontSize: "1.3em",
        marginTop: "2px",
        marginBottom: "2px",
        textAlign: "left",
    }

    const styleName = {
        display: "inline",
        color: "blue"
    }

    const styleMessage = {
        display: "inline",
        color: "green"
    }

    return (
        <div style={ style }>
            <p style={ styleName }>{ nick }</p>: <p style={ styleMessage }>{ message }</p>
        </div>
    );
};

export default ChatMessage;
