import {LOADER} from "./types";

export const showLoader = (status) => {
    return {
        type: LOADER,
        payload: status
    }
}

