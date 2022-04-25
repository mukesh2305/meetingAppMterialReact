import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Video from "../Video/Video";
import Audio from "../Audio/Audio";
import { setPinParticipant } from "../../store/actions/layout";
import classnames from "classnames";
import { videoShadow } from "../../utils";
import AudioLevelIndicator from "../AudioIndicator/AudioIndicator";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "grey",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        margin: "0 0.5rem !important",
        "& .largeVideo": {
            height: "160px",
            width: "160px",
            fontsize: "40pt"
        },
        "& .gridSeparator": {
            boxSizing: "border-box",
            border: "2px solid black"
        },
        "& .activeSpeaker": {
            boxSizing: "border-box",
            border: "2px solid #44A5FF"
        }
    },
    
    audioBox: {
        background: "transparent",
        position: "absolute",
        top: "0",
        display: "flex",
        justifyContent: "flex-end",
        padding: "8px",
        color: "white",
        "& svg": {
            fontSize: "1.5rem",
            background: "grey",
            borderRadius: "50%",
            padding: "5px"
        }
    },
    
    controls: {
        cursor: "pointer",
        color: "white",
        height: "20px",
        width: "20px",
        position: "absolute",
        margin: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    
    textBox: {
        bottom: 0,
        display: "flex",
        justifyContent: "flex-start",
        padding: "8px",
        color: "white",
        background: "transparent",
        position: "absolute"
    },
    
    avatarBox: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1
    },
    
    avatar: {
        fontSize: "2rem !important"
    }
    ,
    rightControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        padding: "8px",
        right: 0
    },
    
    handRaise: {
        marginLeft: "8px",
        color: "blue",
        lineHeight: "0 !important"
    }    
  }));
  
const VideoBox = ({
    participantTracks,
    participantDetails,
    localUserId,
    width,
    height,
    isPresenter,
    isBorderSeparator,
    isActiveSpeaker,
    isFilmstrip,
    isLargeVideo,
    proximityValue,
    // allUsers
}) => {
    const styles = useStyles();
    const videoTrack = isPresenter ? participantTracks?.find(track => track?.getVideoType() === "desktop") : participantTracks?.find(track => track?.isVideoTrack());
    const audioTrack = participantTracks.find(track => track.isAudioTrack());
    const { pinnedPartcipantId, raisedHandParticipantIds } = useSelector(state => state.layout);
    const avatarColors = useSelector(state => state.color);
    const audioIndicator = useSelector(state => state.audioIndicator);
    const dispatch = useDispatch();
    const [visiblePinParticipant, setVisiblePinPartcipant] = useState(false);
    let avatarColor = avatarColors[participantDetails?.id];
    let audioLevel = audioIndicator[participantDetails?.id];
    const [inputValue, setInputValue] = useState(1)

    const togglePinParticipant = (id) => {
        dispatch(setPinParticipant(id));
    }

    const borderActiveClasses = classnames({
        'gridSeparator': isBorderSeparator,
        'activeSpeaker': isActiveSpeaker
    });

    const audioIndicatorActiveClasses = classnames(styles.avatar, {
        'largeVideo': isLargeVideo,
    });

    const avatarActiveClasses = classnames(styles.avatarBox, {
        'gridSeparator': isBorderSeparator,
        'activeSpeaker': isActiveSpeaker
    });
    const micIcon = <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5h2z" fill="currentColor"></path></svg>;
    const micOffIcon = <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 11c0 1.19-.34 2.3-.9 3.28l-1.23-1.23c.27-.62.43-1.31.43-2.05H19m-4 .16L9 5.18V5a3 3 0 0 1 3-3a3 3 0 0 1 3 3v6.16M4.27 3L21 19.73L19.73 21l-4.19-4.19c-.77.46-1.63.77-2.54.91V21h-2v-3.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1c.81 0 1.6-.19 2.31-.52l-1.66-1.66L12 14a3 3 0 0 1-3-3v-.72L3 4.27L4.27 3z" fill="currentColor"></path></svg>;
    const pantool = <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M3 6.58v12.09C3 20.5 4.5 22 6.33 22h6.09c.9 0 1.75-.36 2.37-1l6.54-6.64s-1.05-1.03-1.08-1.04a.985.985 0 0 0-1.16-.11c-.03.01-3.59 2.05-3.59 2.05V5.33a1.25 1.25 0 0 0-1.25-1.25A1.25 1.25 0 0 0 13 5.33v5.84h-.83V3.25A1.25 1.25 0 0 0 10.92 2a1.25 1.25 0 0 0-1.25 1.25v7.92h-.84V4.08a1.25 1.25 0 0 0-1.25-1.25a1.25 1.25 0 0 0-1.25 1.25v7.09H5.5V6.58a1.25 1.25 0 0 0-1.25-1.25A1.25 1.25 0 0 0 3 6.58z" fill="currentColor"></path></svg>
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div
                style={{ width: `${width}px`, height: `${height}px`, opacity: inputValue }}
                onMouseEnter={() => setVisiblePinPartcipant(true)}
                onMouseLeave={() => setVisiblePinPartcipant(false)}
                className={styles.root}
            >
                <div className={styles.audioBox}>
                    {audioTrack?.isMuted() ? <span>{micOffIcon}</span> : <span className={styles.disable}>{micIcon}</span>}
                    {!audioTrack?.isLocal() && <Audio track={audioTrack} volume={proximityValue ? proximityValue : 0} />}
                </div>
                {
                    videoTrack?.isMuted() ?
                        <div className={avatarActiveClasses}>
                            <Avatar
                                size={80}
                                // src={participantDetails?.avatar ? participantDetails?.avatar : null}
                                style={isFilmstrip ? {
                                    boxShadow: videoShadow(audioLevel),
                                    background: avatarColor
                                } : { background: avatarColor }}
                                className={audioIndicatorActiveClasses}>
                                {participantDetails?.name.slice(0, 1).toUpperCase()}
                            </Avatar>
                        </div>
                        :
                        <div className={borderActiveClasses} style={{ width: `${width}px`, height: `${height}px` }}>
                            <Video isTransform={isPresenter} track={videoTrack} video={1} />
                        </div>
                }
                <div className={styles.textBox}>
                    <p>{localUserId === participantDetails?.id ? "You" : participantDetails?.name}</p>
                </div>
                <div>
                    <AudioLevelIndicator passedAudioLevel={audioLevel} />
                </div>
            </div>
        </div>
    )
}

export default VideoBox;
