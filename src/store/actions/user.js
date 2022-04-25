import * as Constants from "./types";

export const setUser = (data) => {
    return {
        type: Constants.SET_USER,
        payload: data
    }
}

export const logout = (data) => {
    return {
        type: Constants.SET_USER,
        payload: data
    }
}