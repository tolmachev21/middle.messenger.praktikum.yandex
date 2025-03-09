import Block from '../../core/Block.ts'
import { default as titleRaw } from './title.hbs?raw'

interface TitleProps {
    size: string;
    text: string;
}

export default class Title extends Block {
    constructor (props: TitleProps) {
        super ('h1', {
            ...props,
            className: `title title__${ props.size }`,
        })
    }

    public render (): string {
        return titleRaw
    }
}
