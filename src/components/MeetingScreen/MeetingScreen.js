import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import HeadingArea from './HeadingArea';
import MeetingDetails from './MeetingDetails';
import Agenda from './Agenda';
import TalkingPoints from './TalkingPoints';
import ActionItems from './ActionItems';
import { getNotesGroupDataAsync } from '../../store/thunks/notes';


function MeetingScreen({ notesData, addNotesAsync, updateNotesAsync, isLoading }) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(theme => ({
        meets: {
            lineHeight: '24px',
        },
        boxBody: {
            overflowY: 'scroll',
            maxHeight: '686px'
        }
    }))
    const classes = useStyles();
    useEffect(() => {
        dispatch(getNotesGroupDataAsync());
    }, [dispatch])
    let data = notesData
    return (
        <Box className={classes.meets} key={data.notes_id || null}>
            <HeadingArea />
            <Box className={classes.boxBody}>
                <MeetingDetails isLoading={isLoading} subject={data.subject || ''} noteArray={data || null} addNotesAsync={addNotesAsync} updateNotesAsync={updateNotesAsync} />
                <Agenda isLoading={isLoading} agendaInfo={data.data || ''} noteArray={data || null} updateNotesAsync={updateNotesAsync} addNotesAsync={addNotesAsync} />
                <TalkingPoints isLoading={isLoading} summary={data.summary || []} noteArray={data || null} updateNotesAsync={updateNotesAsync} addNotesAsync={addNotesAsync} />
                <ActionItems isLoading={isLoading} action={data.action_items || []} noteArray={data || null} updateNotesAsync={updateNotesAsync} addNotesAsync={addNotesAsync} />
            </Box>
        </Box>
    )
}
export default MeetingScreen;