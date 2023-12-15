import { getPath, getQueryParams } from './helper.js'
import { UI } from './ui.js'

export const routerLoading = (action = false) => {
    const loading = document.getElementById('loading')
    action ? loading.style.display = 'flex' : loading.style.display = 'none'
}

export const findRoute = async (path) => {
    try {

        const response = await fetch(`/${path}.html`)
        const htmlContent = await response.text()
        return htmlContent
    } catch (e) {
        return findRoute('error')
    }

}

export const viewRouter = async (path) => {

    const appDiv = document.getElementById('app');
    let findPage = await findRoute(path)


    appDiv.innerHTML = findPage
}

export const router = async () => {

    const replacePath = window.location.hash.slice(1).replace('/', '');


    const url = !replacePath ? 'home' : replacePath
    let path = getPath(url);
    path = path ? path : 'home'
    const queryParams = getQueryParams(url)

    if (path === 'home') {
        window.location.href = '/#/'

    }
    await viewRouter(path)

    if (UI[path]) {
        UI[path](queryParams)
    }

}