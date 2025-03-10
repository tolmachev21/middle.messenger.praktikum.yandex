import Block from '../../core/Block'
import { default as linkRaw} from './link.hbs?raw'

interface LinkProps {
    size: string;
    text: string;
    href?: string;
    className?: string;
    name?: string;
    page?: string;
    type?: string;
    onClick?: (e: Event) => void;
}

export default class Link extends Block {
    constructor (props: LinkProps) {
        super('p', {
            ...props,
            className: `link ${props.size ? `link__${props.size}` : ''}`,
        })
    }

    public render (): string {
        return linkRaw
    }
}
