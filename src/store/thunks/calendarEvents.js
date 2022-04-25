import calendarEventsService from "../../services/calendarEvents";
import actions from "../actions/calendarEvents";

export const checkIntegrationStatus = (user_aliad_id) => (dispatch) => {
	calendarEventsService.checkIntegrationStatus(user_aliad_id)
		.then((response) => {
			const data = {
				'status': response.data.is_success,
				'events': response.data.data.events ? response.data.data.events : []
			}
			dispatch(actions.checkIntegrationStatusSuccess(data))
		})
		.catch((error) => dispatch(actions.checkIntegrationStatusFailure(error.message)));
};

export const fetchIntegrationLink = () => (dispatch) => {
	calendarEventsService.fetchIntegrationLink()
		.then((response) => {
			if (response.data.is_success) {
				dispatch(actions.fetchIntegrationLinkSuccess(response.data.data.auth_url));
				return;
			}
			alert(response.data.errors[0])
		})
		.catch((error) => dispatch(actions.fetchIntegrationLinkFailure(error.message)));
};

export const verifyCredentials = (data) => (dispatch) => {
	calendarEventsService.verifyCredentials(data)
		.then((response) => {
			const res = response.data
			if (res.is_success) {
				dispatch(actions.verifyCredentialsSuccess(true));
				dispatch(actions.toggleAuthCodeScreen(false));
				alert("Calendar Integrated!")
				return;
			}
			alert(res.errors[0]);
		})
		.catch((error) => dispatch(actions.verifyCredentialsFailure(error.message)));
};
