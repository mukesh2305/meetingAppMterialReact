import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import PeopleCircle from './PeopleCircle';
import {CrossIcon} from '../../assets/images/crossIcon.js'
import {getRandomColors} from '../../utils/index'


function AssignedPeople({ personName, onDelete,name }) {
    const useStyles = makeStyles(theme => ({
        assignedPeople: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15.2px',
            cursor:'pointer !important'
        },
        personName: {
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "24px",
            color: "#5B6987",
            marginLeft: '12px',
            width: "158px",
            overflow:"hidden", 
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
        ,
        ellispseBox: {
            fontWeight: "600",
            fontSize: "14px",
            textAlign: 'center',
            boxSizing: "border-box",
            border: "2px solid #FFFFFF",


        },
        close: {
            marginLeft: '32px'
        },
        crossIcon: {
            verticalAlign: '-webkit-baseline-middle'
        }

    }))
    const classes = useStyles();
    return (
        
            <Box className={classes.assignedPeople}>
                <Box className={classes.ellispseBox}>
                    <PeopleCircle classDefined='ellipses' name={name} width='30px' height='30px' colorCode={getRandomColors()} />
                </Box>
                <Box className={classes.personName} title={personName}>{personName}</Box>
                <Box className={classes.close}>
                <Box onClick={onDelete} className={classes.crossIcon}><CrossIcon color="#293856"/></Box>
            </Box>
            </Box>

        
    )
}
export default AssignedPeople;