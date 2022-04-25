import { useState, useEffect } from "react";
import {
    config,
    useClient,
    useMicrophoneAndCameraTracks,
    channelName,
} from "./settings.js";
import { Grid } from "@material-ui/core";
import Video from "./Video";
import UserVideo from "./UserVideo.js";
import Controls from "./Controls";

export default function VideoCall(props) {
    const { setInCall, posX, posY, px2, py2} = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(true);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
                console.log("User subscribed");
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            try {
                await client.join(config.appId, name, config.token, null);
            } catch (error) {
                console.log("error " + error);
            }

            if (tracks) {
                await client.publish(tracks);
            }
            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channelName);
            } catch (error) {
                console.log(error);
            }
        }
    }, [client, ready, tracks]);


    return (
        <div>
<div>{start && tracks && (<Video tracks={tracks} users={users} posX = {posX} posY = {posY}  />)}</div>);
        <div>{start && tracks && (<UserVideo tracks={tracks} users={users} posX = {px2} posY = {py2}  />)}</div>);
        </div>
        );
        
        // // <Grid container direction="column" style={{ height: "100%" }}>
        //     {/* <Grid style={{ height: "5%" }}>
        //         {ready && tracks && (
        //             <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        //         )}
        //     </Grid> */}
        //     {/* <Grid style={{ height: "90%", padding : "10px" }}> */}
            
                    
        //     {/* </Grid> */}
        // {/* </Grid> */}
    
}
