import { deleteComment, get, getWeather, post } from './request.js';
import { routerLoading } from './router.js';
import { getPosition } from './helper.js';


export const serviceNewsList = async (limit, params = false) => {
    routerLoading(true)
    const res = await get('/news' + (params ? "?" + `limit=${limit}&${params}` : `?limit=${limit}`))
    routerLoading(false)
    return res.data
}

export const serviceCategoryList = async () => {
    const category = await get('/news/category')
    return category

}

export const serviceNewsBySlug = async (slug) => {
    routerLoading(true)
    const res = await get(`/news/slug/${slug}`)
    routerLoading(false)
    return res
}
export const serviceNewsByIdComments = async (id) => {
    const res = await get(`/news/${id}/comments`)
    return res
}
export const serviceNewsPostComment = async (id, params) => {
    const res = await post(`/news/${id}/comment`, params)
    return res
}
export const serviceAuthLogin = async (params) => {
    const res = await post(`/users/login`, params)
    return res
}
export const serviceNewsDeleteComments = async (id, commentId) => {
    const res = await deleteComment(`/news/${id}/comment/${commentId}`)
    return res
}

export const serviceWeather = () => new Promise(async (resolve, reject) => {
    if ('geolocation' in navigator) {

        try {
            const position = await getPosition();
            const { latitude, longitude } = position.coords;
            const key = "1882ca3053a86bff2e348a30b9d66d62";
            const query = `weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

            resolve(await getWeather(query));
        } catch (error) {
            reject(error);
        }
    } else {
        reject(new Error('Browser dont support Geolocation'));
    }
});




