import '../css/index.css';
import Alpine from 'alpinejs'
import { uiNavigator, uiSubscription, uiNews } from './ui.js';

window.Alpine = Alpine

Alpine.start()

uiNavigator()
uiSubscription()
uiNews()