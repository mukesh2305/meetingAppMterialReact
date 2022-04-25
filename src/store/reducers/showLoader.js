import { LOADER } from "../actions/types"

export const initialState = false

export const showLoader = (state = initialState, action) => {
    switch (action.type) {
        case LOADER:
            state = action.payload;
            return { ...state };
        default:
            return state;
    }
}
