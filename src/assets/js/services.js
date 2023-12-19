import { get, getWeather } from './request.js';
import { routerLoading } from './router.js';

export const serviceNewsList = async (params = false) => {

    routerLoading(true)
    const res = await get('/news' + (params ? "?" + params : ""))
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

export const serviceWeather = async () => {
    const query = "weather?q=Baku&appid=1882ca3053a86bff2e348a30b9d66d62&lang=en";
    const info = await getWeather(query)

    return info

}