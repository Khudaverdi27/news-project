import { get } from './request.js';
export const serviceNewsList = async () => {
    const res = await get('/news')
    return res.data
}

export const serviceCategoryList = async () => {
    const category = await get('/news/category')
    return category

}