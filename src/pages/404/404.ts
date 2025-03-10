import { Title, Text, Link } from '../../components'
import Block from "../../core/Block.ts";
import { default as Raw404 } from './404.hbs?raw'


export default class Error404 extends Block {
    constructor (props: any) {
        super ('main', {
            ...props,
            className: 'page page__error',
            Title: new Title({
                text: '404',
                size: 'big',
            }),
            Text: new Text({
                text: 'Не туда попали',
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
        return Raw404
    }
}
