import { Button, InlineInput } from '../../components';
import Block from '../../core/Block';
import { default as rawUpdatePassword } from './updatePassword.hbs?raw';

import { HTTPTransport } from '../../core/HttpTransport';
import { router } from '../../main';

const updateUserPasswordQuery = new HTTPTransport('user');

export default class UpdatePassword extends Block {
  constructor(props = {}) {
    super('div', {
      ...props,
      formState: {
        oldPassword: '',
        newPassword: '',
      },
      errorState: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: '',
      },
      Button: new Button({
        text: 'Сохранить',
        className: 'default',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          if (Object.values(this.props.errorState as Record<string, string>).some((value: unknown) => value !== '')) return;
          updateUserPasswordQuery.put('/password', {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(this.props.formState),
          }).then((result) => {
            if (result === 'OK') {
              router.go('/settings');
            }
          }).catch((err) => console.log(err));
        },
      }),
      inputList: [
        new InlineInput({
          name: 'oldPassword',
          type: 'password',
          title: 'Старый пароль',
          required: true,
          value: '',
          errorTemplate: 'Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/);
            if (!regExp.test(validateValue)) {
              return false;
            }

            return true;
          },
          onChange: (valueInputState: string, errorInputState: string) => {
            if (!valueInputState && !errorInputState) return;

            this.setProps({
              formState: {
                ...(typeof this.props.formState === 'object' ? this.props.formState : {}),
                oldPassword: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                oldPassword: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'newPassword',
          type: 'password',
          title: 'Новый пароль',
          required: true,
          value: '',
          errorTemplate: 'Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/);
            if (!regExp.test(validateValue)) {
              return false;
            }

            return true;
          },
          onChange: (valueInputState: string, errorInputState: string) => {
            if (!valueInputState && !errorInputState) return;

            this.setProps({
              formState: {
                ...(typeof this.props.formState === 'object' ? this.props.formState : {}),
                newPassword: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                newPassword: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'newPasswordAgain',
          type: 'password',
          title: 'Повторите новый пароль',
          required: true,
          value: '',
          errorTemplate: 'Пароли не совпадают',
          hasValidInput: (validateValue) => {
            if (validateValue !== (this.props.formState as Record<string, string>).newPassword) {
              return false;
            }

            return true;
          },
          onChange: (valueInputState: string, errorInputState: string) => {
            if (!valueInputState && !errorInputState) return;

            this.setProps({
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                newPasswordAgain: errorInputState,
              },
            });
          },
        }),
      ],
    });
  }

  public render():string {
    return rawUpdatePassword;
  }
}
