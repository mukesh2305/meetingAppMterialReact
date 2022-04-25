import apiClient from "../helpers/apiClient";

class otpService {
	sendOtp = (data) =>  apiClient().post("auth-management/login",data);
    verifyOtp = (data) => apiClient().post("auth-management/validate-user",data);
}

export default new otpService();