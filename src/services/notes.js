import apiClient from "../helpers/apiClient";

class NotesService {
	getNotesGroupData = () => apiClient().get("notes-management/note/meetingId/M1");
	creteActionItems = (data) => apiClient().post("/assign-items", data);
	getNote = (id) => apiClient().get("notes-management/note/"`${id}`);
	getTemplate = () => apiClient().get("template-management/all");
	createNotes = (data) => apiClient().post("notes-management/notes", data);
	updateNotes = (data) => apiClient().post("notes-management/notes", data);
}

export default new NotesService();