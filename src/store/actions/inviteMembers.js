import {
    TOGGLE_INVITE_MEMBERS_SCREEN,
    FETCH_SUGGESTED_MEMBERS,
    FETCH_SUGGESTED_MEMBERS_FAILED,
    FETCH_SUGGESTED_MEMBERS_SUCCESS
} from "./types";


const toggleInviteMembers = (status) => ({
    type: TOGGLE_INVITE_MEMBERS_SCREEN,
    payload: status
});

const fetchSuggestedMembers = () => ({
    type: FETCH_SUGGESTED_MEMBERS,
});

const fetchSuggestedMembersSuccess = (suggestedMembers) => ({
    type: FETCH_SUGGESTED_MEMBERS_SUCCESS,
    payload: suggestedMembers,
});

const fetchSuggestedMembersError = (errorMessage) => ({
    type: FETCH_SUGGESTED_MEMBERS_FAILED,
    payload: errorMessage,
});

export {
    toggleInviteMembers,
    fetchSuggestedMembers,
    fetchSuggestedMembersSuccess,
    fetchSuggestedMembersError,
};
