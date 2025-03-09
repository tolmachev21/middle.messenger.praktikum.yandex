import Block from '../../core/Block'
import { default as linkRaw} from './link.hbs?raw'

export default class Link extends Block {
    constructor (props: any) {
        super('p', {
            ...props,
            className: `link link__${ props.size }`,
        })
    }

    public render (): string {
        return linkRaw
    }
}