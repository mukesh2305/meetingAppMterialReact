import { SET_SELECTED_PEOPLE } from "./types"

export const showSelectedPeople = (data) => {
    // alert("inside showSelectedPeople")
    return {
        type: SET_SELECTED_PEOPLE,
        payload: data
    }
}