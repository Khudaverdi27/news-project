import { serviceNewsList, serviceCategoryList } from "./services.js"

export const getUiTemplate = (id, selector) => {
    const element = document.getElementById(id)
    const clone = element.content.cloneNode(true)

    return clone.querySelector(selector)
}

const getCategoryIcon = (key) => {
    const icons = {
        "world": 'icon icon-globe1',
        "politics": 'icon icon icon-slack1',
        "sports": ' icon icon-soccer-ball-o',
        "technology": 'icon icon-smartphone',
        "economy": 'icon icon-pie-chart',
        "entertainment": 'icon icon-film1',
        "health": 'icon icon-activity',
        "science": 'icon icon-newspaper-o',
        "culture": 'icon icon-slideshare',
        "environment": 'icon icon-ge'
    }
    return icons[key]
}

export const uiNavigator = async () => {

    const category = await serviceCategoryList()
    const navContainer = document.getElementById('navigation')
    const tagLink = getUiTemplate('navigation-item', '.nav-link')
    let html = ''

    category.forEach(c => {
        let newtemplate = tagLink
        newtemplate.querySelector('i').classList = `${getCategoryIcon(c.slug)}`
        newtemplate.querySelector('.category-head').textContent = c.name
        html += newtemplate.outerHTML
    });
    navContainer.innerHTML = html
}

export const uiSubscription = () => {
    const content = document.getElementById('subscription')
    const item = getUiTemplate('subscription-box', 'div')
    content.innerHTML = item.outerHTML

}
export const uiNews = async () => {
    const res = await serviceNewsList()
    const content = document.getElementById('news-content')
    const template = getUiTemplate('news-template', 'article')

    let html = ''

    res.forEach(i => {
        let newtemplate = template
        newtemplate.querySelector('figure img').src = i.photo
        newtemplate.querySelector('.title').textContent = i.title
        newtemplate.querySelector('.description').textContent = i.description
        newtemplate.querySelector('.agency').textContent = i.author.agency
        html += template.outerHTML
    });
    content.innerHTML = html
}