import Block from '../../core/Block'
import { Button, Title, Link, StackedInput } from '../../components'
import { default as rawSignIn } from './signIn.hbs?raw'

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
                onClick: (e: any) => {
                    e.preventDefault();
                    if (Object.values(this.props.errorState).some((value: unknown) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('login', this.props.formState.login)
                        console.log('password', this.props.formState.password)
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
                required: 'required',
                title: 'Логин',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.login = ''
                    const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/)
                    if (!regExp.test(value)) {
                        this.props.errorState.login = "Неверный логин"
                    }
                    if (this.children.InputLogin instanceof Block) {
                        this.children.InputLogin.setProps({
                            error: this.props.errorState.login,
                            value,
                            hiddenErrorClassName: this.props.errorState.login ? '' : 'display_none',
                        });
                    }
                    
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            login: value
                        }
                    })
                },
            }),
            InputPassword: new StackedInput({
                name: 'password',
                type: 'password',
                required: 'required',
                title: 'Пароль',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.password = ''
                    const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                    if (!regExp.test(value)) {
                        this.props.errorState.password = "Неверный пароль"
                    }
                    if (this.children.InputPassword instanceof Block) {
                        this.children.InputPassword.setProps({
                            error: this.props.errorState.password,
                            value,
                            hiddenErrorClassName: this.props.errorState.password ? '' : 'display_none',
                        });
                    }
                    
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            password: value
                        }
                    })
                },
            }),
        })
    }

    public render ():string {
        return rawSignIn
    }
}

