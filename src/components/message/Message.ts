import Block from '../../core/Block'
import { default as rawMessage } from './message.hbs?raw'

export default class Message extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: `message ${ props.status ? 'message-self' : 'message-friend' }`,
        })
    }
    
    public render(): string {
        return rawMessage
    }
}
