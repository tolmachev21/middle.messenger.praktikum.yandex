import Block from '../../core/Block';

interface MessageInputProps {
    value?: string;
    error?: string;
    onChange?: (e: Event) => void;
}

export default class MessageInput extends Block {
  constructor(props: MessageInputProps) {
    super('input', {
      ...props,
      className: 'chat-feed__form-input',
      attributes: {
        name: 'message',
        type: 'text',
        placeholder: 'Сообщение',
        value: props.value || '',
      },
      events: {
        blur: props.onChange,
      },
    });
  }

  public render():string {
    return '';
  }
}
