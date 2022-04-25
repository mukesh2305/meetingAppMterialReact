import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    emailInput: {
        width: "384px",
        height: "24px",
        marginTop: "16px",
        background: "#F4F4F4",
        borderRadius: "4px",
        border: 0,
        padding: "20px",
        boxSizing: "borderBox"
    },
    otpInput: {
        background: "##F9F9F9",
        borderRadius: "4px",
        width: "400px",
        height: "24px", 
        border: "2px solid #2069DB;",
        padding: "20px 0px 20px 20px",
        boxSizing: "borderBox",
        letterSpacing: '5px',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '24px',
        '&::placeholder': {
            fontWeight: '500',
            letterSpacing: '0px',
        }
    }
}));


function InputText(props) {
    const classes = useStyles();
    const { name, value, handleChange, placeholder } = props
    const className = name == 'otp' ? classes.otpInput : classes.emailInput
    return (
        <input
            className={className}
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />

    )
}
export default InputText
