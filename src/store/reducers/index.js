import { audioIndicator } from "./audioIndicator";
import { combineReducers } from "redux";
import { user } from "./user";
import { layout } from "./layout";
import { color } from "./color";
import { localTrack } from "./localTrack";
import { remoteTrack } from "./remoteTrack";
import { conference } from "./conference";
import { connection } from "./connection";
import { authReducer } from "./authReducer";
import { notesReducer, groupNotesReducer } from "./notes";
import { showLoader } from "./showLoader";
import { inviteMembers } from "./inviteMembers";
import { otpLoginReducer } from "./otpLogin";
import { calendarEventsReducer } from "./calendarEvents"
import { selectedPeople } from "./selectePeople";


export const appReducer = combineReducers({
    user,
    layout,
    color,
    audioIndicator,
    localTrack,
    remoteTrack,
    conference,
    connection,
    authReducer,
    notesReducer,
    groupNotesReducer,
    showLoader,
    inviteMembers,
    otpLoginReducer,
    calendarEventsReducer,
    selectedPeople
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {};
    }
    return appReducer(state, action);
}
