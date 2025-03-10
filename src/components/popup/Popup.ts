import Block from '../../core/Block'
import { default as rawPopup } from './popup.hbs?raw'
import { Button, Text } from '../../components'

interface PopupProps {
    title: string;
    text: string;
    button: {
        name: string;
        page: string;
        type: string;
        text: string;
        onClick?: (e: Event) => void;
    };
    page: string;
    attributes: {
        open: string;
    };
}

export default class Popup extends Block {
    constructor(props: PopupProps) {
        super('dialog', {
            ...props,
            attributes: {
                [props.attributes.open ? 'open' : 'close']: props.attributes.open,
            },
            className: 'popup',
            TextLoadFile: new Text({
                text: props.title,
            }),
            Button: new Button({
                text: props.button.text,
                type: props.button.type,
                name: props.button.name,
                page: props.button.page,
                className: 'default',
                onClick: (e: Event) => {
                    console.log(e, 'Поменять аватар')
                }
            }),
        })
    }

    public render(): string {
        return rawPopup
    }
}
