import otpService from "../../services/otpLogin";
import { addToken,setUser, setUsername,  setEmailId } from "../actions/authReducer";
import actions from "../actions/otpLogin";

export const sendOtpAsync = (data) => (dispatch) => {
	console.log(data.email_id)
	dispatch(actions.sendOtp(data.email_id));
	otpService.sendOtp(data)
		.then((response) => dispatch(actions.sendOtpSuccess(response.data)))
		.catch((error) => dispatch(actions.sendOtpError(error.message)));
};

export const verifyOtpAsync = (data) => (dispatch) => {
	dispatch(actions.verifyOtp());
	otpService.verifyOtp(data)
		.then((response) => {
			const res = response.data
			if(res.is_success)
			{
				console.log(res)
				const username = res.data.users.name ? res.data.users.name : "User_123"
				dispatch(addToken(res.data.users.user_alias_id))
				dispatch(setUser(res.data.users.user_alias_id))
				dispatch(setUsername(username))
				dispatch(setEmailId(data.email_id))
			}
			dispatch(actions.verifyOtpSuccess(res.is_success))
		})
		.catch((error) => dispatch(actions.verifyOtpError(error.message)));
};