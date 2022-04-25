import axios from "axios";
import { store } from "../store/store";
import { API_SERVICE_HOST } from "../config";

const apiClient = () => {
	const state = store.getState();
	const requestHeaders = { "Content-Type": "application/json" };
	console.log(state.authReducer.token);
	if (state.authReducer.token) {
		requestHeaders["Authorization"] = `Bearer ${state.authReducer.token}`;
	}
	const axiosInstance = axios.create({
		baseURL: API_SERVICE_HOST,
		responseType: "json",
		headers: requestHeaders
	});

return axiosInstance;
};

export default apiClient;