import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SariskaMediaTransport from "sariska-media-transport";
import { setDisconnected, setDominantSpeakerId } from "../../store/actions/layout";
import {
    addLocalTrack,
    addRemoteTrack,
    removeRemoteTrack,
    remoteTrackMutedChanged,
    localTrackMutedChanged,
    removeLocalTrack,
} from "../../store/actions/track";
import { makeStyles } from '@mui/styles';
import { addConnection, removeConnection } from "../../store/actions/connection";
import { addConference, removeConference } from "../../store/actions/conference";
import { setPresenter, setPinParticipant, setRaiseHand } from "../../store/actions/layout";
import { setAudioLevel } from "../../store/actions/audioIndicator";
import { showNotification } from "../../store/actions/notification";
import { getToken } from '../../utils';
import Tooltip from '@mui/material/Tooltip';



const useStyles = makeStyles((theme) => ({
    controlsContainer: {
        position: "fixed",
        left: "50%",
        bottom: 0,
        transform: "translate(-50%, 0)",
        marginBottom: "2.5rem",
        backgroundColor: "transparent",
        zIndex: 30
    },
    mediaControls: {
        padding: "0 1rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "row",
        borderRadius: "25px"
    },
    iconMedia: {
        height: "36px",
        width: "36px",
        backgroundColor: "#F5F7F9;",
        margin: "0.5rem 0.75rem",
        borderRadius: "50%",
        fontSize: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    }
}));

const MediaControls = () => {
    const classes = useStyles();
    const [presenting, setPresenting] = useState(false);
    const [connection, setConnection] = useState(null);
    const [conference, setConference] = useState(null);
    const [start, setStart] = useState(false);
    const currentUserID = useSelector((state) => state.authReducer.token);


    const layout = useSelector((state) => state.layout);
    const dispatch = useDispatch();

    const localTracks = useSelector(state => state.localTrack);
    const [audioTrack, videoTrack] = localTracks;

    const muteAudio = async () => {
        await audioTrack.mute();
        dispatch(localTrackMutedChanged());
    };

    const unmuteAudio = async () => {
        await audioTrack.unmute();
        dispatch(localTrackMutedChanged());
    };

    const muteVideo = async () => {
        await videoTrack.mute();
        dispatch(localTrackMutedChanged());
    };

    const unmuteVideo = async () => {
        await videoTrack.unmute();
        dispatch(localTrackMutedChanged());
    };

    const shareScreen = async () => {
        const videoTrack = localTracks.find(track => track.videoType === "camera");
        const [desktopTrack] = await SariskaMediaTransport.createLocalTracks({
            resolution: 720,
            devices: ["desktop"],
            desktopSharingFrameRate: {
                min: 40,
                max: 60
            },
            constraints: {
                video: {
                    height: {
                        ideal: 720,
                        max: 720,
                        min: 720
                    }
                }
            }
        });

        conference.replaceTrack(videoTrack, desktopTrack);
        desktopTrack.addEventListener(SariskaMediaTransport.events.track.LOCAL_TRACK_STOPPED, async () => {
            stopPresenting();
        });
        setPresenting(true);
        conference.setLocalParticipantProperty("presenting", "start");
        dispatch(addLocalTrack(desktopTrack));
        dispatch(setPresenter(conference.myUserId()));
    }

    const stopPresenting = async () => {
        const videoTrack = localTracks.find(track => track.videoType === "camera");
        const desktopTrack = localTracks.find(track => track.videoType === "desktop");
        await conference.replaceTrack(desktopTrack, videoTrack);
        dispatch(setPresenter(null));
        dispatch(removeLocalTrack(desktopTrack));
        conference.setLocalParticipantProperty("presenting", "stop");
        setPresenting(false);
    }

    const createConnection = async (roomId) => {

        console.log("createConnection");

        const token = localStorage.getItem("sariska_token") ? localStorage.getItem("sariska_token") : await getToken(currentUserID);

        const connection = new SariskaMediaTransport.JitsiConnection(token, roomId);

        connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
            dispatch(addConnection(connection));
            createConference(connection);
        });

        connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, (error) => {
            if (error === SariskaMediaTransport.errors.connection.CONNECTION_DROPPED_ERROR) {
                dispatch(setDisconnected(true));
            }
        });

        connection.addEventListener(SariskaMediaTransport.events.connection.PASSWORD_REQUIRED, (error) => {
            //connection.setToken(token); // token expired, set a new token
        });

        connection.connect();
    }

    const createConference = async (connection) => {

        const conference = connection.initJitsiConference();

        conference.addEventListener(SariskaMediaTransport.events.conference.CONFERENCE_JOINED, async () => {
            dispatch(addConference(conference));
            setConference(conference);
        });

        conference.getParticipantsWithoutHidden().forEach(item => {
            if (item._properties?.presenting === "start") {
                dispatch(showNotification({ autoHide: true, message: `Screen sharing is being presenting by ${item._identity?.user?.name}` }));
                dispatch(setPresenter(item._id));
            }
            if (item._properties?.handraise === "start") {
                dispatch(setRaiseHand({ participantId: item._id, raiseHand: true }));
            }
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.TRACK_ADDED, (track) => {
            if (track.isLocal()) {
                return;
            }
            console.log("TRACK_ADDED", track);
            dispatch(addRemoteTrack(track));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.TRACK_REMOVED, (track) => {
            dispatch(removeRemoteTrack(track));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.TRACK_MUTE_CHANGED, (track) => {
            dispatch(remoteTrackMutedChanged());
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.DOMINANT_SPEAKER_CHANGED, (id) => {
            dispatch(setDominantSpeakerId(id));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.PARTICIPANT_PROPERTY_CHANGED, (participant, key, oldValue, newValue) => {
            if (key === "presenting" && newValue === "start") {
                dispatch(showNotification({ autoHide: true, message: `Screen sharing started by ${participant._identity?.user?.name}` }));
                dispatch(setPresenter(participant._id));
            }
            if (key === "presenting" && newValue === "stop") {
                dispatch(setPresenter(null));
            }
            if (key === "handraise" && newValue === "start") {
                dispatch(setRaiseHand({ participantId: participant._id, raiseHand: true }));
            }
            if (key === "handraise" && newValue === "stop") {
                dispatch(setRaiseHand({ participantId: participant._id, raiseHand: false }));
            }
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.USER_LEFT, (id) => {
            if (id === layout.pinnedParticipantId) {
                dispatch(setPinParticipant(null))
            }
            if (id === layout.presenterParticipantId) {
                dispatch(setPresenter(null));
            }
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.NOISY_MIC, () => {
            dispatch(showNotification({ autoHide: true, message: "Your mic seems to be noisy", severity: "info" }));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.TALK_WHILE_MUTED, () => {
            dispatch(showNotification({ autoHide: true, message: "Trying to speak?  your are muted!!!", severity: "info" }));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.NO_AUDIO_INPUT, () => {
            dispatch(showNotification({ autoHide: true, message: "Looks like device has no audio input", severity: "warning" }));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.TRACK_AUDIO_LEVEL_CHANGED, (participantId, audioLevel) => {
            // dispatch(setAudioLevel({ participantId, audioLevel }));
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.USER_JOINED, (id) => {
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.CONFERENCE_ERROR, (id) => {
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.CONFERENCE_FAILED, (a, b, c) => {
        });

        conference.addEventListener(SariskaMediaTransport.events.conference.CONFERENCE_LEFT, (id) => {
        });

        conference.join();
    }


    const updateNetwork = () => { // set internet connectivity status
        SariskaMediaTransport.setNetworkInfo({ isOnline: window.navigator.onLine });
    };

    const destroy = async () => {
        if (conference?.isJoined()) {
            await conference.leave();
        }
        await connection?.disconnect();
    }

    useEffect(() => {
        if (!layout?.activeRoomId) {
            return;
        }
        createConnection(layout?.activeRoomId);

        return () => {
            destroy();
        }
    }, [layout?.activeRoomId]);

    useEffect(() => {
        if (conference && localTracks.length) {
            console.log("add new track here...............", localTracks);
            localTracks.forEach(track => conference.addTrack(track));
        }
    }, [localTracks, conference])

    useEffect(() => {
        window.addEventListener("offline", updateNetwork);
        window.addEventListener("online", updateNetwork);
    }, [])

    const mic = <svg width="1em" height="1em" viewBox="0 0 19 25" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.2816 0.311523C11.7292 0.311523 13.7134 2.29572 13.7134 4.74334V12.499C13.7134 14.9467 11.7292 16.9308 9.2816 16.9308C6.83398 16.9308 4.84979 14.9467 4.84979 12.499V4.74334C4.84979 2.29572 6.83398 0.311523 9.2816 0.311523ZM10.3896 21.2941V22.4706H13.7134V24.6865H4.84979V22.4706H8.17365V21.2941C3.80132 20.7489 0.417969 17.0191 0.417969 12.499V10.2831H2.63388V12.499C2.63388 16.1705 5.61017 19.1467 9.2816 19.1467C12.953 19.1467 15.9293 16.1705 15.9293 12.499V10.2831H18.1452V12.499C18.1452 17.0191 14.7619 20.7489 10.3896 21.2941ZM7.06552 4.74379C7.06552 3.51997 8.05761 2.52788 9.28143 2.52788C10.5052 2.52788 11.4973 3.51997 11.4973 4.74379V12.4995C11.4973 13.7233 10.5052 14.7154 9.28143 14.7154C8.05761 14.7154 7.06552 13.7233 7.06552 12.4995V4.74379Z" fill="#6C7D95" />
    </svg>;
    const muteMic = <svg width="1em" height="1em" viewBox="0 0 19 25" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.2816 0.311523C11.7292 0.311523 13.7134 2.29572 13.7134 4.74334V12.499C13.7134 14.9467 11.7292 16.9308 9.2816 16.9308C6.83398 16.9308 4.84979 14.9467 4.84979 12.499V4.74334C4.84979 2.29572 6.83398 0.311523 9.2816 0.311523ZM10.3896 21.2941V22.4706H13.7134V24.6865H4.84979V22.4706H8.17365V21.2941C3.80132 20.7489 0.417969 17.0191 0.417969 12.499V10.2831H2.63388V12.499C2.63388 16.1705 5.61017 19.1467 9.2816 19.1467C12.953 19.1467 15.9293 16.1705 15.9293 12.499V10.2831H18.1452V12.499C18.1452 17.0191 14.7619 20.7489 10.3896 21.2941ZM7.06552 4.74379C7.06552 3.51997 8.05761 2.52788 9.28143 2.52788C10.5052 2.52788 11.4973 3.51997 11.4973 4.74379V12.4995C11.4973 13.7233 10.5052 14.7154 9.28143 14.7154C8.05761 14.7154 7.06552 13.7233 7.06552 12.4995V4.74379Z" fill="#6C7D95" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19 25 l-19 -25" fill="#6C7D95" stroke="#6C7D95" stroke-width="2"></path>
    </svg>;
    const video = <svg width="25" height="17" viewBox="0 0 25 17" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.22372 0.743164H15.5192C16.743 0.743164 17.7351 1.73526 17.7351 2.95907V4.49078L24.3829 1.16685V15.8318L17.7351 12.5079V14.0386C17.7351 15.2624 16.743 16.2545 15.5192 16.2545H2.22372C0.999909 16.2545 0.0078125 15.2624 0.0078125 14.0386V2.95907C0.0078125 1.73526 0.999909 0.743164 2.22372 0.743164ZM17.7351 10.0304L22.167 12.2464V4.75226L17.7351 6.96824V10.0304ZM2.22372 2.95907V14.0386H15.5192V2.95907H2.22372Z" fill="#6C7D95" />
    </svg>;
    const videoOff = <svg width="25" height="21" viewBox="0 0 25 21" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.22372 2.743164H15.5192C16.743 2.743164 17.7351 3.73526 17.7351 4.95907V6.49078L24.3829 3.16685V17.8318L17.7351 14.5079V16.0386C17.7351 17.2624 16.743 18.2545 15.5192 18.2545H2.22372C0.999909 18.2545 0.0078125 17.2624 0.0078125 16.0386V4.95907C0.0078125 3.73526 0.999909 2.743164 2.22372 2.743164ZM17.7351 12.0304L22.167 14.2464V6.75226L17.7351 8.96824V12.0304ZM2.22372 4.95907V16.0386H15.5192V4.95907H2.22372Z" fill="#6C7D95" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 21 l-18 -21" fill="#6C7D95" stroke="#6C7D95" stroke-width="2"></path>
    </svg>;

    const screenShare = <svg width="26" height="23" viewBox="0 0 26 23" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5277 19.2551V20.3631H7.31179V22.579H18.3913V20.3631H16.1754V19.2551H22.8232C24.047 19.2551 25.0391 18.2631 25.0391 17.0392V2.63583C25.0391 1.41202 24.047 0.419922 22.8232 0.419922H2.87997C1.65616 0.419922 0.664062 1.41202 0.664062 2.63583V17.0392C0.664062 18.2631 1.65616 19.2551 2.87997 19.2551H9.5277ZM22.8232 17.0392H2.87997V2.63583H22.8232V17.0392Z" fill="#6C7D95" />
    </svg>;

    return (
        <>
            <div className={classes.controlsContainer}>
                <div className={classes.mediaControls}>
                    <Tooltip title={audioTrack?.isMuted() ? "Unmute Audio" : "Mute Audio"}>
                        {audioTrack?.isMuted() ?
                            <div className={classes.iconMedia} onClick={unmuteAudio}>{muteMic}</div> :
                            <div className={classes.iconMedia} onClick={muteAudio}>{mic}</div>
                        }
                    </Tooltip>
                    <Tooltip title={videoTrack?.isMuted() ? "Unmute Video" : "Mute Video"}>
                        {videoTrack?.isMuted() ?
                            <div className={classes.iconMedia} onClick={unmuteVideo}>{videoOff}</div> :
                            <div className={classes.iconMedia} onClick={muteVideo}>{video}</div>
                        }
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default MediaControls
