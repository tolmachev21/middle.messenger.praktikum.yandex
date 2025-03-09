import Block from '../../core/Block.ts'
import { default as titleRaw } from './title.hbs?raw'

export default class Title extends Block {
    constructor (props: any) {
        super ('h1', {
            ...props,
            className: `title title__${ props.size }`,
        })
    }

    public render (): string {
        return titleRaw
    }
}