import { createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext({
    socket: io("http://localhost:8080/")
});

export default SocketContext;
