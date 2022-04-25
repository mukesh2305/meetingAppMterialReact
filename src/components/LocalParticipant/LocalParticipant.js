import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SariskaMediaTransport from "sariska-media-transport";
import { addLocalTrack, removeAllLocalTracks } from '../../store/actions/track'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        right: "5.5rem",
        bottom: "1.25rem",
        zIndex: "30"
    }
}));


export default function LocalParticipant() {
    const classes = useStyles();
    SariskaMediaTransport.initialize();
    SariskaMediaTransport.setLogLevel(SariskaMediaTransport.logLevels.ERROR); //TRACE ,DEBUG, INFO, LOG, WARN, ERROR
    const dispatch = useDispatch();

    useEffect(()=>{
        const captureLocalStream = async () => {
            let tracks = await SariskaMediaTransport.createLocalTracks({devices: ["audio", "video"]});

            console.log("tracks, tracks", tracks);

            tracks.forEach(async track => {
                dispatch(addLocalTrack(track));
            });            
        }
        captureLocalStream();
    },[]);
    
    return null
}
