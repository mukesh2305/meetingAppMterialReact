import { useEffect,  useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Presence } from "phoenix";
import SocketContext from '../socket/SocketContext'
import { getCurrentX,getCurrentY  } from "./MainActivity"

const MESSAGE_EVENT = "new_message"; // Name of the event
const REMOVE_USER_MESSAGE_EVENT = "removePositionMessage";

const SharePosition = (officeID) => {

    var [userCircleMap, setUserCircleMap] = useState(new Map());
    const currentUserID = useSelector((state) => state.authReducer.token);

    // const socketRef = useRef();
    const socket = useContext(SocketContext);
    const [channel, setChannel] = useState();
    const [presence, setPresence] = useState();

    useEffect(() => {
        if(!socket)
        {
            return;
        }

        // creating channel
        const channel = socket.channel("rtc:fogteams"+String(officeID));
        channel.join();
        let presence = new Presence(channel)
        setChannel(channel);
        setPresence(presence);
        
        /// Called when errors occur on the channel
        channel.onError( () => console.log("there was an error!") )

        /// Called when the channel is closed
        channel.onClose( () => console.log("the channel has gone away gracefully") )

        // Listens for incoming messages
        channel.on(MESSAGE_EVENT, (position) => {
            setUserCircleMap((userCircleMap) => {
                userCircleMap.set(position.senderID,{
                    ...position,
                    ownedByCurrentUser: currentUserID === position.senderID,
                    // socketID: created_by
                });
                return userCircleMap;
            });
        });

        
        // detect if user has joined for the 1st time or from another tab/device
        presence.onJoin((id, current, newPres) => {
            console.log("join = ",id, current, newPres);
            if(!current){
            console.log("user has entered for the first time", newPres)
            } else {
            console.log("user additional presence", newPres)
            }
        })
        
        // detect if user has left from all tabs/devices, or is still present
        presence.onLeave((id, current, leftPres) => {
            console.log("leave = ",id, current, leftPres);
            if(current.metas.length === 0){
                setUserCircleMap((userCircleMap) => {
                    var disconnectedSenderID = null;
                    for (let [key, value] of userCircleMap.entries()) {
                        if (value.socketID === id) {
                            disconnectedSenderID = key;
                        }
                    }
                    userCircleMap.delete(disconnectedSenderID);
                    return userCircleMap;
                });
            } else {
            console.log("user left from a device", leftPres);
            }
        })
        // receive presence data from server
        presence.onSync(() => {
            channel?.push(MESSAGE_EVENT, {
                X: getCurrentX(),
                Y: getCurrentY(),
                senderID: currentUserID,
            });
        // list of users  
        })

        return () => {socket.disconnect();};

    }, [officeID, socket]);

    function setPosition (positionBody, channel) {
        channel?.push(MESSAGE_EVENT, {
                ...positionBody, senderID: currentUserID
            });
    };

    return {userCircleMap, setPosition, channel}
}

export default SharePosition;