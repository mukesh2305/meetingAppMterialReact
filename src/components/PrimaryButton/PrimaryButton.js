import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({             
     continueButtton: {
        marginTop:"16px",
        width: "392px",
        height: "32px",
        padding:"16px",
        background: "linear-gradient(360deg, #3960C6 0%, #1D6ADD 100%)",
        borderRadius: "4px",
        textAlign:"center",
        cursor: "pointer"
    }, 
    submitBtn: {
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "32px",
        color: "#FFFFFF",
        background: "none",
        border: 0
    }
}));
  
function ContinueBtn(props) {
    const classes = useStyles();

    return (
        <div className={classes.continueButtton} onClick={props.continueAhead} >
            <div>
            <input className={classes.submitBtn} type="submit" value="Continue"  />
            </div>
        </div>

    )
}
export default ContinueBtn;
