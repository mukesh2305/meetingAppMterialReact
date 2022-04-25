import React from 'react'
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import introImg from '../assets/images/login-image@3x.png'
import Container from '@mui/material/Container';
import LoginScreen from "../components/LoginScreen/LoginScreen";
import loadingIcon from '../assets/images/loadingIcon.svg'
import fogTeamsLogo from '../assets/images/FogTeamsLogo.svg'
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  introSection: {
    height: '100vh',
    backgroundImage: `url(${introImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  },
  topLeftLogo: {
    position: 'absolute',
    top: '24px',
    left: '48px',
    fontSize: '18px'
  },
  bgStyle: {
    //backgroundColor:'#E5E5E5'
  },
  loadingDiv: {
    display: "flex",
    alignItems: "center",
    // width: '100vh',
    height:'100vh',
    justifyContent: "center"
  }
}))

function LoginPage() {
  document.title = 'FOG Teams- Login Page'
  const classes = useStyles();
  const isLoading = useSelector(state => state.otpLoginReducer.isLoading);

  return (isLoading ? <div className={classes.loadingDiv}>
    <img src={loadingIcon} />
  </div> :
    <Grid container>
      <Grid item xs={5} className={classes.introSection}>
        <div className={classes.topLeftLogo}>
          <img src={fogTeamsLogo} alt="logo" />
        </div>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={6} className={classes.bgStyle}>
        <Container className={classes.loginSection}>
          <LoginScreen />
        </Container>
      </Grid>
    </Grid>
  )
}

export default LoginPage