import Block from '../../core/Block'
import { default as rawChat } from './chat.hbs?raw'
import { Text } from '../../components'

interface ChatProps {
    name: string;
    message: string;
    time: string;
    onClick?: (e: Event) => void;
}

export default class Chat extends Block {
    constructor(props: ChatProps) {
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
