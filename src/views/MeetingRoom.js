import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Rnd } from "react-rnd";
import bgImg from '../assets/images/mainActivityBg.png'
import { makeStyles } from '@mui/styles';
import MeetingScreen from '../components/MeetingScreen/MeetingScreen';
import { useDispatch, useSelector } from "react-redux";
import { loadNotesAsync, addNotesAsync, updateNotesAsync } from "../store/thunks/notes";

function MeetingRoom() {
    const useStyles = makeStyles(theme => ({
        bgTemporary: {
            height: '100vh',
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
        }
    }))
    const style = {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 104.77%)',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNotesAsync());
    }, []);

    const classes = useStyles();
    const { notes, isLoading } = useSelector((state) => state.notesReducer || {});
    // console.log(notes, "notes>>>>>>>>>>>>>>>>")

    return (
        <Grid container>
            <Grid item xs={12} className={classes.bgTemporary}>
                <Rnd
                    style={style}
                    default={{
                        x: 950,
                        y: 50,
                        width: 464,
                        height: 728,
                    }}
                >
                    <MeetingScreen notesData={notes ? notes : {}} isLoading={isLoading} addNotesAsync={addNotesAsync} updateNotesAsync={updateNotesAsync} />
                </Rnd>
            </Grid>
        </Grid>

    )
}
export default MeetingRoom
