import {
    TOGGLE_CALENDAR_SCREEN,
    CHECK_INTEGRATION_STATUS,
    CHECK_INTEGRATION_STATUS_SUCCESS,
    CHECK_INTEGRATION_STATUS_FAILURE,
    FETCH_INTEGRATION_LINK,
    FETCH_INTEGRATION_LINK_SUCCESS,
    FETCH_INTEGRATION_LINK_FAILURE,
    VERIFY_CREDENTIALS,
    VERIFY_CREDENTIALS_SUCCESS,
    VERIFY_CREDENTIALS_FAILURE,
    TOGGLE_AUTH_CODE_SCREEN,
    SET_FILTER_DATE

} from "./types";

const toggleCalendarScreen = (status) => ({
    type: TOGGLE_CALENDAR_SCREEN,
    payload: status
});

const toggleAuthCodeScreen = (status) => ({
    type: TOGGLE_AUTH_CODE_SCREEN,
    payload: status
});
const checkIntegrationStatus = () => ({
    type: CHECK_INTEGRATION_STATUS
});

const checkIntegrationStatusSuccess = (data) => ({
    type: CHECK_INTEGRATION_STATUS_SUCCESS,
    payload: data
});

const checkIntegrationStatusFailure = (errorMessage) => ({
    type: CHECK_INTEGRATION_STATUS_FAILURE,
    payload: errorMessage
});

const fetchIntegrationLink = () => ({
    type: FETCH_INTEGRATION_LINK
});

const fetchIntegrationLinkSuccess = (link) => ({
    type: FETCH_INTEGRATION_LINK_SUCCESS,
    payload: link
});

const fetchIntegrationLinkFailure = (errorMessage) => ({
    type: FETCH_INTEGRATION_LINK_FAILURE,
    payload: errorMessage
});

const verifyCredentials = () => ({
    type: VERIFY_CREDENTIALS
});

const verifyCredentialsSuccess = (status) => ({
    type: VERIFY_CREDENTIALS_SUCCESS,
    payload: status
});

const verifyCredentialsFailure = (errorMessage) => ({
    type: VERIFY_CREDENTIALS_FAILURE,
    payload: errorMessage
});

const setFilterDate = (date) => ({
    type: SET_FILTER_DATE,
    payload: date
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    setFilterDate,
    toggleCalendarScreen,
    checkIntegrationStatus,
    checkIntegrationStatusSuccess,
    checkIntegrationStatusFailure,
    fetchIntegrationLink,
    fetchIntegrationLinkSuccess,
    fetchIntegrationLinkFailure,
    verifyCredentials,
    verifyCredentialsSuccess,
    verifyCredentialsFailure,
    toggleAuthCodeScreen
};