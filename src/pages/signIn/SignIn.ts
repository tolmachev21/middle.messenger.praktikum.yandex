import Block from '../../core/Block'
import { default as rawSignIn } from './signIn.hbs?raw'
import { Button, Link, StackedInput, Title } from '../../components'

export default class SignIn extends Block {
    constructor (props: any) {
        super ('main', {
            ...props,
            formState: {
                login: '',
                password: '',
            },
            errorState: {
                login: '',
                password: '',
            },
            className: 'page',
            Title: new Title({
                text: 'Вход',
                size: 'default',
            }),
            Button: new Button({
                text: 'Авторизоваться',
                className: 'default',
                name: 'Sign in', 
                type: 'submit', 
                page: 'chats',
                onClick: (e: Event) => {
                    e.preventDefault();
                    const state = this.props;
                    if (Object.values(state.errorState).some((value) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('login', state.formState.login)
                        console.log('password', state.formState.password)
                    }
                },
            }),
            Link: new Link({
                text: 'Нет аккаунта?',
                type: 'default',
                size: 'small',
                page: 'signUp',
                name: 'Registration',
            }),
            InputLogin: new StackedInput({
                name: 'login',
                type: 'text',
                required: true,
                title: 'Логин',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props;
                    state.errorState.login = '';
                    const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/)
                    if (!regExp.test(value)) {
                        state.errorState.login = "Неверный логин"
                    }
                    if (this.children.InputLogin instanceof Block) {
                        this.children.InputLogin.setProps({
                            error: state.errorState.login,
                            value,
                            hiddenErrorClassName: state.errorState.login ? '' : 'display_none',
                        });
                    }
                    
                    this.setProps({
                        formState: {
                            ...state.formState,
                            login: value
                        }
                    })
                },
            }),
            InputPassword: new StackedInput({
                name: 'password',
                type: 'password',
                required: true,
                title: 'Пароль',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props;
                    state.errorState.password = '';
                    const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                    if (!regExp.test(value)) {
                        state.errorState.password = "Неверный пароль"
                    }
                    if (this.children.InputPassword instanceof Block) {
                        this.children.InputPassword.setProps({
                            error: state.errorState.password,
                            value,
                            hiddenErrorClassName: state.errorState.password ? '' : 'display_none',
                        });
                    }
                    
                    this.setProps({
                        formState: {
                            ...state.formState,
                            password: value
                        }
                    })
                },
            }),
        })
    }

    public render(): string {
        return rawSignIn
    }
}

