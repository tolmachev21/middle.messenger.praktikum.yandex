import Block from '../../core/Block'
import { default as rawInlineText } from './inlineText.hbs?raw'
import { Text } from '../text'

export default class InlineText extends Block {
    constructor(props: any) {
        super('li', {
            ...props,
            className: 'profile__user-field',
            Label: new Text({
                text: props.label,
                size: 'small',
            }),
            Value: new Text({
                text: props.value,
                size: 'small',
                color: 'gray',
            })
        })
    }

    public render(): string {
        return rawInlineText
    }
}
