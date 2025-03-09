import Block from '../../core/Block'
import { Button, Title, Link, StackedInput } from '../../components'
import { default as rawSignUp } from './signUp.hbs?raw'

interface SignUpState {
    formState: {
        email: string;
        login: string;
        first_name: string;
        second_name: string;
        phone: string;
        password: string;
        password_repeat: string;
    };
    errorState: {
        email: string;
        login: string;
        first_name: string;
        second_name: string;
        phone: string;
        password: string;
        password_repeat: string;
    };
}

export default class SignUp extends Block {
    constructor() {
        super('main', {
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
                password: '',
                password_repeat: '',
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
                onClick: (e: Event) => {
                    e.preventDefault();
                    const state = this.props as SignUpState;
                    if (Object.values(state.errorState).some((value) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('email', state.formState.email)
                        console.log('login', state.formState.login)
                        console.log('first_name', state.formState.first_name)
                        console.log('second_name', state.formState.second_name)
                        console.log('phone', state.formState.phone)
                        console.log('password', state.formState.password)
                        console.log('password_repeat', state.formState.password_repeat)
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
                required: true,
                title: 'Почта',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.email = '';
                    const regExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)
                    if (!regExp.test(value)) {
                        state.errorState.email = "Неверный формат почты. Только латинские буквы, цифры, символы @ и ."
                    }
                    if (this.children.InputEmail instanceof Block) {
                        this.children.InputEmail.setProps({
                            error: state.errorState.email,
                            value,
                            hiddenErrorClassName: state.errorState.email ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...state.formState,
                            email: value
                        }
                    })
                },
            }),
            InputLogin: new StackedInput({
                name: 'login',
                type: 'text',
                required: true,
                title: 'Логин',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.login = '';
                    const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/)
                    if (!regExp.test(value)) {
                        state.errorState.login = "Неверный формат логина. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -"
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
            InputFirstName: new StackedInput({
                name: 'first_name',
                type: 'text',
                required: true,
                title: 'Имя',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.first_name = '';
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(value)) {
                        state.errorState.first_name = "Неверный формат имени. Первая буква - заглавная, без пробелов и цифр"
                    }
                    if (this.children.InputFirstName instanceof Block) {
                        this.children.InputFirstName.setProps({
                            error: state.errorState.first_name,
                            value,
                            hiddenErrorClassName: state.errorState.first_name ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...state.formState,
                            first_name: value
                        }
                    })
                },
            }),
            InputSecondName: new StackedInput({
                name: 'second_name',
                type: 'text',
                required: true,
                title: 'Фамилия',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.second_name = '';
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(value)) {
                        state.errorState.second_name = "Неверный формат фамилии. Первая буква - заглавная, без пробелов и цифр"
                    }
                    if (this.children.InputSecondName instanceof Block) {
                        this.children.InputSecondName.setProps({
                            error: state.errorState.second_name,
                            value,
                            hiddenErrorClassName: state.errorState.second_name ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...state.formState,
                            second_name: value
                        }
                    })
                },
            }),
            InputPhone: new StackedInput({
                name: 'phone',
                type: 'tel',
                required: true,
                title: 'Телефон',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.phone = '';
                    const regExp = new RegExp(/^\+?\d{10,15}$/)
                    if (!regExp.test(value)) {
                        state.errorState.phone = "Неверный формат номера телефона. От 10 до 15 цифр, может начинаться с +"
                    }
                    if (this.children.InputPhone instanceof Block) {
                        this.children.InputPhone.setProps({
                            error: state.errorState.phone,
                            value,
                            hiddenErrorClassName: state.errorState.phone ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...state.formState,
                            phone: value
                        }
                    })
                },
            }),
            InputPassword: new StackedInput({
                name: 'password',
                type: 'password',
                required: true,
                title: 'Пароль',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.password = '';
                    const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                    if (!regExp.test(value)) {
                        state.errorState.password = "Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
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
            InputPasswordRepeat: new StackedInput({
                name: 'password_repeat',
                type: 'password',
                required: true,
                title: 'Пароль (еще раз)',
                hiddenTitleClassName: 'display_none',
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    const state = this.props as SignUpState;
                    state.errorState.password_repeat = '';
                    if (value !== state.formState.password) {
                        state.errorState.password_repeat = 'Пароли не совпадают'
                    }
                    if (this.children.InputPasswordRepeat instanceof Block) {
                        this.children.InputPasswordRepeat.setProps({
                            error: state.errorState.password_repeat,
                            value,
                            hiddenErrorClassName: state.errorState.password_repeat ? '' : 'display_none',
                        });
                    }
                    this.setProps({
                        formState: {
                            ...state.formState,
                            password_repeat: value
                        }
                    })
                },
            }),
        })
    }

    public render(): string {
        return rawSignUp
    }
}
