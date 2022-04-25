import apiClient from "../helpers/apiClient";

class InviteMembersService {
	getSuggestedMembers = (user_alias_id) => apiClient().get("user-management/users/domain/alias/" + user_alias_id)
};

export default new InviteMembersService();