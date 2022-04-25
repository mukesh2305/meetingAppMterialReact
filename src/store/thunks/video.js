import { setUserInVicinity } from "../actions/layout";

export const setVicinityUser = (data) => (dispatch) => {
    // console.log("In vicinity function = ",data);
    dispatch(setUserInVicinity(data));
}