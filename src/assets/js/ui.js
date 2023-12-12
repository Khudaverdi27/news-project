import { serviceNewsList, serviceCategoryList, serviceNewsBySlug } from "./services.js"

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
        newtemplate.querySelector('.category-head').textContent = (c.slug).charAt(0).toUpperCase() + (c.slug).slice(1);
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
        newtemplate.querySelector('.read-later').href = `/#/view?slug=${i.slug}`
        html += template.outerHTML
    });
    content.innerHTML = html
}

export const uiNewsView = async (slug) => {
    const res = await serviceNewsBySlug()
    const content = document.getElementById('news-view')
    const template = getUiTemplate('news-view-content', 'div')
}

export const UI = {
    home() {
        uiNews()
    },
    view({ slug }) {
        uiNewsView(slug)
    }
}