function getObjFromStorage(name) {
    return (
        JSON.parse(window.localStorage.getItem(name)) ||
        {}
    );
}

function setObjToStorage(name, obj) {
    window.localStorage.setItem(name, JSON.stringify(obj));
}

function updateObjInStroge(name, newObj) {
    let oldObj = getObjFromStorage(name);
    setObjToStorage(name, { ...oldObj, ...newObj });
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export default {
    getObjFromStorage,
    setObjToStorage,
    updateObjInStroge,
    utf8_to_b64,
    b64_to_utf8,
}