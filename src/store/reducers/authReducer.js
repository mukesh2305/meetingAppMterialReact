import { ADD_TOKEN, LOG_OUT, SET_USER_ID, SET_USERNAME, SET_EMAIL_ID, SET_IMAGE_URL } from "../actions/types"

export const initialState = {
    token: null,
    user_id: null,
    username: null,
    emailID: null,
    imageURL: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                token: null,
                user_id: null,
                username: null
            };
        case SET_USER_ID:
            return {
                ...state,
                user_id: action.payload
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_EMAIL_ID:
            return {
                ...state,
                emailID: action.payload
            }
        case SET_IMAGE_URL:
            return {
                ...state,
                imageURL: action.payload
            }
        default:
            return state;
    }
}
