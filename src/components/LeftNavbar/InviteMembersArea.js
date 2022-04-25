
import { makeStyles } from '@mui/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/fonts/inter.css';
import { toggleInviteMembers } from '../../store/actions/inviteMembers.js';
import { inviteMembers } from '../../assets/images/leftnavbar/icons.js'
import { Typography } from '@mui/material';

function InviteMembers() {


    const useStyles = makeStyles(theme => ({
        sample: {
            paddingLeft: "24px !important",
            paddingTop: "18.5px !important",
            paddingBottom: "18.5px !important"
        },
        primaryText: {
            fontFamily: 'Inter !important',
            fontWeight: '600 !important',
            fontSize: '16px',
            lineHeight: '24px',
            opacity: "0.5 !important",
            color: '#000000',
        }
    }))
    const classes = useStyles()
    const status = useSelector((state) => state.inviteMembers.inviteMembersScreen);
    const dispatch = useDispatch()

    const toggleInviteMemberMenu = () => {
        console.log(status)
        dispatch(toggleInviteMembers(!status))
    }

    return (
        <ListItem className={classes.sample} onClick={() => toggleInviteMemberMenu(status)} button key={"inviteMembers"}>
            <ListItemIcon>
                <img src={inviteMembers} />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: '-8px!important' }}
                primary={
                    <Typography className={classes.primaryText}>
                        Invite Members
                    </Typography>
                }
            />
        </ListItem>
    )
}
export default InviteMembers;

