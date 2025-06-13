import Block from '../../core/Block';
import { default as rawChatsNavigate } from './chatsNavigate.hbs?raw';
import {
  Link, Chat, Button, Popup, StackedInput,
} from '../index';
import { ChatIdPage } from '../../pages/index.ts';

import { router } from '../../main';
import { HTTPTransport } from '../../core/HttpTransport';
import renderDOM from '../../core/renderDOM';
import type { ChatProps } from '../chat';

const query = new HTTPTransport('chats');

export default class ChatsNavigate extends Block {
  constructor(props = {}) {
    super('nav', {
      ...props,
      className: 'chats-navigate',
      ProfileLink: new Link({
        classNameLink: 'chat-service__link',
        name: 'Profile',
        size: 'small',
        text: 'Профиль',
        imageClassName: 'chat-service__pointer',
        imageSrc: 'pointer.svg',
        onClick: (e) => {
          e.preventDefault();
          router.go('/settings');
        },
      }),
      AddNewChatButton: new Button({
        text: 'Добавить чат',
        className: 'default',
        onClick: (e) => {
          e.preventDefault();
          this.children.AddNewChatPopup instanceof Popup && this.children.AddNewChatPopup.setProps({
            attributes: {
              open: 'true',
            },
          });
        },
      }),
      AddNewChatPopup: new Popup({
        formState: {
          title: '',
        },
        errorState: {
          title: '',
        },
        popupTitle: 'Добавить чат',
        popupFormButton: {
          text: 'Добавить',
          name: 'submitAddNewChat',
          className: 'default',
          onClick: (e: Event, formState: Record<string, string>) => {
            e.preventDefault();
            query.post('', {
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
              data: JSON.stringify(formState),
            }).then((result) => {
              if (result) {
                this._loadChatsData();
              }
            }).catch((err) => console.log('err', err));
          },
        },
        inputsForm: [new StackedInput({
          name: 'nameOfNewChat',
          type: 'text',
          required: true,
          title: 'Имя чата',
          errorTemplate: 'Неверное имя чата',
          hasValidInput: (validateValue: string): boolean => {
            const regExp = new RegExp(/^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/);
            if (!regExp.test(validateValue)) {
              return false;
            }

            return true;
          },
          onChange: (valueInputState?: string, errorInputState?: string) => {
            if (!valueInputState && !errorInputState) return;
            const AddNewChatPopup = this.children.AddNewChatPopup instanceof Popup ? this.children.AddNewChatPopup : null;
            if (!AddNewChatPopup) return;

            AddNewChatPopup.setProps({
              formState: {
                title: valueInputState,
              },
              errorState: {
                title: errorInputState,
              },
            });
          },
        })],
      }),
    });

    this._loadChatsData();
  }

  private _loadChatsData():void {
    query.get('', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        offset: 0,
        limit: 20,
      },
    }).then((result) => {
      if (typeof result !== 'string') return;
      const itog = JSON.parse(result) as Array<ChatProps>;

      this.setProps({
        chats: itog.map((chatProps) => new Chat({
          ...chatProps,
          onClick: (e) => {
            e.preventDefault();
            renderDOM(new ChatIdPage({
              ...chatProps,
            }));
          },
        })),
      });
    }).catch((err) => console.log('err', err));
  }

  public render(): string {
    return rawChatsNavigate;
  }
}
