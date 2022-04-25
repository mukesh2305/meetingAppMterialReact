import {
	FETCH_NOTES, FETCH_NOTES_FAILED, FETCH_NOTES_SUCCESS,
	ADD_NOTES, ADD_NOTES_FAILED, ADD_NOTES_SUCCESS, UPDATE_NOTES, UPDATE_NOTES_FAILED, UPDATE_NOTES_SUCCESS, FETCH_GROUP_DATA_REQUEST, FETCH_GROUP_DATA_SUCCESS, FETCH_GROUP_DATA_FAILURE, ADD_ACTION_ITEM_SUCCESS, ADD_ACTION_ITEM, ADD_ACTION_ITEM_FAILED
} from "./types";


const fetchNotes = () => ({
	type: FETCH_NOTES,
});

const fetchNotesSuccess = (payload) => ({
	type: FETCH_NOTES_SUCCESS,
	payload: payload,
});

const fetchNotesError = (errorMessage) => ({
	type: FETCH_NOTES_FAILED,
	payload: errorMessage,
});
const addNotes = (data) => ({
	type: ADD_NOTES,
});

const addNotesSuccess = (payload) => ({
	type: ADD_NOTES_SUCCESS,
	payload: payload,
});

const addNotesError = (errorMessage) => ({
	type: ADD_NOTES_FAILED,
	payload: errorMessage,
});
const updateNotes = () => ({
	type: UPDATE_NOTES,
});

const updateNotesSuccess = (payload) => ({
	type: UPDATE_NOTES_SUCCESS,
	payload: payload,
});

const updateNotesError = (errorMessage) => ({
	type: UPDATE_NOTES_FAILED,
	payload: errorMessage,
});

// Group notes actions
const setGroupNotesRequest = () => ({
	type: FETCH_GROUP_DATA_REQUEST,
})


const setGroupNotesSuccess = (data) => ({
	type: FETCH_GROUP_DATA_SUCCESS,
	payload: data
})

const setGroupNotesFailure = (errorMessage) => ({
	type: FETCH_GROUP_DATA_FAILURE,
	payload: errorMessage
})

// create action Items

const addActionItems = (data) => ({
	type: ADD_ACTION_ITEM,
});

const addActionItemsSuccess = (payload) => ({
	type: ADD_ACTION_ITEM_SUCCESS,
	payload: payload,
});

const addActionItemsError = (errorMessage) => ({
	type: ADD_ACTION_ITEM_FAILED,
	payload: errorMessage,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	fetchNotes,
	fetchNotesSuccess,
	fetchNotesError,
	addNotes,
	addNotesError,
	addNotesSuccess,
	updateNotes,
	updateNotesError,
	updateNotesSuccess,
	setGroupNotesRequest,
	setGroupNotesSuccess,
	setGroupNotesFailure,
	addActionItems,
	addActionItemsSuccess,
	addActionItemsError,
};