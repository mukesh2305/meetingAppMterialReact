import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { searchIcon } from '../../assets/images/leftnavbar/icons.js'
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/styles';
function SearchArea() {
    const useStyles = makeStyles(theme => ({
        mainDiv: {
            display: 'flex',
            width: '262px',
            height: "48px",
            display: 'flex',
            backgroundColor: '#F5F7F9',
        },
        icon: {
            paddingLeft: "14px",
            paddingTop: "14px"
        },
        textField: {
            paddingLeft: "21px",
            paddingTop: "12px"
        },
        listItem:{
            paddingLeft: "12px!important", 
            paddingRight: "12px!important",
            paddingBottom: "28px!important",
        }
    }))
    const classes = useStyles();

    return (
        <ListItem className={classes.listItem}>
            <Box className={classes.mainDiv}>
                <Box className={classes.icon}>
                    <img src={searchIcon}></img>
                </Box>
                <Box className={classes.textField}>
                    <TextField
                        placeholder='Quick Search'
                        InputProps={{
                            disableUnderline: true,
                        }}
                        inputProps={{
                            style: {
                                padding: '0px',
                                fontFamily: 'Inter',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '24px',
                                color: '#000000',
                            }
                        }}
                        variant="standard"
                    />
                </Box>
            </Box>
        </ListItem>
    )
}
export default SearchArea;