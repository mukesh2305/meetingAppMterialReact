import React from 'react';
import { makeStyles } from '@mui/styles';

function IconActions({ src, alt,marginProps,icon }) {
    const useStyles = makeStyles(theme => ({
        iconAlignment: {
            display: 'inline-block',
            margin: marginProps,
            cursor: 'pointer',
        }
    }))
    const classes = useStyles();
    const iconAction=()=>{
        console.log("hi")
    }
    return (
        <div className={classes.iconAlignment} onClick={()=>iconAction()}>
            {src==""?icon:<img src={src} alt={alt} />}
        </div>
    )
}
export default IconActions;