import Block from '../../core/Block';
import { default as rawDefaultInputFile } from './defaultInputFile.hbs?raw';

interface IDefaultInputFile {
    name: string;
    title: string;
    errorTemplate: string;
    hasValidInput: (validateValue: string) => boolean;
    onChange: (valueInputState: File, errorInputState: string) => void;
}

export default class DefaultInputFile extends Block {
  constructor(props: IDefaultInputFile) {
    super('label', {
      ...props,
      attributes: {
        for: props.name,
      },
      className: 'popup-form__label',
      events: {
        change: (e: Event) => {
          const target = e?.target instanceof HTMLInputElement ? e.target : null;
          if (!target || !target.value) return;

          const { value } = target;
          const truncateValue = value.slice(12);

          const hasError = !props.hasValidInput(truncateValue);

          this.setProps({
            error: hasError ? this.props.errorTemplate : '',
            value: truncateValue,
            hiddenErrorClassName: hasError ? '' : 'display_none',
          });


          const inputFiles = target.files;

          if (!inputFiles || inputFiles.length === 0) return;

          props.onChange(inputFiles[0], this.props.error);
        },
        cancel: (e: Event) => {
          const target = e?.target instanceof HTMLInputElement ? e.target : null;
          if (!target || target.value !== '') return;

          const { value } = target;
          const hasError = !props.hasValidInput(value);

          this.setProps({
            error: hasError ? this.props.errorTemplate : '',
            value,
            hiddenErrorClassName: hasError ? '' : 'display_none',
          });


          const inputFiles = target.files;

          if (!inputFiles || inputFiles.length === 0) return;

          props.onChange(inputFiles[0], this.props.error);
        },
      },
    });
  }

  public render():string {
    return rawDefaultInputFile;
  }
}
