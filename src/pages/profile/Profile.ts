import Block from '../../core/Block.ts';
import {
  Title, InlineText, Link, Popup, DefaultInputFile, ProfileAvatar,
} from '../../components';
import { default as rawProfile } from './profile.hbs?raw';
import { UpdateProfilePage, UpdatePasswordPage } from '../index.ts';
import { IUpdateProfile } from '../updateProfile/UpdateProfile.ts';

import renderDOM from '../../core/renderDOM';
import { router } from '../../main';
import { HTTPTransport } from '../../core/HttpTransport';

const query = new HTTPTransport('auth');
const changeUserAvatarQuery = new HTTPTransport('user');

const listProfileData = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон',
};

export default class Profile extends Block {
  constructor(props = {}) {
    super('div', {
      ...props,
      linkList: [
        new Link({
          text: 'Изменить данные',
          name: 'updateProfile',
          size: 'big',
          type: 'default',
          onClick: () => {
            if (this.props.userProfileState) {
              renderDOM(new UpdateProfilePage(this.props.userProfileState as IUpdateProfile));
            }
          },
        }),
        new Link({
          text: 'Изменить пароль',
          name: 'updatePassword',
          size: 'big',
          type: 'default',
          onClick: () => renderDOM(new UpdatePasswordPage({})),
        }),
        new Link({
          text: 'Выйти',
          name: 'signOut',
          size: 'big',
          type: 'danger',
          onClick: () => {
            const result = query.post('/logout', {
              headers: {
                accept: 'application/json',
              },
            });
            result.then((itog) => {
              if (itog === 'OK') {
                router.go('/');
              }
            }).catch((err) => console.log('err', err));
          },
        }),
      ],
      ChangeAvaterPopup: new Popup({
        formState: {
          avatar: '',
        },
        errorState: {
          avatar: '',
        },
        popupTitle: 'Загрузите файл',
        popupFormButton: {
          text: 'Поменять',
          name: 'submitchangeAvatar',
          type: 'submit',
          onClick: (e: Event, formState: Record<string, string>) => {
            e.preventDefault();

            const data = new FormData();
            data.append('avatar', formState.avatar);

            changeUserAvatarQuery.put('/profile/avatar', { data }).then(() => {
              this._loadUserData();
            }).catch((err) => console.log('err', err));
          },
        },
        inputsForm: [
          new DefaultInputFile({
            name: 'changeAvatarInput',
            title: 'Выбрать файл на компьютере',
            errorTemplate: 'Необходимо выбрать файл',
            hasValidInput: (validateValue) => {
              if (validateValue.length) {
                return true;
              }

              return false;
            },
            onChange: (valueInputState, errorInputState) => {
              if (!valueInputState && !errorInputState) return;
              const ChangeAvaterPopup = this.children.ChangeAvaterPopup instanceof Popup ? this.children.ChangeAvaterPopup : null;
              if (!ChangeAvaterPopup) return;

              ChangeAvaterPopup.setProps({
                formState: {
                  avatar: valueInputState,
                },
                errorState: {
                  avatar: errorInputState,
                },
              });
            },
          }),
        ],
      }),
    });

    this._loadUserData();
  }

  private async _loadUserData(): Promise<void> {
    const result = await query.get('/user', {
      headers: { accept: 'application/json' },
    });

    if (typeof result !== 'string') return;
    const itog = JSON.parse(result);
    if (itog?.reason === 'Cookie is not valid') {
      router.go('/');
      return;
    }

    const arrayOfKeys = Object.keys(listProfileData) as Array<keyof typeof listProfileData>;

    const preparedData = arrayOfKeys.map((key) => new InlineText({
      label: listProfileData[key],
      value: itog[key],
    }));

    this.setProps({
      userProfileState: itog,
      profileFilds: preparedData,
      UserNameTitle: new Title({
        text: itog.first_name,
        size: 'small',
      }),
      ProfileAvatar: new ProfileAvatar({
        imgSrc: itog.avatar ? `https://ya-praktikum.tech/api/v2/resources${itog.avatar}` : '',
        onClick: (e: Event) => {
          e.preventDefault();
          if (Array.isArray(this.children.ChangeAvaterPopup)) return;
          this.children.ChangeAvaterPopup.setProps({
            attributes: {
              open: 'true',
            },
          });
        },
      }),
    });
  }

  public render(): string {
    return rawProfile;
  }
}
