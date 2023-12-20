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
    return icons[key ? key : "few clouds"]
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
    let newsCount = 4;
    let value = true
    try {
        const content = document.getElementById('news-content');
        const template = getUiTemplate('news-template', 'article');
        const showBtn = document.getElementById('moreNews');

        const updateContent = (newsList) => {
            let html = '';
            newsList.forEach(item => {
                template.querySelector('figure img').src = item.photo;
                template.querySelector('.title').textContent = item.title;
                template.querySelector('.description').textContent = item.description;
                template.querySelector('.agency').textContent = item.author.agency;
                template.querySelector('.publishDate').textContent = moment(item.published_date).format('DD-MM-YY, HH:mm');
                template.querySelector('.read-later').href = `/#/view?slug=${item.slug}`;
                html += template.outerHTML;
            });
            content.innerHTML = html;
            if (newsList.length >= 20 && value) {
                showBtn.style.display = 'none';
                value = false
            } else {
                showBtn.style.display = 'flex';
            }
        };

        const res = await serviceNewsList(newsCount, objectToQueryString(params));
        updateContent(res);

        const loadMoreNews = async () => {
            const additionalNews = await serviceNewsList(newsCount + 2, objectToQueryString(params));
            newsCount += 4;
            updateContent(additionalNews);
        };
        showBtn.addEventListener('click', loadMoreNews);

    } catch (error) {
        console.error('error happened:', error);
    }
};





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