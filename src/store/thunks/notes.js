import NotesService from "../../services/notes";
import actions from "../actions/notes";

export const loadNotesAsync = () => (dispatch) => {
	dispatch(actions.fetchNotes());

	NotesService.getTemplate()
		.then((response) => dispatch(actions.fetchNotesSuccess(response.data)))
		.catch((error) => dispatch(actions.fetchNotesError(error.message)));
};

export const addNotesAsync = (data) => (dispatch) => {
	console.log("this is happing")
	console.log("response===========>>>>>>>>>>", data)

	dispatch(actions.addNotes(data));

	NotesService.createNotes(data)
		.then((response) => {
			console.log("response===========", response.data)
			return dispatch(actions.addNotesSuccess(response.data))
		})
		.catch((error) => dispatch(actions.addNotesError(error.message)));
};


export const updateNotesAsync = (data) => (dispatch, getState) => {
	const stateBefore = getState()
	const oldNote = stateBefore && stateBefore.notesReducer && stateBefore.notesReducer.notes
	dispatch(actions.updateNotes(data));
	console.log(data, "data")
	NotesService.updateNotes(data)
		.then((response) => dispatch(actions.updateNotesSuccess({ resp: response.data, req: oldNote })))
		.catch((error) => dispatch(actions.updateNotesError(error.message)));
};

// get data from the group notes
export const getNotesGroupDataAsync = () => (dispatch) => {
	dispatch(actions.setGroupNotesRequest());
	NotesService.getNotesGroupData()
		.then((response) => dispatch(actions.setGroupNotesSuccess(response.data)))
		.catch((error) => dispatch(actions.setGroupNotesFailure(error.message)));
}

// creteActionItems in group notes section

export const creteActionItemsAsync = (data) => (dispatch) => {
	console.log("this is happing")
	console.log("response===========", data)

	dispatch(actions.addActionItems(data));

	NotesService.createNotes(data)
		.then((response) => {
			console.log("response===========", response)
			return dispatch(actions.addActionItemsSuccess(response.data))
		})
		.catch((error) => dispatch(actions.addActionItemsError(error.message)));
};

