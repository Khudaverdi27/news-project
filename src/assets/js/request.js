const baseUrl = 'https://all-api.bitcode.az/api'
const request = async (url, method, params = false) => {

    let headers = {}
    let options = {
        method,
        headers,
    }
    if (options.body) {
        JSON.stringify(params)
    }
    const api = await fetch(baseUrl + url, options)
    return await api.json()
}

export const get = (url) => request(url, 'GET')