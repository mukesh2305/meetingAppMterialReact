import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'

function MeetingCard(props) {
    const useStyles = makeStyles(theme => ({

        mainDiv: {
            width: '241px',
            height: '64px',
            background: '#FFFFFF',
            padding: '12px',
        },
        titleDiv: {
            height: '24px',
        },
        titleText: {
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '24px',
            color: '#293856',
        },
        dateDiv: {
            height: '24px',
        },
        dateText: {
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '24px',
            color: '#8F9CAF',
        },

    }))
    const separator = " - "
    const [startDate, setStartDate] = useState(new Date());
    const classes = useStyles();
    const startdate = new Date(props.stDate.dateTime)
    const enddate = new Date(props.enDate.dateTime)
    return (
        <Box className={classes.mainDiv}>
            <Box className={classes.titleDiv}>
                <span className={classes.titleText}>
                    {props.title}
                </span>
            </Box>
            <Box className={classes.dateDiv}>
                <span className={classes.dateText}>
                    {startdate.toLocaleString('en-US', { hour: '2-digit', hour12: true, minute: '2-digit' })}
                    {separator}
                    {enddate.toLocaleString('en-US', { hour: '2-digit', hour12: true, minute: '2-digit' })}
                </span>
            </Box>
        </Box>
    )
}
export default MeetingCard;