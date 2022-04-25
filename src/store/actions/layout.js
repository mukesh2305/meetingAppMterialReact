import * as Constants from "./types";

export const setActiveServerId = (id) => {
    return {
        type: Constants.SET_ACTIVE_SERVER_ID,
        payload: id
    }
}

export const setActiveSpaceId = (id) => {
    return {
        type: Constants.SET_ACTIVE_SPACE_ID,
        payload: id
    }
}

export const setActiveGroupId = (id) => {
    return {
        type: Constants.SET_ACTIVE_GROUP_ID,
        payload: id
    }
}

export const setLocalUserDetails = (payload) => {
    return {
        type: Constants.SET_LOCAL_USER_DETAIL,
        payload,
    }
}

export const masterChannelDetails = (payload) => {
    return {
        type: Constants.SET_MASTER_CHANNEL_DETAIL,
        payload,
    }
}


export const setUserInVicinity = (vicinityUser) => {
    return {
        type: Constants.SET_USER_IN_VICINITY,
        vicinityUser:vicinityUser,
    }
}



export const setMasterChannelDetails = (payload) => {
    return {
        type: Constants.SET_ACTIVE_GROUP_ID,
        payload,
    }
}


export const setLayout = (type) => {
    return {
        payload: type,
        type: Constants.SET_LAYOUT
    }
}

export const setFullScreen = (mode) => {
    return {
        type: Constants.SET_FULLSCREEN_MODE,
        payload: mode,
    }
}

export const setPinParticipant = (id) => {
    return {
        type: Constants.SET_PIN_PARTICIPANT,
        payload: id,
    }
}

export const setRaiseHand = (payload) => {
    return {
        type: Constants.SET_HAND_RAISE,
        payload
    }
}


export const setDisconnected = (disconnected) => {
    return {
        type: Constants.SET_DISCONNECTED,
        payload: disconnected,
    }
}

export const setPresenter = (id) => {
    return {
        type: Constants.SET_PRESENTER,
        payload: id,
    }
}


export const setDominantSpeakerId = (id) => {
    return {
        type: Constants.SET_DOMINANT_SPEAKER,
        payload: id,
    }
}

export const setPresentationtType = (payload) => {
    return {
        type: Constants.SET_PRESENTATION_TYPE,
        payload
    }
}