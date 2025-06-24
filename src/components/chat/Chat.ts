import Block from '../../core/Block';
import { default as rawChat } from './chat.hbs?raw';
import { Text } from '..';

export interface ChatProps {
    id: number;
    avatar: string;
    title: string;
    last_message: Record<string, string>;
    time: string;
    onClick: (e: Event) => void;
}

export default class Chat extends Block {
  constructor(props: ChatProps) {
    super('li', {
      ...props,
      className: 'chat-list__item',
      Name: new Text({
        text: props?.title,
        size: 'name',
      }),
      Message: new Text({
        text: props?.last_message?.content,
        size: 'message',
        color: 'gray',
      }),
      Avatar: props?.avatar,
      Time: new Text({
        text: props?.last_message?.time.slice(11, 16),
        size: 'time',
        color: 'gray',
      }),
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return rawChat;
  }
}
