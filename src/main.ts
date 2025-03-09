import Handlebars from 'handlebars'
import * as Components from './components'
import * as Pages from './pages'

import renderDOM from "./core/renderDOM.ts";
import Block from "./core/Block.ts";

// Каждая страница принимает разные виды пропсов
type Constructor = new (...args: any[]) => Block;
type PageValue = [Constructor, any?] | [string, any?];
type PagesType = {
    [key: string]: PageValue
}

const pages: PagesType = {
    'signIn': [ Pages.SignInPage ],
    'signUp': [ Pages.SignUpPage ],
    'navigate': [ Pages.NavigatePage ],
    'error500': [ Pages.Error500Page ],
    'error404': [ Pages.Error404Page ],
    'profile': [ Pages.ProfilePage ],
    'updateProfile': [ Pages.UpdateProfilePage ],
    'updatePassword': [ Pages.UpdatePasswordPage ],
    'chats': [ Pages.ChatsPage ],
    'chatId': [ Pages.ChatIdPage ],
}

Object.entries(Components).forEach(([ name, template ]) => {
    if (typeof template === 'function') {
        return
    }

    Handlebars.registerPartial(name, template);
});

function navigate (page: string) {
    const [source, context] = pages[page]
    if (source instanceof Function) {
        renderDOM(new source())
        return
    }
    const appElement = document.getElementById('app')!

    const template = Handlebars.compile(source)
    appElement.innerHTML = template(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('navigate'))

document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const page = target?.getAttribute('page')

    if (page) {
        navigate(page)

        e.preventDefault()
        e.stopImmediatePropagation()
    }
})
