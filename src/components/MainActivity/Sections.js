import ZonePlane from './ZonePlane';
import background from "../../assets/images/mainActivityBg.png";

var boardWidth = 100, boardHeight = 30;

export const floorPlane = ZonePlane({
    width: boardWidth,
    height: boardHeight,
    texture: background,
    X:0,
    Y:0
});

export const office1 = ZonePlane({
    width: 13.5,
    height: 8.8,
    transparent: true,
    X:0.8,
    Y:boardHeight/2 - 4.5
});

export const office2 = ZonePlane({
    width: 20.8,
    height: 8.8,
    transparent: true,
    X:-16.8,
    Y:boardHeight/2 - 4.5
});

export const workSpaceLeft = ZonePlane({
    width: 20.8,
    height: 8.8,
    transparent: true,
    X:-boardWidth/2 + 10.7,
    Y:boardHeight/2 - 4.5
});


export const workSpaceRight = ZonePlane({
    width: 39,
    height: 20,
    transparent: true,
    X:boardWidth/2 - 22.2,
    Y:boardHeight/2 - 10
});


export const hallRight = ZonePlane({
    width: 12.5,
    height: 8.5,
    transparent: true,
    X:boardWidth/2 - 8.95,
    Y:-boardHeight/2 + 4.5
});


export const work1 = ZonePlane({
    width: 11.5,
    height: 8.5,
    transparent: true,
    X:boardWidth/2 - 22.9,
    Y:-boardHeight/2 + 4.5
});


export const work2 = ZonePlane({
    width: 11.5,
    height: 8.5,
    transparent: true,
    X:boardWidth/2 - 35.6,
    Y:-boardHeight/2 + 4.5
});


export const hallCenter = ZonePlane({
    width: 14,
    height: 15,
    transparent: true,
    X:0.8,
    Y:-boardHeight/2 + 8
});


export const hallLeft = ZonePlane({
    width: 15,
    height: 12.5,
    transparent: true,
    X:-boardWidth/2 + 8,
    Y:boardHeight/2 - 15.7
});