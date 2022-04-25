import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import {CrossIcon} from '../../assets/images/crossIcon.js'
import MinimizeIcon from '../../assets/images/minimizeIcon.svg'
import IconActions from './IconActions';
import { useDispatch, useSelector } from 'react-redux'
import { toggleInviteMembers } from '../../store/actions/inviteMembers';
import "../../assets/fonts/inter.css"

function HeadingArea() {
    const dispatch = useDispatch();

    const closeInviteMemberMenu = () => {
        dispatch(toggleInviteMembers(false))
    }
    const useStyles = makeStyles(theme => ({
        heading: {
            fontFamily: "Inter",
            paddingTop: "24px",
            paddingLeft: "24px",
            fontWeight: "600",
            fontSize: "20px",
            lineHeight: "24px",
            color: '#000000'
        },
        rightIcon: {
            position: "absolute",
            top: "16.8px",
            right: "19px",
        },

    }))

    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.heading}>
                <span>Invite Team members</span>
            </Box>
            <Box className={classes.rightIcon} onclick={() => closeInviteMemberMenu()}>
            <IconActions icon={<CrossIcon color="#8DA0C8"/>} src="" alt="cancel"/>
            </Box>
        </Box>
    )
}
export default HeadingArea;