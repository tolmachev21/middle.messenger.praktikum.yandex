import Block from '../../core/Block'
import { default as rawStackedInput } from './stackedInput.hbs?raw'

interface StackedInputProps {
    name: string;
    type: string;
    value?: string;
    title?: string;
    error?: string;
    hiddenTitleClassName?: string;
    hiddenErrorClassName?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: Event) => void;
}

export default class StackedInput extends Block {
    constructor (props: StackedInputProps) {
        super ('label', {
            ...props,
            attributes: {
                for: props.name,
                required: props.required,
            },
            className: 'form-input__label',
            events: {
                focusout: props.onChange,
            },
        })
    }

    public render (): string {
        return rawStackedInput
    }
}
