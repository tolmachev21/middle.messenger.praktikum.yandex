// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import Router from './Router.ts';
import Block from './Block.ts';

describe('Router', () => {
  const firstScreenBlockId = 'firstScreen';
  const secondScreenBlockId = 'secondScreen';

class firstScreen extends Block {
  constructor(props = {}) {
    super('div', {
      ...props,
      });
    }

    public render(): string {
      return `<div id="${firstScreenBlockId}"><div>`;
    }
  }

  class secondScreen extends Block {
    constructor(props = {}) {
      super('div', {
        ...props,
      });
    }

    public render(): string {
      return `<div id="${secondScreenBlockId}"><div>`;
    }
  }

  const router = new Router('body');

  it('Router is Singleton', () => {
    const newRouter = new Router('#newApp');

    expect(router).to.be.eq(newRouter);
  });

  it('Render view for each pathname', () => {
    const firstWindowLocationPath = '/';
    const secondWindowLocationPath = '/user';

    router.use(firstWindowLocationPath, firstScreen).use(secondWindowLocationPath, secondScreen).start();

    window.location.pathname = firstWindowLocationPath;
    expect(document.querySelector(`#${firstScreenBlockId}`)).to.exist;

    router.go(secondWindowLocationPath);
    expect(document.querySelector(`#${secondScreenBlockId}`)).to.exist;
  });
});
