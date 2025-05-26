import Block from '../../core/Block';
import { default as rawChatFeed } from './chatFeed.hbs?raw';
import {
  Button, Message, MessageInput, Popup, StackedInput,
} from '../../components';
import { HTTPTransport } from '../../core/HttpTransport';

interface IChatFeed {
    id: number,
    header: Record<string, string>,
    messages: Array<any>,
}

const query = new HTTPTransport('chats');
const query2 = new HTTPTransport('user');

export default class ChatFeed extends Block {
  private _socket: WebSocket | null = null;

  constructor(props: IChatFeed) {
    super('div', {
      ...props,
      className: 'chat-feed',
      formState: {
        message: '',
      },
      errorState: {
        message: '',
      },
      avatarSrc: props.header.avatarSrc,
      title: props.header.title,
      AddUserButton: new Button({
        Icon: '<img src="../../../assets/addUserButton.svg" alt="Добавить пользователя в чат">',
        onClick: (e: Event) => {
          e.preventDefault();
          this.children.AddUserPopup instanceof Popup && this.children.AddUserPopup.setProps({
            attributes: {
              open: true,
            },
          });
        },
      }),
      DeleteUserButton: new Button({
        Icon: '<img src="../../../assets/deleteUserButton.svg" alt="Удалить пользователя из чата">',
        onClick: (e: Event) => {
          e.preventDefault();
          this.children.DeleteUserPopup instanceof Popup && this.children.DeleteUserPopup.setProps({
            attributes: {
              open: true,
            },
          });
        },
      }),
      AddUserPopup: new Popup({
        formState: {
          id: '',
        },
        errorState: {
          id: '',
        },
        popupTitle: 'Добавить пользователя в чат',
        popupFormButton: {
          text: 'Добавить',
          name: 'submitAddUserToChat',
          type: 'submit',
          onClick: (e: Event, formState: Record<string, string>) => {
            e.preventDefault();
            const AddUserPopup = this.children.AddUserPopup instanceof Popup ? this.children.AddUserPopup : null;
            if (!AddUserPopup) return;

            query.put('/users', {
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
              data: JSON.stringify({
                users: [
                  formState?.id,
                ],
                chatId: this.props.id,
              }),
            }).then((result) => {
              if (result === 'OK') {
                console.log('Пользователь успешно добавлен');
              }
            }).catch((err) => console.log('err', err));
          },
        },
        inputsForm: [
          new StackedInput({
            name: 'searchUserInput',
            title: 'Логин',
            type: 'text',
            required: true,
            errorTemplate: 'Пользователь не найден',
            hasValidInput: (validateValue) => {
              if (validateValue.length) return true;

              return false;
            },
            onChange: (valueInputState?: string, errorInputState?: string) => {
              if (!valueInputState && !errorInputState) return;
              const AddUserPopup = this.children.AddUserPopup instanceof Popup ? this.children.AddUserPopup : null;
              if (!AddUserPopup) return;

              let errorFromSearchUser = '';
              let userId: number;
              query2.post('/search', {
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ login: valueInputState }),
              }).then((result) => {
                if (typeof result !== 'string') {
                  return;
                }

                const arrayUsers = JSON.parse(result);
                userId = arrayUsers?.[0]?.id;
              }).catch((err) => errorFromSearchUser = err).finally(() => {
                AddUserPopup.setProps({
                  formState: {
                    id: userId || '',
                  },
                  errorState: {
                    id: errorFromSearchUser || errorInputState,
                  },
                });
              });
            },
          }),
        ],
      }),
      DeleteUserPopup: new Popup({
        formState: {
          id: '',
        },
        errorState: {
          id: '',
        },
        popupTitle: 'Удалить пользователя из чата',
        popupFormButton: {
          text: 'Удалить',
          name: 'submitDeleteUserToChat',
          type: 'submit',
          onClick: (e: Event, formState: Record<string, string>) => {
            e.preventDefault();
            query.delete('/users', {
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
              },
              data: JSON.stringify({
                users: [
                  formState?.id,
                ],
                chatId: this.props.id,
              }),
            }).then((result) => {
              if (result === 'OK') {
                console.log('Пользователь успешно удален');
              }
            }).catch((err) => console.log('err', err));
          },
        },
        inputsForm: [
          new StackedInput({
            name: 'searchUserInput',
            title: 'Логин',
            type: 'text',
            required: true,
            errorTemplate: 'Пользователь не найден',
            hasValidInput: (validateValue) => {
              if (validateValue.length) return true;

              return false;
            },
            onChange: (valueInputState?: string, errorInputState?: string) => {
              if (!valueInputState && !errorInputState) return;
              const DeleteUserPopup = this.children.DeleteUserPopup instanceof Popup ? this.children.DeleteUserPopup : null;
              if (!DeleteUserPopup) return;

              let errorFromSearchUser = '';
              let userId: number;
              query2.post('/search', {
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify({ login: valueInputState }),
              }).then((result) => {
                if (typeof result !== 'string') {
                  return;
                }

                const arrayUsers = JSON.parse(result);
                userId = arrayUsers?.[0]?.id;
              }).catch((err) => errorFromSearchUser = err).finally(() => {
                DeleteUserPopup.setProps({
                  formState: {
                    id: userId || '',
                  },
                  errorState: {
                    id: errorFromSearchUser || errorInputState,
                  },
                });
              });
            },
          }),
        ],
      }),
      SendButton: new Button({
        Icon: '<img src="../../../assets/send.svg" alt="Отправить">',
        onClick: (e: Event) => {
          e.preventDefault();
          const state = this.props;
          if (Object.values(state.errorState).some((value) => value !== '')) {
            console.log('Все поля должны быть заполнены и не содержать ошибок');
          } else {
            this._pushMessage(state.formState?.message);
          }
        },
      }),
      MessageInput: new MessageInput({
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;
          let error = '';
          if (value === '') {
            error = 'Value is empty';
          }
          if (this.children.MessageInput instanceof Block) {
            this.children.MessageInput.setProps({
              error,
            });
          }
          this.setProps({
            formState: {
              ...this.props.formState,
              message: value,
            },
          });
        },
      }),
    });

    this._getMessages(props.id);
  }

  private async _getMessages(chatId: number): Promise<void> {
    const token = await this._getTokenForWS(chatId);

    if (!token) return;

    const loggedUser = JSON.parse(localStorage.getItem('user') ?? '');

    if (!loggedUser) {
      return;
    }

    this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${loggedUser.id}/${chatId}/${token}`);

    this._socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this._pullOldMessages();
    });

    this._socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this._socket.addEventListener('message', (event) => {
      const messageResult = event.data && JSON.parse(event.data);

      const loggedUser = JSON.parse(localStorage.getItem('user') ?? '');

      if (!loggedUser) {
        return;
      }

      const oldMessages = Array.isArray(this.children.messages) ? this.children.messages : [];

      if (Array.isArray(messageResult)) {
        this.setProps({
          messages: [
            ...oldMessages,
            ...messageResult.map((message) => new Message({
              content: message.content,
              time: message.time.slice(11, 16),
              status: loggedUser.id === message.user_id,
            })),
          ],
        });
      } else {
        this.setProps({
          messages: [
            ...oldMessages,
            new Message({
              content: messageResult.content,
              time: messageResult.time.slice(11, 16),
              status: loggedUser.id === messageResult.user_id,
            }),
          ],
        });
      }
    });

    this._socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  private async _getTokenForWS(chatId: number) {
    return await query.post(`/token/${chatId}`).then((result) => {
      if (typeof result !== 'string') {
        return;
      }

      const objWithToken = JSON.parse(result);
      return objWithToken?.token;
    }).catch((err) => console.error(err));
  }

  private _pushMessage(text: string) {
    this._socket && this._socket.send(JSON.stringify({
      content: text,
      type: 'message',
    }));
  }

  private _pullOldMessages() {
    this._socket && this._socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  public render(): string {
    return rawChatFeed;
  }
}
