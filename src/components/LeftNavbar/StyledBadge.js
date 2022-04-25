import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';


function StyledBadge() {
    const useStyles = makeStyles(theme => ({
        heading: {
            height: "42px",
            background: "#F3F2FF",
            borderRadius: "9px 9px 0px 0px",
            color: "#8492C2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        rightIcons: {
            color: "#8492C2",
        },

    }))

    const classes = useStyles();
    return (
        <Badge
            overlap="circular"
            sx={{
                "& .MuiBadge-badge": {
                  color: "#1DAE69",
                  backgroundColor: "#1DAE69"
                }
              }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot">
            <Avatar sx={{ width: 48, height: 48}} alt="Remy Sharp" />
        </Badge>
    )
}
export default StyledBadge;