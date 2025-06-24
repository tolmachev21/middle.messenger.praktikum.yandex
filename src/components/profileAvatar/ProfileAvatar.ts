import Block from '../../core/Block';
import { default as rawProfileAvatar } from './profileAvatar.hbs?raw';

interface ProfileAvatarProps {
	imgSrc: string;
	onClick: (e: Event) => void;
}

export default class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {
    super('button', {
      ...props,
      className: 'profile-avatar profile__avatar_state_hover',
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return rawProfileAvatar;
  }
}
