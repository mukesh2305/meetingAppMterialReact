// import { SET_SELECTED_PEOPLE } from "../actions/types";

const initialState = {
    selectedPeople: []
}
export const selectedPeople = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_SELECTED_PEOPLE":
            console.log(payload);
            // alert("selectedPeople reduxer");
            return { ...state, selectedPeople: [...payload] }

        default:
            return { ...state }
    }
} 