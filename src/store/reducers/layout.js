import { SET_USER_IN_VICINITY, SET_DOMINANT_SPEAKER, SET_ACTIVE_CONFERENCE_ID } from "../actions/types";

export const initialState = {
    type: "speaker",  //default layout,
    activeRoomId: "test12345",
    pinnedParticipantId: null,
    presenterParticipantId: null,
    presenterParticipantIds: [],
    userInVicinity: [],
    raisedHandParticipantIds: {},
    dominantSpeakerId: null
}

export const layout = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_IN_VICINITY:
            state.userInVicinity = action.vicinityUser.slice()
            // console.log("done! = ", state);
            return {...state};            

        case SET_ACTIVE_CONFERENCE_ID:
            const { activeRoomId} = action;
            state.activeRoomId = activeRoomId
            return {...state};

        case SET_DOMINANT_SPEAKER:
            state.dominantSpeakerId = action.payload;
            return { ...state };

        default:
            return state;
    }
};
