import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { frontArrow, forward, searchIcon, backArrow, inviteMembers, slack, calendar, notes, settings, feedback } from '../../assets/images/leftnavbar/icons.js'
import { useDispatch, useSelector } from 'react-redux'
import SearchArea from './SearchArea.js';
import ProfileArea from './ProfileArea.js';
import actions from '../../store/actions/calendarEvents';
import '../../assets/fonts/inter.css';
import InviteMembers from './InviteMembersArea.js';
import { Typography } from '@mui/material';
import { loadSuggestedMembersAsync } from '../../store/thunks/inviteMembers.js';
import { checkIntegrationStatus, fetchIntegrationLink } from '../../store/thunks/calendarEvents.js';
import CalendarScreen from "../CalendarScreen/CalendarScreen"
import AuthCodeScreen from '../CalendarScreen/AuthCodeScreen.js';
const drawerWidth = 286;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
});

const DrawerHeader = styled(Box)(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: !open ? 'center' : 'flex-end',
  paddingRight: open ? 30.29 : 28.59,
  paddingLeft: 30.29,
  paddingTop: 29.29,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    zIndex: 40,
    height: '100vh',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function LeftNavbar() {
  const useStyles = makeStyles(theme => ({
    meetingDetails: {
      padding: '24px 28px',
    },
    sample1: {
      paddingLeft: "24px !important",
      paddingTop: "18.5px !important",
      paddingBottom: "18.5px !important"
    },
    primaryText: {
      fontFamily: 'Inter !important',
      fontWeight: '600 !important',
      fontSize: '16px !important',
      lineHeight: '24px !important',
      opacity: "0.5 !important",
      color: '#000000 !important',
    },
    listItemText: {
      marginLeft: '-8px!important'
    }
  }))
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch()
  const status = useSelector((state) => state.inviteMembers.inviteMembersScreen);
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const user_aliad_id = useSelector((state) => state.authReducer.user_id);
  const isCalendarIntegrated = useSelector((state) => state.calendarEventsReducer.integrationStatus);
  const integrationLink = useSelector((state) => state.calendarEventsReducer.integrationLink);

  useEffect(() => {
    if (status)
      dispatch(loadSuggestedMembersAsync(user_aliad_id));
  }, [status]);

  useEffect(() => {
    if (isCalendarIntegrated == false)
    {
      window.open(integrationLink)
      dispatch(actions.toggleAuthCodeScreen(true));
    }
    if(isCalendarIntegrated == true)
      setOpenCalendar(true);
  }, [isCalendarIntegrated]);
  useEffect(() =>{
    setOpenCalendar(false);
  },[])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleCalendar = () => {
    dispatch(actions.fetchIntegrationLink());
    dispatch(fetchIntegrationLink(user_aliad_id));
    dispatch(actions.checkIntegrationStatus());
    dispatch(checkIntegrationStatus(user_aliad_id));
  }

  const closeCalendar = () => {
    setOpenCalendar(false);
  }
  return (
    <Box>
      <Box>
        { openCalendar && <CalendarScreen open={open} func={closeCalendar} />}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader open={open}>
            <IconButton sx={{ padding: 0 }} onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {!open ? <img src={frontArrow} /> : <img src={backArrow} />}
            </IconButton>
          </DrawerHeader>
          <List >
            <ProfileArea />
            <SearchArea />
            <InviteMembers />
            <ListItem className={classes.sample1} button key={"slack"}>
              <ListItemIcon>
                <img src={slack} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography className={classes.primaryText}>
                    Integrate with Slack
                  </Typography>
                } />
            </ListItem>
            <ListItem className={classes.sample1} onClick={() => toggleCalendar()} button key={"calendar"}>
              <ListItemIcon>
                <img src={calendar} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography className={classes.primaryText}>
                    Calendar
                  </Typography>
                } />
            </ListItem>
            <ListItem className={classes.sample1} button key={"notes"}>
              <ListItemIcon>
                <img src={notes} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography className={classes.primaryText}>
                    Your Notes
                  </Typography>
                } />
              <IconButton sx={{ marginRight: '80px', marginTop: '2px' }} >
                <img src={forward} />
              </IconButton>
            </ListItem>
            <ListItem className={classes.sample1} button key={"settings"}>
              <ListItemIcon>
                <img src={settings} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography className={classes.primaryText}>
                    Settings
                  </Typography>
                } />
            </ListItem>
            <ListItem className={classes.sample1} button key={"feedback"}>
              <ListItemIcon>
                <img src={feedback} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography className={classes.primaryText}>
                    Feedback
                  </Typography>
                } />
            </ListItem>
          </List>
        </Drawer>
      </Box >
    </Box>
  );
}
