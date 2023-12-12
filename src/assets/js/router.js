import { getPath, getQueryParams } from './helper.js'
import { UI } from './ui.js'
const findRoute = async (path) => {
    try {

        const response = await fetch(`/${path}.html`)
        const htmlContent = await response.text()
        return htmlContent
    } catch (e) {
        return findRoute('error')
    }

}

export const router = async () => {
    const appDiv = document.getElementById('app');
    const replacePath = window.location.hash.slice(1).replace('/', '');


    const url = !replacePath ? 'home' : replacePath
    let path = getPath(url);
    path = path ? path : 'home'
    const queryParams = getQueryParams(url)

    if (!path) {
        window.location.href = '/#/'

    }
    let findPage = await findRoute(path)


    appDiv.innerHTML = findPage

    if (UI[path]) {
        UI[path](queryParams)
    }

}