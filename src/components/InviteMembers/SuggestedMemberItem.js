import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import "../../assets/fonts/inter.css"

function SuggestedMemberItem(props) {
    console.log(props.email)
    const useStyles = makeStyles(theme => ({
        listText: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: '24px',
            opacity: "0.5"
        },
        listItem: {
            marginLeft: '8px !important',
            marginTop: '4px'
        },
        invite: {
            cursor: 'pointer'
        },
        inviteText: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#2069DB',
        },
        inivteGrid: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '24px'
        }
    }))
    const classes = useStyles();
    return (
        <React.Fragment key={props.email}>
            <ListItem
                key={props.email}
                className={classes.listItem}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box>
                            <span className={classes.listText}> {props.email}</span>
                        </Box>
                    </Grid>
                    <Grid item item xs={6} className={classes.inivteGrid}>
                        <Box className={classes.invite} onClick={() => { }}>
                            <span className={classes.inviteText}> + Invite</span>
                        </Box>
                    </Grid>
                </Grid>
            </ListItem >
        </React.Fragment>
    )
}
export default SuggestedMemberItem;