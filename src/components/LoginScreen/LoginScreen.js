import React, { useState, useEffect } from 'react'
import { BackArrow } from '../../assets/images/backArrow'
import SocialButtons from '../SocialButtons/SocialButtons'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SlackIcon from '../../assets/images/login/slackIcon.svg'
import GoogleIcon from '../../assets/images/login/googleIcon.svg'
import ContinueBtn from '../PrimaryButton/PrimaryButton'
import InputText from '../InputText/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import { Divider } from '@mui/material'
import useStyles from './styles'
import { addToken } from '../../store/actions/authReducer';
import { validateEmail, sixDigitNo } from '../../validations/formValidation'
import ErrorMessage from './ErrorMessage';
import { sendOtpAsync, verifyOtpAsync } from '../../store/thunks/otpLogin';
import verifyOtpSuccess from '../../store/actions/otpLogin'

function LoginScreen(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate();
  const auth = useSelector(state => state.authReducer);
  const sendSuccess = useSelector(state => state.otpLoginReducer.sendSuccess);
  const verifySuccess = useSelector(state => state.otpLoginReducer.verifySuccess);
  const userEmail = useSelector(state => state.otpLoginReducer.email);
  const [error, setError] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [inputs, setInputs] = useState('')
  const [toggle, setToggle] = useState(true)
  const [emailVerification, setEmailVerification] = useState(false)
  const [selectedUser, setSelectedUser] = React.useState({})
  const location = useLocation();

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    if (name == 'otp' && value.length > 6)
      return
    if (value === '') {
      setError(true)
    }
    else {
      setError(false)
    }
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  const goBack = () => {
    setEmailVerification(false)
    setValidOtp(false)
    setInputs(values => ({ ...values, ['email']: '' }))
  }

  const sendOtp = () => {
    dispatch(sendOtpAsync({ "email_id": inputs.email }));
  }

  const verifyOtp = () => {
    dispatch(verifyOtpAsync({ "email_id": userEmail, 'otp': inputs.otp }));
  }

  const continueAhead = () => {
    if (inputs && validateEmail(inputs.email) && !validOtp)
      sendOtp();
    if (inputs && emailVerification && sixDigitNo(inputs.otp) && validOtp)
      verifyOtp();
  }

  const handleGoogleFailure = (result) => {
    console.error("Google Failure:" + result);
    console.log("error!")
  }

  const handleGoogleLogin = (googleData) => {
    dispatch(verifyOtpAsync({ "email_id": googleData.profileObj.email, 'token': googleData.tokenId }));
  }

  useEffect(() => {
    if (auth.token && !location.state) {
      navigate("/activity")
      return
    }
    if (auth.token && location.state.from.pathname) {
      navigate(location.state.from.pathname)
      return
    }
  }, [auth.token]);

  useEffect(() => {
    if (sendSuccess) {
      setEmailVerification(true)
      setValidOtp(true)
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (verifySuccess == false) {
      alert("Wrong OTP!");
    }
  }, [verifySuccess])

  return (
    <Grid container className={classes.loginText}>
      <Grid xs={1} item>
        <div className={classes.backArrow} style={{ cursor: 'pointer' }} onClick={() => goBack(true)}> <BackArrow /></div>
      </Grid>
      <Grid xs={11} item>
        <div className={classes.loginHeading} style={{ cursor: 'pointer' }} onClick={() => goBack(true)}>
          Log in
        </div>
        <div className={classes.loginSubHeading}>Discover a whole new futuristic office experience</div>
        <form onSubmit={handleSubmit}>
          <div className="formContainer">
            {!emailVerification ? (
              <>
                <div className={classes.credentials}>Email</div>
                <div>
                  <InputText
                    name="email"
                    placeholder="Enter your company email id"
                    value={inputs.email || ''}
                    handleChange={handleChange}
                  />
                </div>
                {(inputs && error) && <ErrorMessage message="Enter Email ID" />}
                {(inputs && inputs.email !== '' && !(validateEmail(inputs.email))) && <ErrorMessage message="Enter Valid Email" />}
              </>
            ) : (
              <>
                <div className={classes.credentials}>Email Verification</div>
                <div className={classes.otpSubHeading}>A 6 digit OTP number has been sent to {userEmail}</div>
                <div>
                  <InputText
                    name="otp"
                    placeholder="Enter OTP number "
                    value={inputs.otp || ''}
                    handleChange={handleChange}
                  />
                </div>
                {(inputs && inputs.otp !== '' && !sixDigitNo(inputs.otp)) && validOtp && <ErrorMessage message="Use Numbers Only!" />}
              </>
            )}
            <ContinueBtn continueAhead={continueAhead} />
            {!emailVerification && <div>
              < div className={classes.notRegistered}>
                <span className={classes.notAMember}>Not a member yet? </span>
                <span className={classes.signUp}> Sign up </span>
              </div>
              <div className={classes.orDivision}>
                <div className={classes.borderDiv}><Divider /> OR </div>
              </div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                render={renderProps => (
                  <Button sx={{ textTransform: 'none', border: '2px solid rgba(105,105,105, .5)' }} className={classes.socialButtons} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src={`${GoogleIcon}`} alt="Social Icon" />
                    <div className={classes.socialBtnText}>Log in with Google</div>
                  </Button>
                )}
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
              <SocialButtons className={classes.socialButtons} tagline="Log in with Slack" imageName={`${SlackIcon}`} />
            </div>}
          </div>
        </form>
      </Grid>
    </Grid>
  )
}
export default LoginScreen

