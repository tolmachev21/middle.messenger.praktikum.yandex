import Block from '../../core/Block'
import { default as rawChatsNavigate } from './chatsNavigate.hbs?raw'

export default class ChatsNavigate extends Block {
    constructor(props: any) {
        super('nav', {
            ...props,
            className: 'chats-navigate',
            chats: props.chats,
        })
    }

    public render(): string {
        return rawChatsNavigate
    }
}   
