import Block from '../../core/Block'
import { default as rawChatFeed } from './chatFeed.hbs?raw'
import { Button, Message, MessageInput } from '../../components'

export default class ChatFeed extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chat-feed',
            formState: {
                message: '',
            },
            avatarSrc: props.header.avatarSrc,
            title: props.header.title,
            SendButton: new Button({
                type: 'submit',
                Icon: '<img src="../../../assets/send.svg" alt="Отправить">',
                onClick: (e: any) => {
                    e.preventDefault();
                    console.log('submitData', this.props.formState.message)
                },
            }),
            MessageInput: new MessageInput({
                onChange: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target.value;
                    let error = '';
                    if (value === '') {
                        error = "Value is empty"
                    }
                    if (this.children.MessageInput instanceof Block) {
                        this.children.MessageInput.setProps({
                            error,
                        });
                    }
                    this.setProps({
                        formState: {
                            ...this.props.formState,
                            message: value
                        }
                    })
                },
            }),
            // Еще не известен формат входных данных
            messages: props.messages.map((message: any) => new Message({
                text: message.content,
                time: message.time,
                status: message.status,
            }))
        })
    }

    public render(): string {
        return rawChatFeed
    }
}
