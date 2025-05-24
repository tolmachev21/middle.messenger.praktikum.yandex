import Block from '../../core/Block'
import { Button, Title, Link, StackedInput } from '../../components'
import { default as rawSignUp } from './signUp.hbs?raw'

import { router } from '../../main'
import { HTTPTransport } from '../../core/HttpTransport'

const query = new HTTPTransport('auth')

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
                onClick: (e: Event) => {
                    e.preventDefault();
                    const state = this.props as SignUpState;
                    if (Object.values(state.errorState).some((value) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        query.post('/signup', {
                            data: JSON.stringify(state.formState),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then((result) => {
                            if (typeof result !== 'string') return;
                            if (JSON.parse(result)?.id) {
                                router.go('/messenger')                                
                            }
                        }).catch((err) => console.log('err', err))
                    }
                },
            }),
            Link: new Link({
                text: 'Войти',
                type: 'default',
                size: 'small',
                name: 'Enter',
                onClick: () => router.go('/')
            }),
            InputEmail: new StackedInput({
                name: 'email',
                type: 'email',
                required: true,
                title: 'Почта',
                errorTemplate: 'Неверный формат почты. Только латинские буквы, цифры, символы @ и .',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            email: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            email: errorInputState,
                        },
                    });
                },
            }),
            InputLogin: new StackedInput({
                name: 'login',
                type: 'text',
                required: true,
                title: 'Логин',
                errorTemplate: 'Неверный формат логина. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            login: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            login: errorInputState,
                        },
                    });
                },
            }),
            InputFirstName: new StackedInput({
                name: 'first_name',
                type: 'text',
                required: true,
                title: 'Имя',
                errorTemplate: 'Неверный формат имени. Первая буква - заглавная, без пробелов и цифр',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            first_name: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            first_name: errorInputState,
                        },
                    });
                },
            }),
            InputSecondName: new StackedInput({
                name: 'second_name',
                type: 'text',
                required: true,
                title: 'Фамилия',
                errorTemplate: 'Неверный формат фамилии. Первая буква - заглавная, без пробелов и цифр',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            second_name: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            second_name: errorInputState,
                        },
                    });
                },
            }),
            InputPhone: new StackedInput({
                name: 'phone',
                type: 'tel',
                required: true,
                title: 'Телефон',
                errorTemplate: 'Неверный формат номера телефона. От 10 до 15 цифр, может начинаться с +',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^\+?\d{10,15}$/)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            phone: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            phone: errorInputState,
                        },
                    });
                },
            }),
            InputPassword: new StackedInput({
                name: 'password',
                type: 'password',
                required: true,
                title: 'Пароль',
                errorTemplate: 'Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            password: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            password: errorInputState,
                        },
                    });
                },
            }),
            InputPasswordRepeat: new StackedInput({
                name: 'password_repeat',
                type: 'password',
                required: true,
                title: 'Пароль (еще раз)',
                errorTemplate: 'Пароли не совпадают',
                hasValidInput: (validateValue: string): boolean => {
                    const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                    if (!regExp.test(validateValue)) {
                        return false;
                    };

                    if (validateValue !== this.props.formState.password) {
                        return false
                    };

                    return true;
                },
                onChange: (valueInputState: string, errorInputState: string) => {
                    if (!valueInputState && !errorInputState) return;

                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            password_repeat: valueInputState,
                        },
                        errorState: {
                            ...this.props.errorState,
                            password_repeat: errorInputState,
                        },
                    });
                },
            }),
        })
    }

    public render(): string {
        return rawSignUp
    }
}
