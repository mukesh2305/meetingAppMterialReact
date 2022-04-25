import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Input from './Input';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import debounce from "lodash.debounce";
import throttle from 'lodash.throttle';


const socket = io.connect("http://localhost:5000");
function Agenda({ agendaInfo, addNotesAsync, updateNotesAsync, noteArray }) {
    const useStyles = makeStyles(theme => ({
        agenda: {
            padding: '0 24px',
            cursor: 'auto !important'
        },
        agendaTitle: {
            fontWeight: "600",
            fontSize: "16px",
            color: "#293856",

        },
        agendaInfo: {
            fontWeight: "500",
            fontSize: "14px",
            color: "#5B6987",
            margin: '10px 0 16px',
        },
        hrLine: {
            border: "1px solid #D0D6E2"
        },
        spacing: {
            margin: '10px 0 16px'
        },
        agendaBlank: {
            fontWeight: "500",
            fontSize: "16px",
            color: "#5B6987",
            fontStyle: "italic",
        }
    }));
    const [editMode, setEditMode] = useState(false)
    const [agenda, setAgenda] = useState(agendaInfo)
    const dispatch = useDispatch();
    const updateAgenda = () => {
        setEditMode(true);
    }
    const handleKeyDown = (bool) => {
        setEditMode(bool);
        const data = {
            ...noteArray,
            "data": agenda,
        }
        // console.log("data>>>>>>>>>>>>.++++", data)
        // if (noteArray && noteArray.notes_id) {
        //     dispatch(updateNotesAsync(data));
        // } else {
        dispatch(updateNotesAsync(data));
        //}

    }

    const handelChange = async (newData) => {
        const newValues = {
            newData: newData,
            agenda: "agenda"
        }
        await socket.emit("send_message", newValues);
        setAgenda(newData)
    }

    useEffect(() => {
        socket.on("agenda", (data) => {
            setAgenda(data)
        });
    }, [agenda])

    const classes = useStyles();
    const { details } = useSelector((state) => state.notesReducer || {});

    return (
        <Box className={classes.agenda}>
            <Box className={classes.agendaTitle}>
                Agenda
            </Box>
            {editMode ?
                <Box className={classes.spacing}>
                    <Input placeholder='New Agenda' value={agenda} color="" inputStyle="" name="data" _onChange={(e) => handelChange(e)} _onKeyDown={(e) => handleKeyDown(e)} />
                </Box>
                :
                <Box className={classes.agendaInfo} onClick={(e) => updateAgenda(e)}>
                    {agenda}
                </Box>
            }
            {!editMode && agenda === "" &&
                <Box className={classes.agendaBlank} onClick={(e) => updateAgenda(e)}>
                    <i>Write your agenda here</i>
                </Box>
            }

            <Box className={classes.hrLine}>
            </Box>
        </Box>

    )
}
export default Agenda;