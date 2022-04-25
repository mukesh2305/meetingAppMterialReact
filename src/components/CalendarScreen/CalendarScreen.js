import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import CalendarSection from './CalendarSection';
import { styled, useTheme } from '@mui/material/styles';
import { CrossIcon } from '../../assets/images/crossIcon.js'
import IconActions from './IconActions';
import MeetingCard from './MeetingCard';
import { DownArrow } from '../../assets/images/downArrow.js'

function CalendarScreen(props) {
    const events = useSelector((state) => state.calendarEventsReducer.events)
    const [calendarStatus, setCalendarStatus] = useState(false)
    const filterDate = useSelector((state) => state.calendarEventsReducer.filterDate)
    let eventList = {}
    let eventElements = []
    const useStyles = makeStyles(theme => ({
        mainDiv: {
            transition: props.open ?
                'left 220ms cubic-bezier(0.4, 0, 0.6, 1) 0ms' :
                'left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            zIndex: 40,
            position: 'fixed',
            width: '297px',
            height: '100vh',
            left: props.open ? '285.1px' : '72px',
            top: '0px',
            background: '#F6F9FF',
        },
        heading: {
            paddingTop: "24px",
            paddingLeft: "24px",
        },
        headingText: {
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: '#6C7D95',
            fontStyle: 'normal',
        },
        rightIcon: {
            position: "absolute",
            top: "16.8px",
            right: "19px",
        },
        dateDiv: {
            cursor: 'pointer',
            marginTop: '12px',
            marginLeft: '24px'
        },
        dateText: {
            color: '#4186EE',
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
        },
        dateTitle: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '14px',
            linehHight: '24px',
            color: '#6C7D95'
        },
        iconAlignment: {
            display: 'inline-block',
            margin: '0 0 0 4px',
            cursor: 'pointer'
        },
        list: {
            overflowY: "auto",
            overflowX: 'hidden',
            listStyle: "none",
            height: !calendarStatus ? "670px" : "340px",
            '&::-webkit-scrollbar': {
                width: '0.5em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
            }
        },
        listItem: {
            marginTop: '20px',
            marginLeft: '24px'
        }
    }))

    const toggleCalendar = () => {
        setCalendarStatus(!calendarStatus)
    }

    const convertToDate = (event) => {
        const date = new Date(event.start.dateTime)
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
        const arr = date.toLocaleString('en-US', options).split(' ')
        const strdate = arr[0] + " " + arr[2].slice(0, -1) + " " + arr[1] + " " + arr[3]
        return strdate;
    }

    useEffect(() => {
            console.log(filterDate)
      }, [filterDate]);

    const classes = useStyles();
    return (
        <Box className={classes.mainDiv}>
            <Box className={classes.heading}>
                <span className={classes.headingText}>CALENDAR</span>
            </Box>
            <Box className={classes.rightIcon} onclick={() => { }}>
                <div className={classes.iconAlignment} onClick={() => props.func()}>
                    <CrossIcon color="#8DA0C8" />
                </div>
            </Box>
            <Box className={classes.dateDiv} >
                <span className={classes.dateText} >{filterDate ? filterDate.slice(0,-4) : convertToDate({'start':{'dateTime':new Date()}}).slice(0,-4) } </span>
                <IconActions icon={<DownArrow color="#4186EE" />} src="" alt="calendar" marginProps='0 0 0 4px' func={toggleCalendar} />
            </Box>
            <Box sx={{ marginTop: '20px', marginLeft: '24px', height: !calendarStatus ? '0px' : '321px' }}>
                {calendarStatus && <CalendarSection />}
            </Box>
            <Box className={classes.list}>
                {

                    events.map(event => {
                        const strdate = convertToDate(event)
                        let flag = false
                        let flag1 = !calendarStatus
                        if (!(strdate in eventList)) {
                            flag = true
                            eventList[strdate] = true
                        }
                        if (calendarStatus && strdate==filterDate)
                            flag1 = true;
                        return (
                            <Box>
                                {flag && flag1 &&
                                    <Box className={classes.listItem}>
                                        <span className={classes.dateTitle}>
                                            {strdate}
                                        </span>
                                    </Box>
                                }
                                {flag1 &&
                                    <Box className={classes.listItem}>
                                        <MeetingCard title={event.summary} stDate={event.start} enDate={event.end} />
                                    </Box>
                                }
                            </Box>)
                    })
                }

            </Box>
        </Box>
    )
}
export default CalendarScreen;