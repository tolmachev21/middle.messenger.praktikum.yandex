import Block from '../../core/Block';
import { default as rawSignIn } from './signIn.hbs?raw';
import {
  Button, Link, StackedInput, Title,
} from '../../components';

import { HTTPTransport } from '../../core/HttpTransport';

import { router } from '../../main';

const query = new HTTPTransport('auth');

export default class SignIn extends Block {
  constructor(props = {}) {
    super('main', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      errorState: {
        login: '',
        password: '',
      },
      className: 'page',
      Title: new Title({
        text: 'Вход',
        size: 'default',
      }),
      Button: new Button({
        text: 'Авторизоваться',
        className: 'default',
        name: 'Sign in',
        type: 'submit',
        onClick: (e: Event) => {
          e.preventDefault();
          if (Object.values(this.props.errorState as Record<string, string>).some((value: string) => value !== '')) {
            console.log('Все поля должны быть заполнены и не содержать ошибок');
          } else {
            const result = query.post('/signin', {
              data: JSON.stringify(this.props.formState),
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            result.then((answer: unknown) => {
              if (answer === 'OK') router.go('/messenger');
            }).catch((err) => console.log('err', err));
          }
        },
      }),
      Link: new Link({
        text: 'Нет аккаунта?',
        type: 'default',
        size: 'small',
        name: 'Registration',
        onClick: () => router.go('/sign-up'),
      }),
      InputLogin: new StackedInput({
        name: 'login',
        type: 'text',
        required: true,
        title: 'Логин',
        errorTemplate: 'Неверный логин',
        hasValidInput: (validateValue: string): boolean => {
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
      InputPassword: new StackedInput({
        name: 'password',
        type: 'password',
        required: true,
        title: 'Пароль',
        errorTemplate: 'Неверный пароль',
        hasValidInput: (validateValue: string): boolean => {
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
              password: valueInputState,
            },
            errorState: {
              ...(typeof this.props.errorState === 'object' ? this.props.errorState : {}),
              password: errorInputState,
            },
          });
        },
      }),
    });
  }

  public render(): string {
    return rawSignIn;
  }
}
