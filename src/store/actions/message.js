import * as Constants from "./types";

export const addMessage = (payload) => {
    return {
        type: Constants.ADD_MESSAGE,
        payload
    }
}

export const addArchivedMessage = (payload) => {
    return {
        type: Constants.ADD_ARCHIVED_MESSAGE,
        payload
    }
}