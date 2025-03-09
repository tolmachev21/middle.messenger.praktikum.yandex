import Block from '../../core/Block'
import { default as rawInlineInput } from './inlineInput.hbs?raw'

export default class InlineInput extends Block {
    constructor(props: any) {
        super('li', {
            ...props,
            attributes: {
                for: props.name,
            },
            className: 'profile__user-field',
            events: {
                focusout: props.onChange,
            },
        })
    }

    public render():string {
        return rawInlineInput
    }
}
