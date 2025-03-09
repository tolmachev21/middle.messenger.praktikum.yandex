import { Button, InlineInput } from '../../components'
import Block from '../../core/Block'
import { default as rawUpdatePassword } from './updatePassword.hbs?raw'

export default class UpdatePassword extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            formState: {
                oldPassword: '',
                newPassword: '',
                newPasswordAgain: '',
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
                page: 'profile',
                onClick: (e: any) => {
                    e.preventDefault();
                    if (Object.values(this.props.errorState).some((value: unknown) => value !== '')) {
                        console.log('Все поля должны быть заполнены и не содержать ошибок')
                    } else {
                        console.log('oldPassword', this.props.formState.oldPassword)
                        console.log('newPassword', this.props.formState.newPassword)
                        console.log('newPasswordAgain', this.props.formState.newPasswordAgain)
                    }
                },
            }),
            inputList: [
                new InlineInput({
                    name: 'oldPassword',
                    type: 'password',
                    title: 'Старый пароль',
                    required: 'required',
                    value: '',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.oldPassword = '';
                        const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                        if (!regExp.test(value)) {
                            this.props.errorState.oldPassword = "Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
                        }
                        if (e.target.name === 'oldPassword' && Array.isArray(this.children.inputList) && this.children.inputList[0] instanceof Block) {
                            this.children.inputList[0].setProps({
                                error: this.props.errorState.oldPassword,
                                value,
                                hiddenErrorClassName: this.props.errorState.oldPassword ? '' : 'display_none',
                            });
                        }
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                oldPassword: value
                            }
                        })
                    },
                }),
                new InlineInput({
                    name: 'newPassword',
                    type: 'password',
                    title: 'Новый пароль',
                    required: 'required',
                    value: '',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.newPassword = '';
                        const regExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/)
                        if (!regExp.test(value)) {
                            this.props.errorState.newPassword = "Неверный формат пароля. От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
                        }
                        if (e.target.name === 'newPassword' && Array.isArray(this.children.inputList) && this.children.inputList[1] instanceof Block) {
                            this.children.inputList[1].setProps({
                                error: this.props.errorState.newPassword,
                                value,
                                hiddenErrorClassName: this.props.errorState.newPassword ? '' : 'display_none',
                            });
                        }
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                newPassword: value
                            }
                        })
                    },
                }),
                new InlineInput({
                    name: 'newPasswordAgain',
                    type: 'password',
                    title: 'Повторите новый пароль',
                    required: 'required',
                    value: '',
                    onChange: (e: any) => {
                        const value = e.target.value;
                        this.props.errorState.newPasswordAgain = '';
                        if (value !== this.props.formState.newPassword) {
                            this.props.errorState.newPasswordAgain = "Пароли не совпадают"
                        }
                        if (e.target.name === 'newPasswordAgain' && Array.isArray(this.children.inputList) && this.children.inputList[2] instanceof Block) {
                            this.children.inputList[2].setProps({
                                error: this.props.errorState.newPasswordAgain,
                                value,
                                hiddenErrorClassName: this.props.errorState.newPasswordAgain ? '' : 'display_none',
                            });
                        }
                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                newPasswordAgain: value
                            }
                        })
                    },
                }),
            ],
        })
    }

    public render():string {
        return rawUpdatePassword
    }
}
