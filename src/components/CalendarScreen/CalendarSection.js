import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { DownArrow } from '../../assets/images/downArrow.js'
import DatePicker from "react-datepicker";
import actions from "../../store/actions/calendarEvents"
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Grid, Paper } from '@mui/material';
import IconActions from './IconActions.js';

function CalendarSection() {

    const useStyles = makeStyles(theme => ({

        calendarDiv: {
            width: '243px',
            height: '291px',
            background: '#FFFFFF',
        },
        dateDiv: {
            cursor: 'pointer',
            width: '76.5px',
            height: '24px',
            margin: '14px 0px 14px 24px',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        dateText: {
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '24px',
            color: '#293856',
        },
        button: {
            cursor: 'pointer',
            width: '102px',
            height: '28px',
            marginTop: '12px',
            background: '#F2F7FF',
            borderRadius: '4px',
            padding: '2px 13px 2px 12.5px '
        },
        buttonText: {
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '24px',
            paddingRight: '6px'
        },

    }))
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat",]

    const convertToDate = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
        const arr = date.toLocaleString('en-US', options).split(' ')
        const strdate = arr[0] + " " + arr[2].slice(0, -1) + " " + arr[1] + " " + arr[3]
        return strdate;
    }
    const dispatch = useDispatch()


    const [startDate, setStartDate] = useState(new Date());
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.calendarDiv}>
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <Box className={classes.dateDiv} onClick={() => { }}>
                            <span className={classes.dateText}>
                                {dayNames[startDate.getDay()] + " " + startDate.getDate()}
                            </span>
                        </Box>
                    </Grid>
                    <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box className={classes.button} onClick={() => { }}>
                            <span className={classes.buttonText}>
                                10:00 AM
                            </span>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Divider />
            </Box>
            <Box >
                <DatePicker
                    inline
                    onChange={date => {
                        dispatch(actions.setFilterDate(convertToDate(date)))
                        setStartDate(date)
                    }}
                />
            </Box>

        </Paper>
    )
}
export default CalendarSection;