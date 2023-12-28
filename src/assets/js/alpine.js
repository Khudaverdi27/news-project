import Alpine from 'alpinejs'
import { getStorage } from './storage.js'
import { AuthMethod, NewsMethod } from './methods.js'

document.addEventListener('alpine:init', () => {

    Alpine.data('global', () => ({

        modalOpen: false,
        loginForm: {
            email: '',
            password: '',
        },
        commentForm: {
            body: "",
        },
        formError: {},
        user: getStorage("user"),

        modal(action) {
            this.modalOpen = action
        },
        modalClose(e) {
            if (!e.target.closest(".modal-content")) {
                this.modalOpen = false
            }
        },
        ...AuthMethod,
        ...NewsMethod
    }))

})