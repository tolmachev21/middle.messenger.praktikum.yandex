import Block from "../../core/Block.ts";
import { default as rawButton } from './button.hbs?raw' 

interface ButtonProps {
    disabled?: boolean;
    type?: string;
    name?: string;
    page?: string;
    className?: string;
    text?: string;
    onClick: (e: Event) => void;
    Icon?: string;
}

export default class Button extends Block {
    constructor (props: ButtonProps) {
        super('button', {
            ...props,
            attributes: {
                [props?.disabled ? 'disabled' : 'avaible']: '',
                type: props?.type || 'submit',
                name: props?.name,
                page: props?.page,
            },
            className: `button button__${ props.className }`,
            events: {
                click: props.onClick,
            },
        })
    }

    public render ():string {
        return rawButton
    }
}
