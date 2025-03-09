import Block from "../../core/Block.ts";
import { default as rawButton } from './button.hbs?raw' 

export default class Button extends Block {
    constructor (props: any) {
        super('button', {
            ...props,
            attributes: {
                [props.disabled ? 'disabled' : 'avaible']: '',
                type: props.type,
                name: props.name,
                page: props.page,
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
