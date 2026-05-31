'use client';

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserProvider";

const Context = createContext();
function SocketProvider({children}) {
    // const session = useSession();
    const {user} = useUser();
    const [socket,setSocket] = useState();
     useEffect(() => {

       const newSocket = io(`${process.env.NEXT_PUBLIC_URL}`, {
         withCredentials:true
       });
console.log('socket connected: ',newSocket.connected)
       setSocket(newSocket);

       return () => {
         newSocket.disconnect();
         console.log("🔌 Socket disconnected");
       };
     }, []);
    return (
        <Context.Provider value={{socket}}>
            {children}
        </Context.Provider>
    )
}

export function useSocketContext() {
  return useContext(Context);
}

export default SocketProvider
