import { serviceAuthLogin, serviceNewsDeleteComments, serviceNewsPostComment } from './services.js'
import { removeStorage, saveStorage } from './storage.js'
import Swal from 'sweetalert2'
import { newsComments } from './ui.js'
export const AuthMethod = {
    async authLogin() {
        const res = await serviceAuthLogin(this.loginForm)
        if (res.status === 422) {
            this.formError = res.message
        } else {
            saveStorage("token", res.token)
            saveStorage("user", res.user)
            window.location.reload()
        }
    },

    authLogout() {
        removeStorage("user")
        removeStorage("token")
        location.reload()
    }
}

export const NewsMethod = {
    async newsCommentPost() {
        const newsId = document.querySelector("#newsId")?.value;
        const res = await serviceNewsPostComment(newsId, this.commentForm);

        if (res.status === 422) {
            this.commentError = res.message;
        }
        if (res.id) {
            newsComments(newsId);
            location.reload()
            this.commentForm = { body: '' };
        }
    },

    async newsDeleteComments(e) {

        const alert = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (alert.isConfirmed) {
            const commentId = e.target.getAttribute('data-comment-id');
            const res = await serviceNewsDeleteComments(newsId.value, commentId);
            if (res) {
                newsComments(newsId.value);
                location.reload()
            }
        }
    }

};
