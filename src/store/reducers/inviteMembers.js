import {
    TOGGLE_INVITE_MEMBERS_SCREEN,
    FETCH_SUGGESTED_MEMBERS,
    FETCH_SUGGESTED_MEMBERS_SUCCESS,
    FETCH_SUGGESTED_MEMBERS_FAILED
} from "../actions/types";

const initialState = {
    suggestedMembers: [],
    isLoadingSuggesteedMembers: true,
    inviteMembersScreen: false,
    errorMessageSuggesteedMembers:null,
    addedMembers: []
};

export const inviteMembers = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_INVITE_MEMBERS_SCREEN:
            return {
                ...state,
                inviteMembersScreen: action.payload
            }
        case FETCH_SUGGESTED_MEMBERS:
            return {
                ...state,
                isLoadingSuggesteedMembers: true,
                suggestedMembers: initialState.suggestedMembers,
                errorMessageSuggesteedMembers: null,
            };

        case FETCH_SUGGESTED_MEMBERS_SUCCESS:
            return {
                ...state,
                isLoadingSuggesteedMembers: false,
                suggestedMembers: action.payload,
            };

        case FETCH_SUGGESTED_MEMBERS_FAILED:
            return {
                ...state,
                isLoadingSuggesteedMembers: false,
                errorMessage: action.payload,
                notes: initialState.suggestedMembers,
            };
        default:
            return state;
    }
}
