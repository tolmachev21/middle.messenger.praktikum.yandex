import { Title, Text, Link } from '../../components'
import Block from "../../core/Block.ts";
import { default as Raw500 } from './500.hbs?raw'


export default class Error500 extends Block {
    constructor (props: any) {
        super ('main', {
            ...props,
            className: 'page page__error',
            Title: new Title({
                text: '500',
                size: 'big',
            }),
            Text: new Text({
                text: 'Мы уже фиксим',
                size: 'very-big',
            }),
            Link: new Link({
                text: 'Назад к чатам',
                size: 'small',
                type: 'default',
                page: 'chats',
            }),
        })
    }

    public render (): string {
        return Raw500
    }
}