import Block from '../../core/Block'
import { default as rawChatId } from './chatId.hbs?raw'
import { ChatsNavigate, Chat, ChatFeed } from '../../components'
import { mockData, mockDataMessages } from './mockData';

export default class ChatId extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chats-layout',
            ChatFeed: new ChatFeed({
                header: {
                    avatarSrc: 'https://via.placeholder.com/150',
                    title: 'Вадим',
                },
                messages: mockDataMessages,
            }),
            ChatsNavigate: new ChatsNavigate({
                // Еще не известен формат входных данных
                chats: mockData.map((props: any) => new Chat({ ...props })),
            }),
        })
    }

    public render(): string {
        return rawChatId
    }
}
