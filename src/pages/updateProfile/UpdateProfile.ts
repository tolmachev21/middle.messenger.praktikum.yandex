import { Button, InlineInput } from '../../components';
import Block from '../../core/Block';
import { default as rawUpdateProfile } from './updateProfile.hbs?raw';

import { HTTPTransport } from '../../core/HttpTransport';
import { router } from '../../main';

export interface IUpdateProfile {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
}

const updateUserProfileQuery = new HTTPTransport('user');

export default class UpdateProfile extends Block {
  constructor(props: IUpdateProfile) {
    super('div', {
      ...props,
      formState: {
        email: props.email ?? '',
        login: props.login ?? '',
        first_name: props.first_name ?? '',
        second_name: props.second_name ?? '',
        display_name: props.display_name ?? '',
        phone: props.phone ?? '',
      },
      errorState: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      Button: new Button({
        text: 'Сохранить',
        className: 'default',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          if (Object.values(this.props.errorState as Record<string, string>).some((value: string) => value !== '')) return;
          updateUserProfileQuery.put('/profile', {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(this.props.formState),
          }).then((result) => {
            if (result) {
              router.go('/settings');
            }
          }).catch((err) => console.log(err));
        },
      }),
      inputList: [
        new InlineInput({
          name: 'email',
          type: 'email',
          title: 'Почта',
          required: true,
          value: props.email,
          errorTemplate: 'Неверный формат почты. Только латинские буквы, цифры, символы @ и .',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/);
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
                email: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                email: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'login',
          type: 'text',
          title: 'Логин',
          required: true,
          value: props.login,
          errorTemplate: 'Неверный формат логина. От 3 до 20 символов, только латинские буквы, цифры, символы _ и -',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/);
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
                login: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                login: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'first_name',
          type: 'text',
          title: 'Имя',
          required: true,
          value: props.first_name,
          errorTemplate: 'Неверный формат имени. Первая буква - заглавная, без пробелов и цифр',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u);
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
                first_name: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                first_name: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'second_name',
          type: 'text',
          title: 'Фамилия',
          required: true,
          value: props.second_name,
          errorTemplate: 'Неверный формат фамилии. Первая буква - заглавная, без пробелов и цифр',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u);
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
                second_name: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                second_name: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'display_name',
          type: 'text',
          title: 'Имя в чате',
          required: true,
          value: props.display_name,
          errorTemplate: 'Неверный формат имени в чате. Первая буква - заглавная, без пробелов и цифр',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё-]*$/u);
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
                display_name: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                display_name: errorInputState,
              },
            });
          },
        }),
        new InlineInput({
          name: 'phone',
          type: 'tel',
          title: 'Телефон',
          required: true,
          value: props.phone,
          errorTemplate: 'Неверный формат номера телефона. От 10 до 15 цифр, может начинаться с +',
          hasValidInput: (validateValue) => {
            const regExp = new RegExp(/^\+?\d{10,15}$/);
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
                phone: valueInputState,
              },
              errorState: {
                ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
                phone: errorInputState,
              },
            });
          },
        }),
      ],
    });
  }

  public render():string {
    return rawUpdateProfile;
  }
}
