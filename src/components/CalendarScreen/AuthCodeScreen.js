import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import InputText from '../InputText/InputText';
import { CrossIcon } from '../../assets/images/crossIcon.js'
import IconActions from './IconActions';
import { verifyCredentials } from '../../store/thunks/calendarEvents';

function AuthCodeScreen() {
    const useStyles = makeStyles(theme => ({
        mainDiv: {
            position: 'absolute',
            zINdex: 999,
            width: '448px',
            height: '160px',
            left: '459px',
            top: '159px',
            background: '#FFFFFF',
            boxshadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        overlay: {
            position: 'fixed',
            zIndex: 1000,
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgyyyba(0,0,0,0.5)',
        },
        heading: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: '24px',
            paddingTop: "24px",
            paddingLeft: "24px"
        },
        input: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: '24px',
            paddingLeft: "24px"
        },
        rightIcon: {
            position: "absolute",
            top: "16.8px",
            right: "19px",
        },
        submitBtn: {
            position: "absolute",
            bottom: "16px",
            right: "24px",
            fontWeight: "600",
            fontSize: "20px",
            color: "#FFFFFF",
            background: "linear-gradient(360deg, #3960C6 0%, #1D6ADD 100%)",
            fontSize: "16px",
            lineHeight: '24px',
            marginLeft: "24px",
            marginTop: '10px',
            paddingLeft: '5px',
            width: '75px',
            borderRadius: '2px',
        },
    }))
    const [inputs, setInputs] = useState('')
    const user_alias_id = useSelector((state) => state.authReducer.token);
    const dispatch = useDispatch()
    const handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = () => {
        dispatch(verifyCredentials({ 'user_alias_id': user_alias_id, 'code': inputs.authcode }));
    }

    const classes = useStyles();
    return (
        <Box className={classes.overlay}>
            <Box className={classes.mainDiv}>
                <Box className={classes.heading}>
                    <span > Enter The Copied Code Below:</span>
                </Box>
                <Box className={classes.rightIcon}>
                    <IconActions icon={<CrossIcon color="#8DA0C8" />} src="" alt="cancelAuthcode" />
                </Box>
                <Box className={classes.input}>
                    <InputText
                        name="authcode"
                        placeholder="Enter the code"
                        value={inputs.authcode || ''}
                        handleChange={handleChange}
                    />
                </Box>
                <div onClick={() => handleSubmit()} className={classes.submitBtn}>Submit</div>
            </Box>
        // </Box>
    )
}
export default AuthCodeScreen;