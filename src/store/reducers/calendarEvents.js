import {
    TOGGLE_CALENDAR_SCREEN,
    CHECK_INTEGRATION_STATUS_SUCCESS,
    CHECK_INTEGRATION_STATUS,
    CHECK_INTEGRATION_STATUS_FAILURE,
    FETCH_INTEGRATION_LINK_SUCCESS,
    FETCH_INTEGRATION_LINK,
    FETCH_INTEGRATION_LINK_FAILURE,
    VERIFY_CREDENTIALS_SUCCESS,
    VERIFY_CREDENTIALS,
    VERIFY_CREDENTIALS_FAILURE,
    TOGGLE_AUTH_CODE_SCREEN,
    SET_FILTER_DATE,
} from "../actions/types";

const initialState = {
    isLoading: false,
    integrationStatus: null,
    isVerified: null,
    integrationLink: null,
    errorMessage: null,
    authCodeScreen: false,
    calendarEventsScreen: false,
    filterDate: null,
    events: [],
}

export const calendarEventsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHECK_INTEGRATION_STATUS:
            return {
                ...state,
                isLoading: true,
                integrationStatus: null,
                errorMessage: null,
                events: [],
            };

        case CHECK_INTEGRATION_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                integrationStatus: payload.status,
                events: payload.events
            };

        case CHECK_INTEGRATION_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };
        case FETCH_INTEGRATION_LINK:
            return {
                ...state,
                isLoading: true,
                integrationLink: null,
                errorMessage: null,
            };

        case FETCH_INTEGRATION_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                integrationLink: payload,
            };

        case FETCH_INTEGRATION_LINK_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };
        case VERIFY_CREDENTIALS:
            return {
                ...state,
                isLoading: true,
                isVerified: null,
                errorMessage: null,
            };
        case VERIFY_CREDENTIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isVerified: payload
            };
        case VERIFY_CREDENTIALS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };
        case TOGGLE_AUTH_CODE_SCREEN:
            return {
                ...state,
                authCodeScreen: payload,
            };
        case TOGGLE_CALENDAR_SCREEN:
            return{
                ...state,
                calendarEventsScreen: payload
            }
        case SET_FILTER_DATE:
            return{
                ...state,
                filterDate: payload
            }
        default:
            return state;
    }
};
