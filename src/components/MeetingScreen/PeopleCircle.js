import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

function PeopleCircle({classDefined,name,width,height,colorCode}) {
    const useStyles = makeStyles(theme => ({
        halfEllipses: {
            width: width,
            height: height,
            borderRadius: '100%',
            background: `${colorCode}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        ellipses: {
            width: width,
            height: height,
            background: `${colorCode}`,
            borderRadius: '100%',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }))
    const classes = useStyles();
    return (
        <Box className={classes[classDefined]}>{name}</Box>
    )
}
export default PeopleCircle;