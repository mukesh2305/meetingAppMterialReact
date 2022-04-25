import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/calendarEvents'

function IconActions({ src, alt, marginProps, icon ,func}) {
    const useStyles = makeStyles(theme => ({
        iconAlignment: {
            display: 'inline-block',
            margin: marginProps,
            cursor: 'pointer'
        }
    }))
    const classes = useStyles();
    const dispatch = useDispatch();
    console.log(alt)
    const iconAction = () => {
        if (alt == 'cancelAuthcode')
        {
            dispatch(actions.toggleAuthCodeScreen(false))
        }
        if (alt == 'calendar')
        {
            console.log("inin")
            func()
        }
    }
    return (
        <div className={classes.iconAlignment} onClick={() => iconAction()}>
            {src == "" ? icon : <img src={src} alt={alt} />}
        </div>
    )
}
export default IconActions;