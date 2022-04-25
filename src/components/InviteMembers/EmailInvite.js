import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, TextField } from '@mui/material';
import { CopyLink } from '../../assets/images/copyLink.js'
import IconActions from './IconActions';
import "../../assets/fonts/inter.css"
function EmailInvite() {
    const useStyles = makeStyles(theme => ({
        meetingDetails: {
            padding: '24px 28px',
        },
        heading: {
            fontFamily: "Inter",
            fontStyle:"normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: '24px',
            paddingTop: "24px",
            paddingLeft: "24px"
            // paddingLeft: "24px",
        },
        emailInputdiv: {
            display: 'flex',
            width: '267px',
            height: "64px",
            display: 'flex',
            backgroundColor: '#F4F4F4',
            marginLeft: '24px',
            marginTop: '12px'
        },
        emailInput: {
            padding: '20px 24px !important',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24px',
        },
        sendInvite: {
            width: '122px',
            height: '64px',
            background: 'linear-gradient(360deg, #3960C6 0%, #1D6ADD 100%)',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '12px',
            paddingTop: '16px',
            paddingLeft: '18px'
        },
        sendInviteText: {
            fontFamily: "Inter",
            fontStyle:"normal",
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '32px',
            color: '#FFFFFF',
        },
        addMember: {
            width: '115px',
            height: '24px',
            marginLeft: '24px',
            marginTop: '15px',
            cursor: 'pointer'
        },
        addMemberText: {
            fontFamily: "Inter",
            fontStyle:"normal",
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#2069DB',
        },
        sendLink: {
            height: '24px',
            marginTop: '15px',
            cursor: 'pointer'
        },
        sendLinkText: {
            fontFamily: "Inter",
            fontStyle:"normal",
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#2069DB',
            paddingLeft: "5px"
        },
        divider: {
            borderBottomWidth: '1.5px  !important',
            marginTop: '20px !important',
            width: '400px  !important',
            marginLeft: '24px  !important'
        },
    }))
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.heading}>
                <span>Send an email invite</span>
            </Box>
            <Grid container>
                <Grid item xs={8}>
                    <Box className={classes.emailInputdiv}>
                        <TextField
                            className={classes.emailInput}
                            placeholder='Enter Email Id'
                            InputProps={{
                                disableUnderline: true,
                            }}
                            inputProps={{
                                style: {
                                    padding: '0px',
                                },
                            }}
                            variant="standard"
                        />
                    </Box>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '24px' }}>
                    <Box className={classes.sendInvite} onClick={() => { }} >
                        <span className={classes.sendInviteText}>Send Invite</span>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} >
                    <Box className={classes.addMember} onClick={() => { }}>
                        <span className={classes.addMemberText}> + Add member</span>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '24px' }}>
                    <Box className={classes.sendLink} onClick={() => { }}>
                        <IconActions icon={<CopyLink color="#2069DB" />} src="" alt="cancel" marginProps={'2px 0 0 0 '} />
                    </Box>
                    <Box className={classes.sendLink}>
                        <span className={classes.sendLinkText}> Copy invite link</span>
                    </Box>

                </Grid>
            </Grid>
            <Divider className={classes.divider} />

        </Box >
    )
}
export default EmailInvite;