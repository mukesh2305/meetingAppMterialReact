import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PeopleCircle from './PeopleCircle';
import { useDispatch, useSelector } from "react-redux";
import { getRandomColors } from '../../utils/index'
import Input from './Input';

function MeetingDetails({ subject, addNotesAsync, updateNotesAsync, noteArray,isLoading }) {
    const useStyles = makeStyles(theme => ({
        meetingDetails: {
            padding: '24px 28px',
            cursor: 'auto !important'
        },

        dateTime: {
            width: "150px",
            height: "28px",
            background: "#F2F7FF",
            borderRadius: "4px",
            fontWeight: "500",
            fontSize: "14px",
            color: '#5B6987',
            textAlign: 'center'
        },
        meetingName: {
            fontWeight: "600",
            fontSize: "20px",
            color: "#293856",
        },
        ellispseBox: {
            fontWeight: "600",
            fontSize: "14px",
            textAlign: 'center',
            boxSizing: "border-box",
            border: "2px solid #FFFFFF",
            display: 'flex'
        },

        shareBtn: {
            width: "88px",
            height: "36px",
            background: "linear-gradient(360deg, #3960C6 0%, #1D6ADD 100%)",
            borderRadius: "4px",
            cursor: 'pointer',
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        shareBtnText: {
            color: '#fff',
            fontWeight: "600",
            fontSize: "16px",
        },
        meetNameBlank: {
            color: "#5B6987",
            fontStyle: "italic",
        }
    }))
    const [editMode, setEditMode] = useState(false)
    const [subjectName, setSubjectName] = useState(subject||'')
    const dispatch = useDispatch();


    const updateSubject = () => {
        setEditMode(true);
    }
    const handleKeyDown = (bool) => {
        setEditMode(bool);
        const data = {
            ...noteArray,
            "subject": subjectName,
        }
        // if (noteArray && noteArray.notes_id!=="*(For updating notes)") {
        //     dispatch(updateNotesAsync(data));
        // } else {
            dispatch(updateNotesAsync(data));
        //}
    }
    const handelChange = (newData) => {
        setSubjectName(newData)
    }
    
    const classes = useStyles();
    const payloadData = useSelector((state) => state.notesReducer || {});

    return (
        <Box className={classes.meetingDetails}>
            <Grid container >
                <Grid item xs={7}>
                    <Box className={classes.details}>
                        <Box className={classes.meetingName}>
                            {editMode ?
                                <Box><Input  placeholder="Meeting Name" inputStyle='subject' value={subjectName} color="" name="data" _onChange={(e) => handelChange(e)} _onKeyDown={(e) => handleKeyDown(e)} /></Box>
                                :
                                <Box onClick={(e) => updateSubject(e)}>{subjectName}</Box>
                            }
                            {!editMode && subjectName === "" &&
                                <Box className={classes.meetNameBlank} onClick={(e) => updateSubject(e)}>Meeting Name</Box>
                            }

                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Grid container >
                        <Grid item xs={6} className={classes.ellispseBox}>
                            <PeopleCircle classDefined='halfEllipses' colorCode={getRandomColors()} name={'AB'} width='36px' height='36px' />
                            <PeopleCircle classDefined='ellipses' colorCode={getRandomColors()} name={'BA'} width='36px' height='36px' />
                        </Grid>
                        <Grid item xs={6} className={classes.shareBtn}>
                            <Box className={classes.shareBtnText}>Share</Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box className={classes.dateTime}>
                Feb 12 at 03:00 PM
            </Box>
        </Box>





    )
}
export default MeetingDetails;