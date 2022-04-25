import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'
import { toggleInviteMembers } from '../../store/actions/inviteMembers';

function IconActions({ src, alt,marginProps,icon }) {
    const useStyles = makeStyles(theme => ({
        iconAlignment: {
            display: 'inline-block',
            margin: marginProps,
            cursor: 'pointer'
        }
    }))
    const classes = useStyles();
    const dispatch = useDispatch();
    const iconAction=()=>{
        dispatch(toggleInviteMembers(false))
    }
    return (
        <div className={classes.iconAlignment} onClick={()=>iconAction()}>
            {src==""?icon:<img src={src} alt={alt} />}
        </div>
    )
}
export default IconActions;