import apiClient from "../helpers/apiClient";

class calendarEventsService {
	checkIntegrationStatus = (user_alias_id) => apiClient().get("calendar-management/events/list/userId/"+user_alias_id);
	fetchIntegrationLink = () => apiClient().get("calendar-management/auth-url/fetch")
	verifyCredentials = (data) => apiClient().post("calendar-management/credentials/",data)
}

export default new calendarEventsService();