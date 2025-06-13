import Block from '../../core/Block';
import { default as rawMessage } from './message.hbs?raw';

export interface MessageProps {
    status: boolean;
    content: string;
    time: string;
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super('div', {
      ...props,
      className: `message ${props.status ? 'message-self' : 'message-friend'}`,
    });
  }

  public render(): string {
    return rawMessage;
  }
}
