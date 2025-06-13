import Block from '../../core/Block';
import { default as rawInlineInput } from './inlineInput.hbs?raw';

interface InlineInputProps {
    name: string;
    type: string;
    value: string;
    title: string;
    errorTemplate: string;
    required: boolean;
    hasValidInput: (validateValue: string) => boolean;
    onChange: (valueInputState: string, errorInputState: string) => void;
}

export default class InlineInput extends Block {
  constructor(props: InlineInputProps) {
    super('li', {
      ...props,
      attributes: {
        for: props.name,
        required: props.required,
      },
      className: 'profile__user-field',
      events: {
        focusout: (e: Event) => {
          const target = e?.target instanceof HTMLInputElement ? e.target : null;
          if (!target || !target.value) return;

          const { value } = target;
          const hasError = !props.hasValidInput(value);

          this.setProps({
            error: hasError ? this.props.errorTemplate : '',
            value,
            hiddenErrorClassName: hasError ? '' : 'display_none',
          });

          props.onChange(value, this.props.error as string);
        },
      },
    });
  }

  public render():string {
    return rawInlineInput;
  }
}
