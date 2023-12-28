import { getStorage, removeStorage } from "./storage";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlWeather = import.meta.env.VITE_WEATHER_URL;

const request = async (baseUrl, url, method, params = false) => {

    const token = getStorage("token")
    let headers = {
        'Accept': 'application/json',

    };


    let options = {
        method,
        headers,
    };

    if (params) {
        options.body = JSON.stringify(params);
        headers["Content-Type"] = "application/json";
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }

    const api = await fetch(baseUrl + url, options);

    if (api.ok) {
        return await api.json();
    } else if (api.status === 404) {
        return { status: 404 };
    } else if (api.status === 422) {
        return { status: 422, message: await api.json() };
    } else if (api.status === 401) {
        removeStorage("token")
        removeStorage("user")
        location.reload()
        return false
    }
    else {
        return { status: 500 };
    }
};
export const getWeather = (url) => request(urlWeather, url, 'GET');
export const get = (url) => request(baseUrl, url, 'GET');
export const deleteComment = (url) => request(baseUrl, url, 'DELETE');
export const post = (url, params) => request(baseUrl, url, 'POST', params);

