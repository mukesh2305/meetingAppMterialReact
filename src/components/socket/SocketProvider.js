import React, {useEffect, useState} from 'react'
import {Socket} from 'phoenix';
import SocketContext from './SocketContext';
import {getToken} from "../../utils";
import {WEB_SOCKET_URL} from "../../constants";
import { useSelector } from 'react-redux';


const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const currentUserID = useSelector((state) => state.authReducer.token);

    useEffect(() => {
        if (!currentUserID) {
            return;
        }
        const fetchData = async ()=> {
            const token = localStorage.getItem("sariska_token") ? localStorage.getItem("sariska_token"): await getToken(currentUserID);
            const params = {token};
            const s = new Socket(WEB_SOCKET_URL, {params});
            s.onOpen( () => console.log("connection open!") )
            s.onError( () => console.log("there was an error with the connection!") )
            s.onClose( () => console.log("the connection dropped") )
            s.connect();
            setSocket(s);
        }
        fetchData();
        return () => {
            socket && socket.disconnect();
        }
    }, [currentUserID]);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider