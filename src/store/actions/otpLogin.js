import {
	SEND_OTP,
	SEND_OTP_FAILED,
	SEND_OTP_SUCCESS,
	VERIFY_OTP,
	VERIFY_OTP_FAILED,
	VERIFY_OTP_SUCCESS} from "./types";

const sendOtp = (email) => ({
	type: SEND_OTP,
	payload: email,
});

const sendOtpSuccess = (res) => {
	return {
	type: SEND_OTP_SUCCESS,
    payload: res.sendSuccess,
}};

const sendOtpError = (errorMessage) => ({
	type: SEND_OTP_FAILED,
	payload: errorMessage,
});

const verifyOtp = () => ({
	type: VERIFY_OTP,
});

const verifyOtpSuccess = (status) => {
	return {
	type: VERIFY_OTP_SUCCESS,
    payload: status,
}};

const verifyOtpError = (errorMessage) => ({
	type: VERIFY_OTP_FAILED,
	payload: errorMessage,
});

export default {
	sendOtp,
	sendOtpSuccess,
	sendOtpError,
	verifyOtp,
	verifyOtpSuccess,
	verifyOtpError,
};

