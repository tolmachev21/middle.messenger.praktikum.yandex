import Block from '../../core/Block'
import { Button, Title, Link, StackedInput } from '../../components'
import { default as rawSignUp } from './signUp.hbs?raw'

export default class SignUp extends Block {
    constructor (props: any) {
        super ('main', {
            ...props,
            formState: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                password: '',
                password_repeat: '',
            },
            errorState: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
            },
            className: 'page',
            Title: new Title({
                text: 'Регистрация',
                size: 'default',
            }),
            Button: new Button({
                text: 'Зарегистрироваться',
                className: 'default',
                name: 'Sign up', 
                type: 'submit', 
                page: 'signIn',
                onClick: (e: any) => {
                    e.preventDefault();
                    if (Object.values(this.props.errorState).some((value: unknown) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('email', this.props.formState.email)
                        console.log('login', this.props.formState.login)
                        console.log('first_name', this.props.formState.first_name)
                        console.log('second_name', this.props.formState.second_name)
                        console.log('phone', this.props.formState.phone)
                        console.log('password', this.props.formState.password)
                        console.log('password_repeat', this.props.formState.password_repeat)
                    }
                },
            }),
            Link: new Link({
                text: 'Войти',
                type: 'default',
                size: 'small',
                page: 'signIn',
                name: 'Enter',
            }),
            InputEmail: new StackedInput({
                name: 'email',
                type: 'email',
                required: 'required',
                title: 'Почта',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.email = ''
                    const regExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)
                    if (!regExp.test(value)) {
                        this.props.errorState.email = "Неверный формат почты. Только латинские буквы, цифры, символы @ и ."
                    }
                    if (this.children.InputEmail instanceof Block) {
                        this.children.InputEmail.setProps({
                            error: this.props.errorState.email,
                            value,
                            hiddenErrorClassName: this.props.errorState.email ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            email: value
                        }
                    })
                },
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
                        this.props.errorState.login = "Неверный формат логина. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -"
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
            InputFirstName: new StackedInput({
                name: 'first_name',
                type: 'text',
                required: 'required',
                title: 'Имя',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.first_name = ''
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(value)) {
                        this.props.errorState.first_name = "Неверный формат имени. Первая буква - заглавная, без пробелов и цифр" 
                    }
                    if (this.children.InputFirstName instanceof Block) {
                        this.children.InputFirstName.setProps({
                            error: this.props.errorState.first_name,
                            value,
                            hiddenErrorClassName: this.props.errorState.first_name ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            first_name: value
                        }
                    })
                },
            }),
            InputSecondName: new StackedInput({
                name: 'second_name',
                type: 'text',
                required: 'required',
                title: 'Фамилия',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.second_name = ''
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(value)) {
                        this.props.errorState.second_name = "Неверный формат фамилии. Первая буква - заглавная, без пробелов и цифр"
                    }
                    if (this.children.InputSecondName instanceof Block) {
                        this.children.InputSecondName.setProps({
                            error: this.props.errorState.second_name,
                            value,
                            hiddenErrorClassName: this.props.errorState.second_name ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            second_name: value
                        }
                    })
                },
            }),
            InputPhone: new StackedInput({
                name: 'phone',
                type: 'tel',
                required: 'required',
                title: 'Телефон',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.phone = ''
                    const regExp = new RegExp(/^\+?\d{10,15}$/)
                    if (!regExp.test(value)) {
                        this.props.errorState.phone = "Неверный формат номера телефона. От 10 до 15 цифр, может начинаться с +"
                    }
                    if (this.children.InputPhone instanceof Block) {
                        this.children.InputPhone.setProps({
                            error: this.props.errorState.phone,
                            value,
                            hiddenErrorClassName: this.props.errorState.phone ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            phone: value
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
                        this.props.errorState.password = "Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
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
            InputPasswordRepeat: new StackedInput({
                name: 'password_repeat',
                type: 'password',
                required: 'required',
                title: 'Пароль (еще раз)',
                hiddenTitleClassName: 'display_none',
                onChange: (e: any) => {
                    const value = e.target.value;
                    this.props.errorState.password_repeat = ''
                    if (value !== this.props.formState.password) {
                        this.props.errorState.password_repeat = 'Пароли не совпадают'
                    }
                    if (this.children.InputPasswordRepeat instanceof Block) {
                        this.children.InputPasswordRepeat.setProps({
                            error: this.props.errorState.password_repeat,
                            value,
                            hiddenErrorClassName: this.props.errorState.password_repeat ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            password_repeat: value
                        }
                    })
                },
            }),
        })
    }

    public render ():string {
        return rawSignUp
    }
}
