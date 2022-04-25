import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Clock from '../../assets/images/clock.svg'
import Title from './Title';
import Input from './Input';
import IconActions from './IconActions';
import Grid from '@mui/material/Grid';
import ClickAway from '../ClickAwayListener/ClickAway';
import { EllipseBullet } from '../../assets/images/ellipseBullet';
import { LoaderLoop } from '../../assets/images/eclipse.svg';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addNotesAsync, creteActionItemsAsync } from '../../store/thunks/notes';
import PeopleCircle from './PeopleCircle';
import { getRandomColors } from '../../utils';


const socket = io.connect("http://localhost:5000");


function ActionItems({ action, updateNotesAsync, noteArray }) {
    const { notes, isLoading } = useSelector((state) => state.groupNotesReducer || {});
    const state = useSelector(state => state.selectedPeople.selectedPeople);
    console.log("loading++++++", notes)
    const [newAction, setNewAction] = useState([]);

    const useStyles = makeStyles(theme => ({
        actionItems: {
            padding: '40px 28px',
            cursor: 'auto !important'
        },
        actionBox: {
            display: 'flex'
        },
        rightIcons: {
            display: 'flex',
            marginLeft: 'auto',
            cursor: 'pointer !important'
        },
        actionInfo: {
            fontWeight: "500",
            fontSize: "14px",
            color: "#5B6987",
        },

        bulletAndActions: {
            display: 'flex',
            margin: '10px 0 10px',
        },
        bulletPts: {
            marginRight: '12px'
        },
        inputBox: {
            marginTop: '10px'
        }
    }))
    const [respArray, setRespArray] = useState({
        ...noteArray,
        action_items: noteArray.action_items || []
    });

    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [acItems, setAcItems] = useState(action || "");
    const [notAcItems, setNotAcItems] = useState("");

    const dispatch = useDispatch();
    const updateActionItems = (e, id) => {
        setEditMode(true);
        setSelectedId(id);
    }

    useEffect(() => {
        console.log(respArray.action_items);
    }, [respArray.action_items]);

    useEffect(() => {
        let note = notes?.map(n =>
            n.action_items && n.action_items.map(su => su.data)
        )
        // c
        setNewAction(note);
        setRespArray({
            ...noteArray,
            action_items: noteArray.action_items || []
        })
        console.log("notes======ssssssssssss", note);

    }, [notes, noteArray]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (bool) => {
        setEditMode(bool);


        if (acItems.length > 0) {
            setRespArray((prevState) => ({
                ...prevState,
                action_items: [{ 'data': acItems }]
            }));
            if (respArray) {
                if (typeof respArray.action_items[selectedId] === 'undefined') {
                    respArray.action_items.push({ 'data': acItems })
                }
                else {
                    respArray.action_items[selectedId]['data'] = acItems
                }
                respArray?.action_items.forEach(res => {
                    console.log("res.................", res.data)
                    // creteActionItemsAsync
                    dispatch(addNotesAsync(res?.data))
                })
                dispatch(updateNotesAsync(respArray));
            }
        }
    };


    // useEffect(() => {
    //     handleKeyDown(false);
    // }, [dispatch]);



    const handelChange = async (newData, diff = "change") => {
        if (diff === "change") {
            const newValues = {
                newData: newData,
                action_items: "action_items"
            }
            setAcItems(newData)
            await socket.emit("send_message", newValues);
            console.log(action, newData, "newData")
        }
    }

    useEffect(() => {
        socket.on("action_items", (data) => {
            console.log("datammmmmmmmmmmmmm", data)
            setAcItems(data)
        });
    }, [acItems])

    const classes = useStyles();

    const getInitials = (nameString) => {
        const string = nameString.split(' ').slice(0, 2).join('+')
        const matches = string.match(/\b(\w)/g);
        const initials = matches.join('');
        return initials.toUpperCase();
    }


    return (
        <Box className={classes.actionItems}>
            <Title title="Action Items" />
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    {newAction?.length !== 0
                        ? newAction?.map((val, index) =>
                            (val !== undefined && val !== "") && (
                                editMode && selectedId === index ?
                                    <Box className={classes.inputBox} key={index} >
                                        <Input color="#4186EE" inputStyle="" value={val} name='action_items' _onKeyDown={(e) => handleKeyDown(e)} _onChange={(e) => handelChange(e, "not_change")} />
                                    </Box> :
                                    <Box className={classes.actionBox} key={index}>
                                        <Box className={classes.bulletAndActions}>
                                            <Box className={classes.bulletPts}>
                                                <EllipseBullet color="#4186EE" />
                                            </Box>
                                            <Box className={classes.actionInfo} key={index} onClick={(e) => updateActionItems(e, index)}>{val}</Box>
                                        </Box>
                                        <Box className={classes.rightIcons}>
                                            <IconActions src={Clock} alt="clock" marginProps='0 21px 0 0' />
                                            <ClickAway />
                                        </Box>
                                    </Box>
                            )
                        )
                        : null}

                    <Box className={classes.actionBox}>
                        <Box className={classes.inputBox}>
                            <Input
                                color="#4186EE"
                                placeholder='Add New Action Item'
                                inputStyle=""
                                value={"[object Object]" ? "" : acItems}
                                name='action_items'
                                _onKeyDown={(e) => handleKeyDown(e)}
                                _onChange={(e) => handelChange(e)}
                            />
                        </Box>

                        <Box className={classes.rightIcons}>
                            <IconActions src={Clock} alt="clock" marginProps='0 21px 0 0' />
                            <ClickAway />
                        </Box>
                    </Box>
                    <Box>
                        {state?.map((val) => {
                            return (<Box className={classes.ellispseBox}>
                                <PeopleCircle classDefined='ellipses' name={getInitials(val.name)} width='30px' height='30px' colorCode={getRandomColors()} />
                            </Box>)
                        })}
                    </Box>
                </Grid>
            </Grid>
        </Box >

    )
}
export default ActionItems;
