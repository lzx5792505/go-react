const setStorage = (key, token ) => {
    return window.localStorage.setItem(key, token)
}

const getStorage = (key) => {
    return window.localStorage.getItem(key)
}

const removeStorage = (key) => {
    return window.localStorage.removeItem(key)
}

export {
    setStorage,
    getStorage,
    removeStorage
}