import Block from '../../core/Block';
import { default as rawPopup } from './popup.hbs?raw';
import { Button, Text } from '..';
import type { ButtonProps } from '..';

interface PopupProps {
    formState: Record<string, string | File>
    errorState: Record<string, string>
    popupTitle: string
    popupFormButton: ButtonProps
    inputsForm: Block[]
    attributes?: {
        open: string
    }
}

export default class Popup extends Block {
  constructor(props: PopupProps) {
    super('dialog', {
      ...props,
      attributes: {
        [props?.attributes?.open ? 'open' : 'close']: '',
      },
      className: 'popup',
      PopupTitle: new Text({
        text: props.popupTitle,
      }),
      SubmitButton: new Button({
        text: props.popupFormButton.text,
        type: props.popupFormButton.type,
        name: props.popupFormButton.name,
        className: 'default',
        onClick: (e: Event) => {
          if (Object.values(this.props.errorState as Record<string, string>).some((fieldErorrState: string) => fieldErorrState !== '')) return;
          props.popupFormButton.onClick(e, this.props.formState as Record<string, string>);
          this.setProps({
            attributes: {
              close: true,
            },
          });
        },
      }),
      events: {
        click: (e: Event) => {
          if (e?.target instanceof HTMLElement && e?.target?.nodeName === 'DIALOG') {
            this.setProps({
              attributes: {
                close: true,
              },
            });
          }
        },
      },
    });
  }

  public render(): string {
    return rawPopup;
  }
}
