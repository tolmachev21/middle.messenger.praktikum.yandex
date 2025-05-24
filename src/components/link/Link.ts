import Block from '../../core/Block'
import { default as linkRaw} from './link.hbs?raw'

interface LinkProps {
    size: string;
    text: string;
    classNameLink?: string;
    name?: string;
    type?: string;
    imageClassName?: string;
    imageSrc?: string;
    onClick: (e: Event) => void;
}

export default class Link extends Block {
    constructor (props: LinkProps) {
        super('p', {
            ...props,
            className: `link ${props.size ? `link__${props.size}` : ''}`,
            events: {
                click: props.onClick
            } 
        })
    }

    public render (): string {
        return linkRaw
    }
}
