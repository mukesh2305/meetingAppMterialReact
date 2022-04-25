import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    video: {
        transform: "scaleX(-1)!important"
    }
  }));
  

const Video = props => {
    const classes = useStyles();
    const { track, isPresenter, video, borderRadius } = props;
    const videoElementRef = useRef(null);
    useEffect(() => {
        track?.attach(videoElementRef.current);
    }, [track]);

    if (!track) {
        return null;
    }

    return (<video playsInline="1" autoPlay='1' className={!isPresenter && classes.video} ref={videoElementRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity : video, borderRadius: borderRadius ? borderRadius : "none"  }} />);
}

export default Video;
