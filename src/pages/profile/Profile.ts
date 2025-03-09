import Block from '../../core/Block.ts'
import { Title, Text, Button, InlineText, Link, Popup } from '../../components'
import { default as rawProfile } from './profile.hbs?raw'


export default class Profile extends Block {
    constructor (props: any) {
        super('div', {
            ...props,
            Title: new Title({
                text: 'Иван',
                size: 'small',
            }),
            Text: new Text({
                text: 'Почта',
                size: 'small',
            }),
            Button: new Button({
                text: 'Поменять',
                type: 'submit',
                page: 'profile',
                className: 'default',
            }),
            profileFilds: [
                new InlineText({
                    label: 'Почта',
                    value: 'ivanivanov@yandex.ru',
                }),
                new InlineText({
                    label: 'Логин',
                    value: 'ivanivanov',
                }),
                new InlineText({
                    label: 'Имя',
                    value: 'Иван',
                }),
                new InlineText({
                    label: 'Фамилия',
                    value: 'Иванов',
                }),
                new InlineText({
                    label: 'Имя в чате',
                    value: 'Иван',
                }),
                new InlineText({
                    label: 'Телефон',
                    value: '+7 (909) 967 30 30',
                }),
            ],
            linkList: [
                new Link({
                    text: 'Изменить данные',
                    name: 'updateProfile',
                    page: 'updateProfile',
                    size: 'big',
                    type: 'default',
                }),
                new Link({
                    text: 'Изменить пароль',
                    name: 'updatePassword',
                    page: 'updatePassword',
                    size: 'big',
                    type: 'default',
                }),
                new Link({
                    text: 'Выйти',
                    name: 'signOut',
                    page: 'signIn',
                    size: 'big',
                    type: 'danger',
                }),
            ],
            Popup: new Popup({
                title: 'Загрузите файл',
                text: 'Выбрать файл на компьютере',
                button: {
                    text: 'Поменять',
                    name: 'changeAvatar',
                    type: 'submit',
                    page: 'profile',
                },
                page: 'profile',
                attributes: {
                    open: ''
                },
            }),
        })
    }

    public render (): string {
        return rawProfile
    }
}
