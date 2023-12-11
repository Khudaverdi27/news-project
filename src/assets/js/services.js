import { get } from './request.js';
export const serviceNewsList = async () => {
    const res = await get('/news')
    return res
}