
import { makeStyles } from '@mui/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import StyledBadge from './StyledBadge.js';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LongMenu from './LongMenu.js';
import { useSelector } from 'react-redux';
import '../../assets/fonts/inter.css';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

function ProfileArea() {

    const useStyles = makeStyles(theme => ({
        listItem: {
            paddingLeft: "12px!important",
            paddingRight: "15px!important",
            paddingRight: "12px!important",
            paddingBottom: "28px!important"
        },
        listItemText: {
            paddingLeft: "16px!important",
        },
        primaryText: {
            textTransform: 'capitalize !important',
            fontFamily: 'Inter !important',
            fontStyle: 'normal !important',
            fontWeight: '600 !important',
            fontSize: '16px !important',
            lineHeight: '24px !important'
        },
        secondaryText: {
            fontFamily: 'Inter !important',
            fontStyle: 'normal !important',
            fontWeight: 'normal',
            fontSize: '14px !important',
            lineHeight: '24px ',
            opacity: '0.59',
        }
    }))
    const classes = useStyles()

    const username = useSelector((state) => state.authReducer.username);

    return (
        <ListItem className={classes.listItem}>
            <ListItemIcon sx={{ paddingRight: "0px" }}>
                <StyledBadge />
            </ListItemIcon>
            <ListItemText className={classes.listItemText}
                primary={
                    <Typography className={classes.primaryText}>
                        {username}
                    </Typography>
                }
                secondary={<Typography className={classes.secondaryText}>
                    Available
                </Typography>
                } />
            <LongMenu />
        </ListItem >
    )
}
export default ProfileArea;

