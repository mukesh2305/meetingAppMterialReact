import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => {
  return {

    topLeftLogo: {
      position: 'absolute',
      top: '24px',
      left: '48px',
      fontSize: '18px',
    },
    bgStyle: {
      // backgroundColor:'#E5E5E5'
    },
    loginText: {
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      color: '#000000',
      textAlign: 'left',
    },
    backArrow: {
      marginTop: '88px',
      justify: "flex-end",
      justifyContent: "flex-end",
    },
    loginHeading: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '34px',
      marginTop: '80px',
    },
    loginSubHeading: {
      marginTop: '16px',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      opacity: 0.5,
    },
    otpSubHeading: {
      marginTop: '16px',
      marginBottom: '24px',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      opacity: 0.5,
    },
    credentials: {
      marginTop: '48px',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24px',
      top: '202px',
      color: '#000000',
    },

    notRegistered: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      marginTop: '16px',
    },
    notAMember: {
      opacity: 0.4,
    },
    signUp: {
      marginLeft: '6px',
      fontWeight: 600,
      color: '#3063cd',
    },
    orDivision: {
      color: "#000000",
      opacity: "0.2",
      width: "424px",
      marginBottom: "40.5px"
    },
    borderDiv: {
      display: "flex",
      flexDirection: "row",
      fontWeight: "500",
      fontSize: "16px",
      marginTop: "28px",
      "&:before": {
        content: "\"\"",
        flex: "1 1",
        borderBottom: "1px solid #000",
        margin: "auto"
      },
      "&:after": {
        content: "\"\"",
        flex: "1 1",
        borderBottom: "1px solid #000",
        margin: "auto"
      }
    },
    formContainer: {
      width: "424px",
      height: "64px"
    },
    formContainerText: {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#000000",
      opacity: "0.4"
    },
    socialButtons: {
      width: "424px",
      height: "64px",
      marginTop: "24px",
      border: "2px solid rgba(105,105,105, .5)",
      boxSizing: "border-box",
      borderRadius: "4px",
      textAlign: "center",
      padding: "16px",
      cursor: "pointer"
    },
    socialBtnText: {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#000000",
      display: "inline-block",
      padding: "0px 25px",
      verticalAlign: "middle"
    },
    continueButtton: {
      marginTop: "16px",
      width: "424px",
      height: "64px",
      background: "linear-gradient(360deg, #3960C6 0%, #1D6ADD 100%)",
      borderRadius: "4px",
      textAlign: "center",
      padding: "16px",
      cursor: "pointer"
    },
    submitBtn: {
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "32px",
      color: "#FFFFFF",
      background: "none",
      border: "0"
    },
    emailInput: {
      width: "424px",
      height: "64px",
      marginTop: "16px",
      background: "#F4F4F4",
      borderRadius: "4px",
      border: "0",
      padding: "16px"
    },
    errorMessage: {
      color: "#cc0033",
      display: "inline-block",
      fontSize: "12px",
      lineHeight: "15px",
      margin: "5px 0 0"
    }
  }
})

export default useStyles
