import Block from '../../core/Block'
import { default as rawStackedInput } from './stackedInput.hbs?raw'

export default class StackedInput extends Block {
    constructor (props: any) {
        super ('label', {
            ...props,
            attributes: {
                for: props.name,
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
