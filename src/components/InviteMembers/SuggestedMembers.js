import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider, List, ListItem, TextField } from '@mui/material';
import IconActions from './IconActions';
import SuggestedMemberItem from './SuggestedMemberItem';
import { useSelector } from 'react-redux';

function SuggestedMemebers() {
    
    const isLoading = useSelector((state) => state.inviteMembers.isLoadingSuggesteedMembers);
    const errorMessage = useSelector((state) => state.inviteMembers.isLoadingSuggesteedMembers);
    const membersList = useSelector((state) => state.inviteMembers.suggestedMembers);

    const useStyles = makeStyles(theme => ({
        heading: {
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: '24px',
            paddingTop: "20px",
            paddingLeft: "24px"
        },
        list: {
            marginBottom: '10px',
            overflowY: "auto",
            overflowX: 'hidden',
            listStyle: "none",
            height: "100%",
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
        }
    }))
    const classes = useStyles();
    return (
        <Box>
            {isLoading ? 
                <div>Loading...</div> :
                <Box>
                    <Box className={classes.heading}>
                        <span>Suggested members</span>
                    </Box>
                    <Box sx={{ overflowX: 'hidden', height: '150px' }}>
                        <Box className={classes.list}>
                            <List >
                                {membersList.map((emailId) => (
                                    <SuggestedMemberItem email={emailId} />
                                ))}
                            </List>
                        </Box>
                    </Box >
                </Box>}
        </Box>
    )
}
export default SuggestedMemebers;