import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({             
    socialButtons: {
        width: "424px",
        height: "64px",
        marginTop: "24px",
        border: "2px solid rgba(105,105,105, .5)",
        boxSizing: "border-box",
        borderRadius: "4px",
        textAlign: "center",
        padding: "16px",
        cursor: "pointer"
    },
    socialBtnText: {
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#000000",
        display: "inline-block",
        padding: "0px 25px",
        verticalAlign: "middle"
    }
}));
  

  
function SocialButtons(props) {
    const classes = useStyles();
    const {imageName, tagline } = props

    return (
        <div className={classes.socialButtons}>
           <img src={imageName} alt="Social Icon" /> 
           <div className={classes.socialBtnText}>{tagline}</div>
        </div>

    )
}
export default SocialButtons
