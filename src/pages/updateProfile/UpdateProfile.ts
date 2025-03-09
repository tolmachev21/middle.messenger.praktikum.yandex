import { Button, InlineInput } from '../../components'
import Block from '../../core/Block'
import { default as rawUpdateProfile } from './updateProfile.hbs?raw'

export default class UpdateProfile extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            formState: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                display_name: '',
                phone: '',
            },
            errorState: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                display_name: '',
                phone: '',
            },
            Button: new Button({
                text: 'Сохранить',
                className: 'default',
                type: 'submit',
                page: 'profile',
                onClick: (e: any) => {
                    e.preventDefault();
                    if (Object.values(this.props.errorState).some((value: unknown) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('email', this.props.formState.email)
                        console.log('login', this.props.formState.login)
                        console.log('first_name', this.props.formState.first_name)
                        console.log('second_name', this.props.formState.second_name)
                        console.log('display_name', this.props.formState.display_name)
                        console.log('phone', this.props.formState.phone)
                    }
                },
            }),
            inputList: [
                new InlineInput({
                    name: 'email',
                    type: 'email',
                    title: 'Почта',
                    required: 'required',
                    value: 'pochta@yandex.ru',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.email = ''
                        const regExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/)
                        if (!regExp.test(value)) {
                            this.props.errorState.email = "Неверный формат почты. Только латинские буквы, цифры, символы @ и ."
                        }
                        if (e.target.name === 'email' && Array.isArray(this.children.inputList) && this.children.inputList[0] instanceof Block) {
                            this.children.inputList[0].setProps({
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
                new InlineInput({
                    name: 'login',
                    type: 'text',
                    title: 'Логин',
                    required: 'required',
                    value: 'ivanivanov',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.login = ''
                        const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/)
                        if (!regExp.test(value)) {
                            this.props.errorState.login = "Неверный формат логина. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -"
                        }
                        if (e.target.name === 'login' && Array.isArray(this.children.inputList) && this.children.inputList[1] instanceof Block) {
                            this.children.inputList[1].setProps({
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
                new InlineInput({
                    name: 'first_name',
                    type: 'text',
                    title: 'Имя',
                    required: 'required',
                    value: 'Иван',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.first_name = ''
                        const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                        if (!regExp.test(value)) {
                            this.props.errorState.first_name = "Неверный формат имени. Первая буква - заглавная, без пробелов и цифр"
                        }
                        if (e.target.name === 'first_name' && Array.isArray(this.children.inputList) && this.children.inputList[2] instanceof Block) {
                            this.children.inputList[2].setProps({
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
                new InlineInput({
                    name: 'second_name',
                    type: 'text',
                    title: 'Фамилия',
                    required: 'required',
                        value: 'Иванов',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.second_name = ''
                        const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                        if (!regExp.test(value)) {
                            this.props.errorState.second_name = "Неверный формат фамилии. Первая буква - заглавная, без пробелов и цифр"
                        }
                        if (e.target.name === 'second_name' && Array.isArray(this.children.inputList) && this.children.inputList[3] instanceof Block) {
                            this.children.inputList[3].setProps({
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
                new InlineInput({
                    name: 'display_name',
                    type: 'text',
                    title: 'Имя в чате',
                    required: 'required',
                    value: 'Иван',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.display_name = ''
                        const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u)
                        if (!regExp.test(value)) {
                            this.props.errorState.display_name = "Неверный формат имени в чате. Первая буква - заглавная, без пробелов и цифр"
                        }
                        if (e.target.name === 'display_name' && Array.isArray(this.children.inputList) && this.children.inputList[4] instanceof Block) {
                            this.children.inputList[4].setProps({
                            error: this.props.errorState.display_name,
                            value,
                            hiddenErrorClassName: this.props.errorState.display_name ? '' : 'display_none',
                        });
                        }
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                display_name: value
                            }
                        })
                    },
                }),
                new InlineInput({
                    name: 'phone',
                    type: 'tel',
                    title: 'Телефон',
                    required: 'required',
                    value: '+7 (909) 967 30 30',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.phone = ''
                        const regExp = new RegExp(/^\+?\d{10,15}$/)
                        if (!regExp.test(value)) {
                            this.props.errorState.phone = "Неверный формат номера телефона. От 10 до 15 цифр, может начинаться с +"
                        }
                        if (e.target.name === 'phone' && Array.isArray(this.children.inputList) && this.children.inputList[5] instanceof Block) {
                            this.children.inputList[5].setProps({
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
            ],
        })
    }

    public render():string {
        return rawUpdateProfile
    }
}
