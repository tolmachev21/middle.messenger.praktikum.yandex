import Handlebars from 'handlebars'
import * as Components from './components'
import * as Pages from './pages'

const pages = {
    'signIn': [ Pages.SignInPage ],
    'signUp': [ Pages.SignUpPage ],
    'navigate': [ Pages.NavigatePage],
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
    //@ts-ignore
    const [ source, context ] = pages[page]
    const appElement = document.getElementById('app')!

    const template = Handlebars.compile(source)
    appElement.innerHTML = template(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('navigate'))

document.addEventListener('click', (e) => {
    //@ts-ignore
    const page = e?.target.getAttribute('page')
    console.log(page)
    if (page) {
        navigate(page)
        console.log('this')
        e.preventDefault()
        e.stopImmediatePropagation()
    }
})
