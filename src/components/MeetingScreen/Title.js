import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';


function Title({title}) {
    const useStyles = makeStyles(theme => ({
        title: {
            fontWeight: "600",
            fontSize: "20px",
            color: "#293856",
            marginBottom:'16px'
        },

    }))

    const classes = useStyles();
    return (
            <Box className={classes.title}>
               {title}
            </Box>

    )
}
export default Title;