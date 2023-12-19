import '../css/index.css';
import Alpine from 'alpinejs'
import { uiNavigator } from './ui.js';
import { router } from './router.js';
import { serviceWeather } from './services.js';
window.Alpine = Alpine

Alpine.start()

window.addEventListener('load', router)
window.addEventListener('hashchange', router)

const start = async () => {
    await uiNavigator()
    serviceWeather()
}

start()
