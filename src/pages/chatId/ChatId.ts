import Block from '../../core/Block';
import { default as rawChatId } from './chatId.hbs?raw';
import { ChatsNavigate, ChatFeed } from '../../components';

interface IChatId {
    id: number,
    avatar: string,
    title: string,
}

export default class ChatId extends Block {
  constructor(props: IChatId) {
    super('div', {
      ...props,
      className: 'chats-layout',
      ChatFeed: new ChatFeed({
        id: props.id,
        header: {
          avatarSrc: props.avatar,
          title: props.title,
        },
        messages: [],
      }),
      ChatsNavigate: new ChatsNavigate({}),
    });
  }

  public render(): string {
    return rawChatId;
  }
}
