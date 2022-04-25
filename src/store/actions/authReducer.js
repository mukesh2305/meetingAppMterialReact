import {ADD_TOKEN,LOG_OUT,SET_USER_ID,SET_USERNAME, SET_EMAIL_ID, SET_IMAGE_URL} from "./types";

export const addToken = (token) => {
    return {
        type: ADD_TOKEN,
        payload: token
    }
}

export const setUser = (user_id) => {
    return {
        type: SET_USER_ID,
        payload: user_id
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export const setEmailId = (emailID) => {
    return {
        type: SET_EMAIL_ID,
        payload: emailID
    }
}

export const setImageURL= (imageURL) => {
    return {
        type: SET_IMAGE_URL,
        payload: imageURL
    }
}