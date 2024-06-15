import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import json from '../ip.json';


const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  // const socket = useMemo(() => io("localhost:8000"), []);
  // console.log(json)
  const socket = useMemo(() => io(json.ip+":8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};