import Block from '../../core/Block'

export default class MessageInput extends Block {
    constructor(props: any) {
        super('input', {
            ...props,
            className: 'chat-feed__form-input',
            attributes: {
                name: 'message',
                type: 'text',
                placeholder: 'Сообщение',
            },
            events: {
                blur: props.onChange,
            },
        })
    }
}
