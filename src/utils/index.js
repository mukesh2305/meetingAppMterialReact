import React from "react";
import { store } from "../store/store";
import { logout } from "../store/actions/user";
import { API_SERVICE_HOST } from "../config";
import { setLocalStorage } from "./localStorage";
import { GENERATE_TOKEN_URL } from "../constants"
import { LOADER } from "../store/actions/types";
import { showLoader } from "../store/actions/showLoader";

export async function apiCall(path, method, body = {}, headers = {}, loader = false) {

    if (loader) {
        store.dispatch(showLoader(true));
    }

    let url = `${API_SERVICE_HOST}${path}`;

    const requestHeaders = { "Content-Type": "application/json", ...headers };

    if (method.toUpperCase() === "GET" && Object.keys(body).length) {
        const queryString = new URLSearchParams(body).toString();
        url = `${url}?${queryString}`;
    }

    const state = store.getState();

    if (state.authReducer.token) {
        requestHeaders["Authorization"] = `Bearer ${state.authReducer.token}`;
    }

    const payload = {
        method,
        headers: requestHeaders,
    };

    if (method.toUpperCase() !== "GET" && method.toUpperCase() !== "HEAD") {
        payload.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, payload);

        if (response.status === 401) {
            store.dispatch(logout());
        }

        if (response.status === 403 && method.toUpperCase() !== "GET") {
            //    store.dispatch(showSnackbar(true));
        }

        if (response.status === 204) {
            if (loader)
                store.dispatch(showLoader(false));
            return {};
        }
        if (response.ok) {
            if (loader)
                store.dispatch(showLoader(false));
            return await response.json();
        }
        if (loader)
            store.dispatch(showLoader(false));
        return {
            badHttpStatus: response.status,
            statusText: response.statusText,
            body: await response.json(),
        };
    } catch (error) {
        if (loader)
            store.dispatch(showLoader(false));
        return { error, badHttpStatus: 500 };
    }
}

export async function getToken(userId) {
    console.log("userDatauserDatauserDatauserDatauserDatauserDatauserData", userId);
    const body = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                id: userId?.toLowerCase()
            },
            apiKey: "249306aabec4114c213dc7ed65ecb48e34d606af81bb249e29daaf",

        })
    };

    try {
        const response = await fetch(GENERATE_TOKEN_URL, body);
        if (response.ok) {
            const json = await response.json();
            localStorage.setItem("sariska_token", json.token);
            return json.token;
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log('error', error);
    }
}

export function videoShadow(level) {
    const scale = 2;

    // Internal circle audio level.
    const int = {
        level: level > 0.15 ? 20 : 0,
        color: "rgba(255,255,255,0.4)"
    };

    // External circle audio level.
    const ext = {
        level: parseFloat(
            ((int.level * scale * level) + int.level).toFixed(0)),
        color: "rgba(255,255,255,0.2)"
    };

    // Internal blur.
    int.blur = int.level ? 2 : 0;

    // External blur.
    ext.blur = ext.level ? 6 : 0;

    return [
        `0 0 ${int.blur}px ${int.level}px ${int.color}`,
        `0 0 ${ext.blur}px ${ext.level}px ${ext.color}`
    ].join(', ');
}


export function calculateRowsAndColumns(totalParticipant, viewportWidth, viewportHeight) {
    const numWindows = totalParticipant;
    const columns = Math.ceil(Math.sqrt(numWindows));
    const rows = Math.ceil(numWindows / columns);
    const gridItemWidth = viewportWidth / columns;
    let gridItemHeight = viewportHeight / rows;
    if (gridItemHeight > gridItemWidth * 9 / 16) {
        gridItemHeight = gridItemWidth * 9 / 16
    }
    return { rows, columns, gridItemWidth, gridItemHeight };
}
export function getRandomColors() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}