const baseUrl = import.meta.env.VITE_BASE_URL
const urlWeather = import.meta.env.VITE_WEATHER_URL;
const request = async (baseUrl, url, method, params = false) => {

    let headers = {
        'Accept': 'application/json'
    }
    let options = {
        method,
        headers,
    }
    if (options.body) {
        JSON.stringify(params)
    }
    const api = await fetch(baseUrl + url, options)
    if (api.ok) {
        return await api.json()
    } else if (api.status === 404) {
        return { status: 404 }
    } else {
        return { status: 500 }
    }

}

export const get = (url) => request(baseUrl, url, 'GET')
export const getWeather = (url) => request(urlWeather, url, 'GET')