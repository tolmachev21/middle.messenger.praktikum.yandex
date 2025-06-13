import Block from '../../core/Block';

interface MessageInputProps {
    value?: string;
    error?: string;
    onChange: (e: Event) => void;
    className?: string;
    attributes?: Record<string, string>;
    events?: Record<string, (e: Event) => void>;
    [key: string]: unknown;
}

export default class MessageInput extends Block<MessageInputProps> {
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
        input: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.setProps({ value: target.value });
          props.onChange(e);
        },
      },
    });
  }

  public clearValue(): void {
    this.setProps({ value: '' });
    const element = this.element as HTMLInputElement;
    if (element) {
      element.value = '';
    }
  }

  public render():string {
    return '';
  }
}
