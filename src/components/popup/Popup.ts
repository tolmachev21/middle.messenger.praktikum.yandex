import Block from '../../core/Block'
import { default as rawPopup } from './popup.hbs?raw'
import { Text } from '../text'
import { Button } from '../button'

export default class Popup extends Block {
    constructor(props: any) {
        super('dialog', {
            ...props,
            attributes: {
                [props.attributes.open ? 'open' : 'close']: props.attributes.open,
            },
            className: 'popup',
            TextLoadFile: new Text({
                text: props.title,
            }),
            text: props.text,
            Button: new Button({
                text: props.button.text,
                type: props.button.type,
                name: props.button.name,
                page: props.button.page,
                className: 'default',
            }),
        })
    }

    public render(): string {
        return rawPopup
    }
}
