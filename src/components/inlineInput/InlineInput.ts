import Block from '../../core/Block'
import { default as rawInlineInput } from './inlineInput.hbs?raw'

interface InlineInputProps {
    name: string;
    type: string;
    value: string;
    title?: string;
    error?: string;
    hiddenErrorClassName?: string;
    required?: boolean;
    onChange?: (e: Event) => void;
}

export default class InlineInput extends Block {
    constructor(props: InlineInputProps) {
        super('li', {
            ...props,
            attributes: {
                for: props.name,
                required: props.required,
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
