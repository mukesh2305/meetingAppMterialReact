import * as Constants from "./types";

export const setServer = (data) => {
    return {
        type: Constants.SET_SERVER,
        payload: data
    }
}