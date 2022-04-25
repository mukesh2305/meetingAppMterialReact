import React, { useEffect, useRef, useState } from 'react'
import background from "../../assets/images/mainActivityBg.png";
import { makeStyles } from '@mui/styles';
import * as THREE from "three";
import SharePosition from "./SharePosition";
import UserCircle from './UsersCircle';
import Button from '@mui/material/Button'
import { Box, useStepContext } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { setVicinityUser } from '../../store/thunks/video';
import Video from "../Video/Video";
import {
    floorPlane,
    office1,
    office2,
    workSpaceLeft,
    workSpaceRight,
    hallRight,
    hallCenter,
    hallLeft,
    work1,
    work2,

} from "./Sections"
import { useNavigate } from "react-router-dom";

// LOOPING ISSUE IN FOG
// 
// MainActivity.js   -- line 270
// MediaControl.js  -- line 234

const progressRef = React.createRef();
const progressRefX = React.createRef();
const progressRefY = React.createRef();
const progressRefCurrentUser = React.createRef();

export const getCurrentX = () => { return progressRefX.current };
export const getCurrentY = () => { return progressRefY.current };
const x = window.innerWidth;
const y = window.innerHeight;
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100vh",
        position: "absolute",
        left: "60px",
        top: "0px"
    },
    canvasImage: {
        width: "100%",
        height: "100vh"
    },
    boardStyle: {
        width: '100%',
        height: '100vh',
        margin: "auto",
        border: "1px solid #ccc",
        backgroundColor: "#f3f3f3",
    },
    textStyle: {
        position: "absolute",
        bottom: "5%",
        right: "5%",
        color: 'black',
        fontSize: "25px",
        weight: "400",
    },
    videoContainer: {
        width: "128px",
        height: "128px",
        opacity: 1,
        borderRadius: "64px",
        objectFit: "cover",
        position: "absolute"
    }
}));

function toScreenPosition(obj, camera, renderer) {
    var vector = new THREE.Vector3();

    var widthHalf = 0.5 * window.innerWidth;
    var heightHalf = 0.5 * window.innerHeight;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = - (vector.y * heightHalf) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };

};


function fromScreenPosition(camera, x, y) {
    var vec = new THREE.Vector3();
    var pos = new THREE.Vector3();

    vec.set(
        (x / window.innerWidth) * 2 - 1,
        - (y / window.innerHeight) * 2 + 1,
        0.5);

    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    var distance = - camera.position.z / vec.z;
    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    return pos;
};


function getUserInVicinity(UserID, camera, renderer, listOfOtherUserId = null, vicinityRadius = 5) {
    const userCircleM = progressRef.current;
    var ls = [];
    for (const [k, v] of userCircleM) {
        ls = [...ls, k];
    }
    if (!listOfOtherUserId) {
        listOfOtherUserId = ls;
    }
    var userInVcinity = [];
    var X, Y;
    if (UserID === progressRefCurrentUser.current) {
        X = progressRefX.current;
        Y = progressRefY.current;
    }
    else {
        X = userCircleM.get(UserID).X;
        Y = userCircleM.get(UserID).Y;
    }
    const origin = new THREE.Vector2(X, Y);

    for (var index = 0; index < listOfOtherUserId.length; index++) {
        var UID = listOfOtherUserId[index];
        if (userCircleM.has(UID)) {
            const x = userCircleM.get(UID).X;
            const y = userCircleM.get(UID).Y;
            const target = new THREE.Vector2(x, y);
            const dist = origin.distanceTo(target);
            var userData = { ...userCircleM.get(UID) };

            var myVector = new THREE.Vector3();
            var widthHalf = 0.5 * renderer.getContext().canvas.width;
            var heightHalf = 0.5 * renderer.getContext().canvas.height;
            myVector.set(x, y, 0);
            myVector.project(camera);
            userData.X = (myVector.x * widthHalf) + widthHalf;
            userData.Y = - (myVector.y * heightHalf) + heightHalf;

            if (dist <= vicinityRadius) {
                userInVcinity = [...userInVcinity, userData];
            }
        }
    }
    return userInVcinity
}

export default function Activity() {
    const dispatch = useDispatch()
    const officeID = 1; // hardcoding roomID
    const [inCall, setInCall] = useState(false);
    const { userCircleMap, setPosition, channel } = SharePosition(officeID);
    const [X, setX] = useState(Math.floor(Math.random() * 5));
    const [Y, setY] = useState(Math.floor(Math.random() * 5));
    progressRefX.current = X;
    progressRefY.current = Y;
    const [pixelX, setPixelX] = useState(100);
    const [pixelY, setPixelY] = useState(100);
    const [poke, setPoke] = useState(false);
    const mountRef = useRef(null);
    progressRef.current = userCircleMap;
    const camUserRadiusX = 10;
    const camUserRadiusY = 5;
    const currentUserID = useSelector((state) => state.authReducer.token);
    var currentUserInVicinity = useSelector((state) => state.layout.userInVicinity);
    progressRefCurrentUser.current = currentUserID;
    const [audioTrack, videoTrack] = useSelector(state => state.localTrack);
    const [currentPlaneZone, setCurrentPlaneZone] = useState([]);

    useEffect(() => {


        // setting scene, camera, renderer
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        mountRef.current.appendChild(renderer.domElement);
        camera.position.z = 15;
        renderer.setSize(x / 1.001, y / 1.001);

        // setting background image
        var boardWidth = 100, boardHeight = 30;
        scene.add(floorPlane);
        scene.add(office1);
        scene.add(office2);
        scene.add(workSpaceLeft);
        scene.add(workSpaceRight);
        scene.add(hallRight);
        scene.add(work1);
        scene.add(work2);
        scene.add(hallCenter);
        scene.add(hallLeft);

        const planeList = [hallCenter, office1, office2, workSpaceLeft, workSpaceRight, hallRight, work1, work2, hallLeft];

        // geometry for local user
        const currentUserCircle = UserCircle({
            current: true,
            X: X,
            Y: Y
        });


        // creating bounding box for detecting section in office

        var animate = function () {

            requestAnimationFrame(animate);
            var planesBoundingBox = [], planesBoundingBoxCollision = [];
            const currentUserBoundingBox = new THREE.Box3().setFromObject(currentUserCircle);
            for (var i = 0; i < planeList.length; i++) {
                var item = planeList[i];
                if (item.geometry.type === 'PlaneGeometry') {
                    var bb = new THREE.Box3().setFromObject(item);
                    planesBoundingBox = [...planesBoundingBox, bb]
                    planesBoundingBoxCollision = [...planesBoundingBoxCollision, currentUserBoundingBox.intersectsBox(bb)]
                }
            }
            setCurrentPlaneZone(planesBoundingBoxCollision);

            for (var i = 0; i < scene.children.length; i++) {
                if (scene.children[i].geometry.type === 'CircleGeometry') {
                    scene.remove(scene.children[i]);
                    i--;
                }
            }

            // userBB = [];
            // bbCollision = [];
            scene.add(currentUserCircle);
            var pixelCood = toScreenPosition(currentUserCircle, camera, renderer);
            setPixelX(pixelCood['x']);
            setPixelY(pixelCood['y']);
            // userBB = [new THREE.Box3().setFromObject(currentUserCircle)]

            // setting other user's circle
            function createCircle(value, key, map) {
                if (value) {
                    if (value.ownedByCurrentUser) return;
                    var circle = UserCircle({
                        current: value.ownedByCurrentUser,
                        X: value.X,
                        Y: value.Y,
                    })
                    scene.add(circle);
                    // userBB = [...userBB, new THREE.Box3().setFromObject(circle)];
                    // bbCollision = [...bbCollision, userBB[0].intersectsBox(userBB[userBB.length-1])]
                }
            }
            progressRef.current.forEach(createCircle);
            // dispatch(setVicinityUser(getUserInVicinity(currentUserID, camera, renderer)));

            // if(getUserInVicinity(currentUserID, camera, renderer).length>0)
            // {
            //     setPoke(true);
            // }
            // else
            // {
            //     setPoke(false);
            // }
            renderer.render(scene, camera);
        };

        animate();

        const getFrustum = () => {
            const frustum = new THREE.Frustum();
            frustum.setFromProjectionMatrix(
                new THREE.Matrix4().multiplyMatrices(
                    camera.projectionMatrix,
                    camera.matrixWorldInverse
                )
            );
            return frustum;
        };

        var range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

        const checkMoveCamX = x => {

            const camV = new THREE.Vector3();
            const userV = new THREE.Vector3();
            camera.getWorldPosition(camV);
            currentUserCircle.getWorldPosition(userV);
            camV['z'] = userV['z'];
            // const dist = camV.distanceTo(userV);
            const dist = Math.abs(userV['x'] - camV['x']);
            if (camV['x'] > userV['x'] && camUserRadiusX > dist) { return true; }
            else if (camV['x'] > userV['x'] && camUserRadiusX < dist && x < 0) {
                const yLimit = range(-boardHeight / 2, boardHeight / 2);
                var check = yLimit.map(y => {
                    const frustum = getFrustum();
                    const tmpV = new THREE.Vector3();
                    tmpV['x'] = x;
                    tmpV['y'] = y;
                    tmpV['z'] = 0;
                    return frustum.containsPoint(tmpV);
                });
                return (check.filter(boolVal => boolVal).length > 0)
            }
            else if (camV['x'] > userV['x'] && camUserRadiusX < dist && x > 0) { return true; }
            else if (camV['x'] < userV['x'] && camUserRadiusX > dist) { return true; }
            else if (camV['x'] < userV['x'] && camUserRadiusX < dist && x < 0) { return true; }
            else if (camV['x'] < userV['x'] && camUserRadiusX < dist && x > 0) {
                const yLimit = range(-boardHeight / 2, boardHeight / 2);
                var check = yLimit.map(y => {
                    const frustum = getFrustum();
                    const tmpV = new THREE.Vector3();
                    tmpV['x'] = x;
                    tmpV['y'] = y;
                    tmpV['z'] = 0;
                    return frustum.containsPoint(tmpV);
                });
                return (check.filter(boolVal => boolVal).length > 0)
            }
            else {
                return true;
            }
        };

        const checkMoveCamY = y => {

            const camV = new THREE.Vector3();
            const userV = new THREE.Vector3();
            camera.getWorldPosition(camV);
            currentUserCircle.getWorldPosition(userV);
            camV['z'] = userV['z'];
            // const dist = camV.distanceTo(userV);
            const dist = Math.abs(userV['y'] - camV['y']);

            if (camV['y'] > userV['y'] && camUserRadiusY > dist) { return true; }
            else if (camV['y'] > userV['y'] && camUserRadiusY < dist && y < 0) {
                const xLimit = range(-boardWidth / 2, boardWidth / 2);
                var check = xLimit.map(x => {
                    const frustum = getFrustum();
                    const tmpV = new THREE.Vector3();
                    tmpV['x'] = x;
                    tmpV['y'] = y;
                    tmpV['z'] = 0;
                    return frustum.containsPoint(tmpV);
                });
                return (check.filter(boolVal => boolVal).length > 0)
            }
            else if (camV['y'] > userV['y'] && camUserRadiusY < dist && y > 0) { return true; }
            else if (camV['y'] < userV['y'] && camUserRadiusY > dist) { return true; }
            else if (camV['y'] < userV['y'] && camUserRadiusY < dist && y < 0) { return true; }
            else if (camV['y'] < userV['y'] && camUserRadiusY < dist && y > 0) {
                const xLimit = range(-boardWidth / 2, boardWidth / 2);
                var check = xLimit.map(x => {
                    const frustum = getFrustum();
                    const tmpV = new THREE.Vector3();
                    tmpV['x'] = x;
                    tmpV['y'] = y;
                    tmpV['z'] = 0;
                    return frustum.containsPoint(tmpV);
                });
                return (check.filter(boolVal => boolVal).length > 0)
            }
            else {
                return true;
            }
        };

        const updateXY = () => {
            var coordinate = new THREE.Vector3();
            currentUserCircle.getWorldPosition(coordinate);
            setX(coordinate['x']);
            setY(coordinate['y']);
            progressRefX.current = coordinate['x'];
            progressRefY.current = coordinate['y'];
            setPosition({ 'X': coordinate['x'], 'Y': coordinate['y'] }, channel);
        };

        const step = 0.5;
        const offset = 0.8;
        // function to control user circle
        let controlCircle = function (e) {

            const myPos = new THREE.Vector3();
            currentUserCircle.getWorldPosition(myPos);
            const pressedKey = e.keyCode;
            if (pressedKey === 39) {
                var limit = boardWidth / 2 - offset;
                if (myPos['x'] < limit - 3 * offset) {
                    currentUserCircle.translateX(step);
                    updateXY();
                }
                if (!checkMoveCamX(limit)) {
                    camera.translateX(step);
                }
            }
            else if (pressedKey === 37) {
                var limit = -boardWidth / 2 + offset;
                if (myPos['x'] > limit + 3 * offset) {
                    currentUserCircle.translateX(-step);
                    updateXY();
                }
                if (!checkMoveCamX(limit)) {
                    camera.translateX(-step);
                }
            }
            else if (pressedKey === 38) {

                var limit = boardHeight / 2 - offset;
                if (myPos['y'] < limit - offset) {
                    currentUserCircle.translateY(step);
                    updateXY();
                }
                if (!checkMoveCamY(limit)) {
                    camera.translateY(step);
                }
            }
            else if (pressedKey === 40) {
                var limit = -boardHeight / 2 + offset;
                if (myPos['y'] > limit + offset) {
                    currentUserCircle.translateY(-step);
                    updateXY();
                }

                if (!checkMoveCamY(limit)) {
                    camera.translateY(-step);
                }
            }
        }


        const handleMouseDoubleClick = (e) => {
            if (e.detail !== 2) return;
            const pos = fromScreenPosition(camera, e.clientX, e.clientY);
            const myPos = new THREE.Vector3();
            currentUserCircle.getWorldPosition(myPos);
            const dx = pos['x'] - myPos['x'];
            const dy = pos['y'] - myPos['y'];

            const effectiveDist = Math.sqrt(dx * dx + dy * dy);
            const effectiveVelocity = 0.5;
            const effeciveTime = effectiveDist / effectiveVelocity;
            const numIter = 100;
            var delayInMilliseconds = effeciveTime / numIter; //0.001 second
            const stepX = Math.abs(dx) / numIter;
            const stepY = Math.abs(dy) / numIter;
            for (var i = 0; i < numIter; i++) {
                setTimeout(function () {

                    if (dx > 0) {
                        var limit = boardWidth / 2 - offset;
                        if (myPos['x'] < limit - 3 * offset) {
                            currentUserCircle.translateX(stepX);
                            updateXY();
                            if (!checkMoveCamX(limit)) {
                                camera.translateX(stepX);
                            }
                        }
                    }
                    else {
                        var limit = -boardWidth / 2 + offset;
                        if (myPos['x'] > limit + 3 * offset) {
                            currentUserCircle.translateX(-stepX);
                            updateXY();
                            if (!checkMoveCamX(limit)) {
                                camera.translateX(-stepX);
                            }
                        }
                    }
                    if (dy > 0) {
                        var limit = boardHeight / 2 - offset;
                        if (myPos['y'] < limit - offset) {
                            currentUserCircle.translateY(stepY);
                            updateXY();
                            if (!checkMoveCamY(limit)) {
                                camera.translateY(stepY);
                            }
                        }
                    }
                    else {
                        var limit = -boardHeight / 2 + offset;
                        if (myPos['y'] > limit + offset) {
                            currentUserCircle.translateY(-stepY);
                            updateXY();
                            if (!checkMoveCamY(limit)) {
                                camera.translateY(-stepY);
                            }
                        }
                    }
                }, delayInMilliseconds);
            }
        }

        // added event for keypressing
        document.addEventListener("keydown", controlCircle, false);
        // document.querySelector(".makeStyles-boardStyle-66").addEventListener("click", handleMouseDoubleClick, false);


        return () => mountRef.current.removeChild(renderer.domElement);
    }, [channel,]);


    const classes = useStyles()

    const navigate = useNavigate()
    if (currentPlaneZone[1]) {
        navigate('./meeting/room1', { replace: true });
    }
    else if (currentPlaneZone[2]) {
        navigate('./meeting/room1', { replace: true });
    }

    return (
        <Box className={classes.root}>
            <div ref={mountRef} className={classes.boardStyle} />
            <div>
                {poke ?

                    <Button
                        onClick={() => {
                            setPoke(false);
                            setInCall(true);
                        }}
                        variant="contained"
                        style={{ "position": "absolute", "left": `${pixelX}px`, "top": `${pixelY}px` }}>
                        poke
                    </Button>

                    : null}
                <div style={{ position: "absolute", top: `${pixelY - 64}px`, left: `${pixelX - 64}px`, backgroundColor: "green" }} className={classes.videoContainer}>
                    <Video borderRadius="64px" track={videoTrack} video={1} />
                </div>
            </div>
        </Box>

    );
}

