import Block from '../../core/Block';
import { default as rawStackedInput } from './stackedInput.hbs?raw';

interface StackedInputProps {
    name: string;
    type: string;
    required: boolean;
    title: string;
    value?: string;
    error?: string;
    errorTemplate: string;
    placeholder?: string;
    hasValidInput: (validateValue: string) => boolean;
    onChange: (valueInputState: string, errorInputState: string) => void;
}

export default class StackedInput extends Block {
  constructor(props: StackedInputProps) {
    super('label', {
      ...props,
      attributes: {
        for: props.name,
        required: props.required,
      },
      value: '',
      error: '',
      className: 'form-input__label',
      events: {
        focusout: (e: Event) => {
          const target = e?.target instanceof HTMLInputElement ? e.target : null;
          if (!target || !target.value) return;

          const { value } = target;
          let error = '';

          if (props.hasValidInput && !props.hasValidInput(value)) {
            error = props.errorTemplate || 'Неверный формат имени чата. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -';
          }

          this.setProps({
            error,
            value,
            hiddenErrorClassName: error ? '' : 'display_none',
          });

          props.onChange(value, error);
        },
      },
    });
  }

  public render(): string {
    return rawStackedInput;
  }
}
