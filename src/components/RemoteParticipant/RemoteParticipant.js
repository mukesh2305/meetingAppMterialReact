import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import Video from "../Video/Video";
import Audio from  "../Audio/Audio";
import {getDefaultUsersPos} from "../IsometricMeeting/IsometricMeeting";

const useStyles = makeStyles((theme) => ({

    root: {
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "30"
    },

    participantRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "scroll",
        width: "100%",
        margin: "0.5rem"
    },
    videoContainer: {
        width: "64px",
        height: "64px",
        opacity: 1,
        borderRadius: "64px",
        objectFit: "cover",
        position: "absolute"
    }
}));
  

const RemoteParticipant = (props) => {
    const classes = useStyles();
    const conference = useSelector(state => state.conference);
    const remoteTracks = useSelector(state => state.remoteTrack);
    const userInVicinity = useSelector(state=>state.layout.userInVicinity);

    if (!conference) {
        return null;
    }

    if(props.isometric)
    {
        var remoteTrackList = []
        for ( const[k,v] of Object.entries(remoteTracks)){
            remoteTrackList = [...remoteTrackList, v]
        }
        const posList = getDefaultUsersPos();
        const PL = posList.length;
        return (
            <>
                { remoteTrackList.map((data, id)=>
                    <div key={id} style={{ position: "absolute", backgroundColor: "green", width: "128px", height: "128px", left: `${id>=PL-1?Math.random()+posList[PL-1].X:posList[id+1].X}px`,  top:  `${id>=PL-1?Math.random()+posList[PL-1].Y:posList[id+1].Y}px`}} className={classes.videoContainer}>
                        <Video borderRadius="64px" track={data && data[1]} video={1} />
                        <Audio track={data && data[0]}  />
                    </div>
                )}   
            </>
        );
    }
    else
    {

        return (
            <>
                { userInVicinity.map((participant, id)=>
                    <div key={id} style={{ position: "absolute", backgroundColor: "green", width: "128px", height: "128px", left: `${participant.X}px`,  top:  `${participant.Y-64}px`}} className={classes.videoContainer}>
                        <Video borderRadius="64px" track={remoteTracks[participant.senderID.toLowerCase()] && remoteTracks[participant.senderID.toLowerCase()][1]} video={1} />
                        <Audio track={remoteTracks[participant.senderID.toLowerCase()] && remoteTracks[participant.senderID.toLowerCase()][0]}  />
                    </div>
                )}   
            </>
        );
    }
}


export default RemoteParticipant;
