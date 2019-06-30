import React from "react";

const UserListDetail = (props) => {
    const { name } = props;
    const style = {
        marginLeft: "5px",
        fontSize: "1.3em",
        marginTop: "2px",
        marginBottom: "2px",
        textAlign: "left",
        color: "blue"
    }
    return (
        <p style={ style } >{ name }</p>
    );
};

export default UserListDetail;
