import { serviceNewsList } from "./services.js"

export const getUiTemplate = (id, selector) => {
    const element = document.getElementById(id)
    const clone = element.content.cloneNode(true)

    return clone.querySelector(selector)
}

export const uiNavigator = () => {
    const navContainer = document.getElementById('navigation')
    const tagLink = getUiTemplate('navigation-item', '.nav-link')
    navContainer.innerHTML = tagLink.outerHTML
}

export const uiSubscription = () => {
    const content = document.getElementById('subscription')
    const item = getUiTemplate('subscription-box', 'div')
    content.innerHTML = item.outerHTML

}
export const uiNews = async () => {
    const res = serviceNewsList()
    const content = document.getElementById('news-content')
    const template = getUiTemplate('news-template', 'article')
    content.innerHTML = template.outerHTML

}