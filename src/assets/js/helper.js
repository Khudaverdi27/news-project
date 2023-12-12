export const getQueryParams = (url) => {
    const queryString = url?.split('?')[1];

    const queryParams = {};

    queryString?.split('&').forEach(param => {
        const [key, value] = param.split('=')
        queryParams[key] = decodeURIComponent(value);
    });

    return queryParams;
}

export const getPath = (url) => {
    const pathMatch = url.match(/^(.*?)\?/)
    return pathMatch ? pathMatch[1] : null
}