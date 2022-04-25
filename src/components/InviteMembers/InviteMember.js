import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import HeadingArea from './HeadingArea';
import EmailInvite from './EmailInvite';
import SuggestedMembers from './SuggestedMembers';
import { useDispatch, useSelector } from 'react-redux'
import { toggleInviteMembers } from '../../store/actions/inviteMembers';
function InviteMemebers() {


    const useStyles = makeStyles(theme => ({
        mainDiv: {
            position: 'absolute',
            zINdex:999,
            width: '448px',
            height: '451px',
            left: '459px',
            top: '159px',
            background: '#FFFFFF',
            boxshadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        overlay:{
            position:'fixed',
            zIndex:899,
            top:'0px',
            left:'0px',
            width:'100%',
            height:'100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
        }
    }))
    const classes = useStyles();
    return (
        <Box className={classes.overlay}>
            <Box className={classes.mainDiv}>
                <HeadingArea />
                <EmailInvite />
                <SuggestedMembers />    
            </Box>
        // </Box>
    )
}
export default InviteMemebers;