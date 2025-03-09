import Block from '../../core/Block'
import { default as rawChat } from './chat.hbs?raw'
import { Text } from '../../components'
export default class Chat extends Block {
    constructor(props: any) {
        super('li', {
            ...props,
            className: 'chat-list__item',
            Name: new Text({
                text: props.name,
                size: 'name',
            }),
            Message: new Text({
                text: props.message,
                size: 'message',
                color: 'gray',
            }),
            Time: new Text({
                text: props.time,
                size: 'time',
                color: 'gray',
            }),
        })
    }

    public render(): string {
        return rawChat
    }
}
