export const saveStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}
export const getStorage = (key) => {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : [];
};
