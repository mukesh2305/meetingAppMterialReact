import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import background from "../../assets/images/meetingImage.png";
import * as THREE from "three";
import ZonePlane from "../MainActivity/ZonePlane";
import UserCircle from '../MainActivity/UsersCircle';
import { useDispatch, useSelector } from 'react-redux'
import Video from "../Video/Video";
import MeetingScreen from '../MeetingScreen/MeetingScreen';
import { loadNotesAsync, addNotesAsync, updateNotesAsync } from "../../store/thunks/notes";
import Grid from '@mui/material/Grid';
import Masonry from '@mui/lab/Masonry';
import { Rnd } from 'react-rnd';

const style = {
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 104.77%)',
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
};

const cameraRef = React.createRef();
const rendererRef = React.createRef();

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: "0px"
        // margin: "auto",
        // backgroundColor: "#1b1e23",
    },
    canvasImage: {
        width: "100vw",
        height: "100vh"
    },
    boardStyle: {
        width: '100%',
        height: '100vh',
        margin: "auto",
        // width: '80%',
        // height: '90%',
        // margin: " 30px auto",
        border: "1px solid #ccc",
        backgroundColor: "#f3f3f3",
    },
    videoContainer: {
        width: "128px",
        height: "128px",
        opacity: 1,
        borderRadius: "64px",
        objectFit: "cover",
        position: "absolute",
        backgroundColor: "green",
    }
}));

var boardWidth = 50, boardHeight = 30;
export function getDefaultUsersPos() {
    var posList = [
        { X: -15.5, Y: -1 },
        { X: -9.5, Y: 6 },
        { X: -0.5, Y: 6 },
        { X: 7, Y: 6 },
        { X: -9.5, Y: -7.7 },
        { X: -0.8, Y: -8 },
        { X: 6.6, Y: -8 },
    ]

    if (!rendererRef.current || !cameraRef.current) {
        return [];
    }

    const widthHalf = 0.5 * rendererRef.current.getContext().canvas.width;
    const heightHalf = 0.5 * rendererRef.current.getContext().canvas.height;
    for (var i = 0; i < 7; i++) {
        var vector = new THREE.Vector3(posList[i].X, posList[i].Y, 0);
        vector.project(cameraRef.current);
        posList[i].X = (vector.x * widthHalf) + widthHalf + 25;
        posList[i].Y = - (vector.y * heightHalf) + heightHalf + 25;
    }

    return posList;
}

export default function IsometricMeeting() {
    const mountRef = useRef(null);
    const [audioTrack, videoTrack] = useSelector(state => state.localTrack);
    const { notes, isLoading } = useSelector((state) => state.notesReducer || {});


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, boardWidth / boardHeight);
        camera.position.z = 0.866 * boardHeight;
        cameraRef.current = camera;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);
        const bg = ZonePlane({
            width: boardWidth,
            height: boardHeight,
            texture: background,
            X: 0,
            Y: 0,
        });
        // const user1 = UserCircle({X:"-15.5", Y:"-1"})
        // const user2 = UserCircle({X:"-9.5", Y:"6"})
        // const user3 = UserCircle({X:"-0.5", Y:"6"})
        // const user4 = UserCircle({X:"7", Y:"6"})
        // const user5 = UserCircle({X:"-9.5", Y:"-7.7"})
        // const user6 = UserCircle({X:"-0.8", Y:"-8"})
        // const user7 = UserCircle({X:"6.6", Y:"-8"})
        scene.add(bg);
        // scene.add(user1);
        // scene.add(user2);
        // scene.add(user3);
        // scene.add(user4);
        // scene.add(user5);
        // scene.add(user6);
        // scene.add(user7);
        var animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        console.log(bg, 'background');
        console.log(animate(), 'animate');
    }, []);

    const classes = useStyles()
    const localPos = getDefaultUsersPos()[0];
    if (!localPos) {
        return (

            <Box className={classes.root}>
                <div ref={mountRef} className={classes.boardStyle} />
            </Box>
        );
    }
    return (
        <Box className={classes.root}>
            {/* <Grid container>
                <Grid item xs={8}> */}
            <div ref={mountRef} className={classes.boardStyle} />
            <div style={{ top: `${localPos.Y}px`, left: `${localPos.X}px`, }} className={classes.videoContainer}>
                <Video borderRadius="64px" track={videoTrack} video={1} />
            </div>
            {/* </Grid> */}
            {/* <Grid item xs={4}> */}
            <Rnd
                style={style}
                default={{
                    x: 950,
                    y: 50,
                    width: 464,
                    height: 728,
                }}
            >
                <MeetingScreen notesData={notes ? notes : {}} isLoading={isLoading} addNotesAsync={addNotesAsync} updateNotesAsync={updateNotesAsync} />
            </Rnd>
            {/* </Grid> */}
            {/* </Grid> */}
        </Box >
    );
}