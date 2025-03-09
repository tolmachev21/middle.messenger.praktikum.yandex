import Block from '../../core/Block.ts'
import { default as textRaw } from './text.hbs?raw'

export default class Text extends Block {
    constructor (props: any) {
        super ('p', {
          ...props,
          className: `text text__${ props.size } ${props.color ? 'text_color_' + props.color : 'text_color_default'}`,
        })
    }

    public render () {
        return textRaw
    }
}
