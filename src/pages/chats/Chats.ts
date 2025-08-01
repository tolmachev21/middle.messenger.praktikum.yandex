import Block from '../../core/Block';
import { default as rawChats } from './chats.hbs?raw';
import { Text, ChatsNavigate } from '../../components';

export default class Chats extends Block {
  constructor(props = {}) {
    super('div', {
      ...props,
      className: 'chats-layout',
      Text: new Text({
        text: 'Выберите чат чтобы отправить сообщение',
        size: 'small',
        color: 'gray',
      }),
      ChatsNavigate: new ChatsNavigate({}),
    });
  }

  public render(): string {
    return rawChats;
  }
}
