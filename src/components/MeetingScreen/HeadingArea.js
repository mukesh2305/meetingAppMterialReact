import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import {CrossIcon} from '../../assets/images/crossIcon.js'
import MinimizeIcon from '../../assets/images/minimizeIcon.svg'
import IconActions from './IconActions';


function HeadingArea() {
    const useStyles = makeStyles(theme => ({
        heading: {
            height: "42px",
            background: "#F3F2FF",
            borderRadius: "8px 8px 0px 0px",
            color: "#8492C2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        rightIcons: {
            position: "absolute",
            top: "13px",
            right: "0",
        },

    }))
  
    const classes = useStyles();
    return (
        <Box className={classes.heading}>
            <span>GROUP NOTES</span>
            <Box className={classes.rightIcons}>
                <IconActions src={MinimizeIcon} alt="minimise" marginProps='0 13px 0 0'/>
                <IconActions icon={<CrossIcon color="#8DA0C8"/>} src="" alt="cancel" marginProps='0 13px 0 0'/>
            </Box>
        </Box>
    )
}
export default HeadingArea;