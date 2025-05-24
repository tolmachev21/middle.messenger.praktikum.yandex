import Block from "../../core/Block.ts";
import { default as rawButton } from './button.hbs?raw' 

export interface ButtonProps {
    disabled?: boolean;
    type?: string;
    name?: string;
    className?: string;
    text?: string;
    onClick: (e: Event, valueState: Record<string, string>) => void;
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
