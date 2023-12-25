import Alpine from 'alpinejs'
import { serviceAuthLogin } from './services.js'
import { saveStorage } from './storage.js'

document.addEventListener('alpine:init', () => {

    Alpine.data('global', () => ({
        modalOpen: false,
        loginForm: {
            email: '',
            password: '',
        },
        formError: {},
        modal(action) {
            this.modalOpen = action
        },
        modalClose(e) {
            if (!e.target.closest(".modal-content")) {
                this.modalOpen = false
            }
        },
        async authLogin() {
            const res = await serviceAuthLogin(this.loginForm)
            if (res.status === 422) {
                this.formError = res.message
            } else {
                saveStorage("token", res.token)
                saveStorage("user", res.user)
                window.location.reload()
            }
        }
    }))

})