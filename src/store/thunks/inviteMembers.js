import InviteMembersService from "../../services/inviteMembers";
import { fetchSuggestedMembersError, fetchSuggestedMembersSuccess } from "../actions/inviteMembers";

export const loadSuggestedMembersAsync = (user_aliad_id) => (dispatch) => {
    InviteMembersService.getSuggestedMembers(user_aliad_id).then((response) => {
        const arr = response.data.data.users.map(x => x.email_id)
        dispatch(fetchSuggestedMembersSuccess(arr))
    })
        .catch((error) => dispatch(fetchSuggestedMembersError(error.message)));
};