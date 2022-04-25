import {
    FETCH_NOTES, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILED,
    ADD_NOTES, ADD_NOTES_FAILED, ADD_NOTES_SUCCESS,
    UPDATE_NOTES, UPDATE_NOTES_FAILED, UPDATE_NOTES_SUCCESS,
    FETCH_GROUP_DATA_REQUEST, FETCH_GROUP_DATA_SUCCESS,
    FETCH_GROUP_DATA_FAILURE,
    ADD_ACTION_ITEM,
    ADD_ACTION_ITEM_SUCCESS,
    ADD_ACTION_ITEM_FAILED,
} from "../actions/types";

const initialState =
{
    isLoading: false,
    notes: null,
    errorMessage: null,
}

export const notesReducer = (state = initialState, { type, payload }) => {
    console.log(state, "state")
    switch (type) {
        case FETCH_NOTES:
            return {
                ...state,
                isLoading: true,
                notes: null,
                errorMessage: null,
            };

        case FETCH_NOTES_SUCCESS:
            console.log(state, "stateF")
            return {
                ...state,
                isLoading: false,
                notes: payload.data.notes
            };

        case FETCH_NOTES_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,

            };
        case ADD_NOTES:
        case ADD_ACTION_ITEM:
            return { ...state, isLoading: true, errorMessage: null, notes: null };

        case ADD_NOTES_SUCCESS:
        case ADD_ACTION_ITEM_SUCCESS:
            state.push({ notes: payload });
            return { ...state, isLoading: true, errorMessage: null };

        case ADD_NOTES_FAILED:
        case ADD_ACTION_ITEM_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,
            };
        case UPDATE_NOTES:
            return {
                ...state,
                isLoading: true,
                notes: state.notes,
                errorMessage: null,
            };

        case UPDATE_NOTES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                notes: payload && payload.resp && payload.resp.data.notes

            };


        case UPDATE_NOTES_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,
            };

        default:
            return state;
    }
};


export const groupNotesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_GROUP_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                notes: null,
                errorMessage: null,
            };

        case FETCH_GROUP_DATA_SUCCESS:
            console.log(state, "stateF")
            return {
                ...state,
                isLoading: false,
                notes: payload.data.notes
            };

        case FETCH_GROUP_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload,

            };

        default:
            return state;
    }
};

