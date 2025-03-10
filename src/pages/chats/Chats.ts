import Block from '../../core/Block'
import { default as rawChats } from './chats.hbs?raw'
import { Text, Chat, ChatsNavigate } from '../../components'
import mockData from './mockData';

export default class Chats extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chats-layout',
            Text: new Text({
                text: 'Выберите чат чтобы отправить сообщение',
                size: 'small',
                color: 'gray',
            }),
            ChatsNavigate: new ChatsNavigate({
                chats: mockData.map((props) => new Chat({ ...props })),
            }),
        })  
    }

    public render(): string {
        return rawChats
    }
}
