import {
    SEND_OTP, SEND_OTP_SUCCESS, SEND_OTP_FAILED , VERIFY_OTP, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED
} from "../actions/types";

const initialState =
{
    isLoading: false,
    email: null,
    errorMessage: null,
    sendSuccess: false,
    verifySuccess: null,
}

export const otpLoginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SEND_OTP:
            return {
                ...state,
                email: payload,
                isLoading: true,
                sendSuccess: false,
                errorMessage: null,
            };

        case SEND_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                sendSuccess: true,
            };

        case SEND_OTP_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,
                sendSuccess: false,
            };
        case VERIFY_OTP:
            return {
                ...state,
                isLoading: true,
                otp: null,
                errorMessage: null,
            };

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                verifySuccess: payload,
            };

        case VERIFY_OTP_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,
                verifySuccess: false,
            };
        default:
            return state;
    }
};