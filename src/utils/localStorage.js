let isSupported = true;
if (typeof window.localStorage === "undefined") {
    console.log("local storage is not supported");
    isSupported = false;
}

export function getLocalStorage(key) {
    if (isSupported) {
        let data = window.localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }
}

export function setLocalStorage(key, value) {
    if (isSupported) {
        try {
            const data = JSON.stringify(value);
            window.localStorage.setItem(key, data);
        } catch (e) {
            console.log(e);
        }
    }
}

export function removeLocalStorageoveL(key) {
    if (isSupported) {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    }
}
