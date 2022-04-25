import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { EllipseBullet } from '../../assets/images/ellipseBullet'
import io from "socket.io-client";
import { generateUniqueID } from "web-vitals/dist/lib/generateUniqueID";
import debounce from "lodash.debounce";
import throttle from 'lodash.throttle';
import axios from 'axios';

function Input(props) {

  const useStyles = makeStyles(theme => ({
    input: {
      border: "none",
      background: "transparent",
      borderBottom: "1px solid #fff",
      outline: "none",
      width: '100%',
      fontWeight: "500",
      fontSize: "14px",
      color: "#5B6987",
      fontFamily: "sans-serif",
      '&::placeholder': {
        fontStyle: "italic",
        fontSize: "16px",
      },
      '&::-webkit-input-placeholder': {
        fontStyle: "italic",
        fontSize: "16px",
      },
      '&::-ms-input-placeholder': {
        fontStyle: "italic",
        fontSize: "16px",
      }
    },
    inputBox: {
      display: 'flex',

    },
    bulletPts: {
      marginRight: '12px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputCss: {
      width: '100%'
    },
    subjectCss: {
      fontWeight: "600",
      fontSize: "20px",
      color: "#293856",
    }

  }))
  const [inputs, setInputs] = useState('')
  console.log(props.value, "value")



  const _handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    props._onChange(value)

    setInputs(values => ({ ...values, [name]: value }))

  }




  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props._onKeyDown(false);
    }
  }

  const classes = useStyles();
  const { placeholder, color, name, value, inputStyle } = props
  return (
    <Box className={classes.inputBox}>
      {color !== '' ?
        <Box className={classes.bulletPts}>
          <EllipseBullet color={color} />
        </Box> :
        null}
      <Box className={classes.inputCss}>
        <input
          className={`${classes.input} ${inputStyle === 'subject' ? classes.subjectCss : ''}`}
          type="text"
          value={inputs[name] || value}
          name={name}
          onChange={(e) => _handleChange(e)}
          placeholder={placeholder}
          onKeyDown={(e) => _handleKeyDown(e)}
          autoFocus
        />
      </Box>
    </Box>

  )
}
export default Input;