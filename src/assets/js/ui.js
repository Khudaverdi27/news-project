import { viewRouter } from "./router.js";
import { serviceNewsList, serviceCategoryList, serviceNewsBySlug, serviceWeather } from "./services.js"
import moment from 'moment';
import { getStorage, saveStorage } from "./storage.js";
import { objectToQueryString } from "./helper.js";


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
        "environment": 'icon icon-ge',
        "clear sky": "icon icon-sun",
        "few clouds": "icon icon-cloud",
        "scattered clouds": "icon icon-cloud1",
        "broken clouds": "icon icon-cloud",
        "shower rain": "icon icon-cloud-rain",
        "rain": "icon icon-cloud-drizzle",
        "thunderstorm": "icon icon-cloud-lightning",
        "snow": "icon icon-cloud-snow",
        "mist": "icon icon-cloud1"
    }
    return icons[key]
}

export const toCapitalizeLetter = (str) => {
    return (str).charAt(0).toUpperCase() + (str).slice(1);
}

export const uiNavigator = async () => {

    const category = await serviceCategoryList()
    saveStorage("categories", category)

    const navContainer = document.getElementById('navigation')
    const tagLink = getUiTemplate('navigation-item', '.nav-link')
    let html = ''

    category.forEach(c => {
        let newtemplate = tagLink
        newtemplate.querySelector('i').classList = `${getCategoryIcon(c.slug)}`
        newtemplate.querySelector('.category-head').textContent = toCapitalizeLetter(c.slug)
        newtemplate.href = `/#/search?category=${c.slug}`
        html += newtemplate.outerHTML
    });

    navContainer.innerHTML = html
}

export const uiNews = async (params = {}) => {

    const res = await serviceNewsList(4, objectToQueryString(params))
    const content = document.getElementById('news-content')
    const template = getUiTemplate('news-template', 'article')

    let html = ''

    res.forEach(i => {
        let newtemplate = template
        newtemplate.querySelector('figure img').src = i.photo
        newtemplate.querySelector('.title').textContent = i.title
        newtemplate.querySelector('.description').textContent = i.description
        newtemplate.querySelector('.agency').textContent = i.author.agency
        newtemplate.querySelector('.publishDate').textContent = moment(i.published_date).format(' HH:mm');
        newtemplate.querySelector('.read-later').href = `/#/view?slug=${i.slug}`
        html += newtemplate.outerHTML
    });

    content.innerHTML = html
}



export const uiNewsView = async (slug) => {
    const res = await serviceNewsBySlug(slug)

    if (res?.status === 404) {

        viewRouter('error')
        return false
    }
    const content = document.getElementById('news-view')
    const template = getUiTemplate('news-view-content', 'div')
    template.querySelector('#title').textContent = res.title
    template.querySelector('#category').textContent = toCapitalizeLetter(res.category.slug)
    template.querySelector('#category').href = `/#/search?category=${res.category.slug}`
    template.querySelector('#photo').src = res.photo
    template.querySelector('#content').innerHTML = res.content
    content.innerHTML = template.outerHTML
}

export const newsSearch = (params) => {
    let categories = getStorage('categories');
    const { category } = params

    const findCategory = categories.find(c => c.slug === category)



    document.getElementById('pageTitle').textContent = toCapitalizeLetter(findCategory.slug)
    uiNews(params)

}

const weatherInfo = async () => {
    const weatherInfo = await serviceWeather()
    document.getElementById('cityName').textContent = `${weatherInfo.name}, ${weatherInfo.sys.country}`
    document.getElementById('wheaterType').textContent = weatherInfo.weather[0].main
    document.getElementById('weatherIcon').classList = getCategoryIcon(weatherInfo.weather[0].description)
    document.getElementById('weatherTemp').textContent = Math.round(weatherInfo.main.temp - 272.15)

}

export const UI = {
    home() {
        uiNews()
        weatherInfo()
    },
    view({ slug }) {
        uiNewsView(slug)
        weatherInfo()
    },
    search(params) {
        newsSearch(params)
        weatherInfo()
    }
}