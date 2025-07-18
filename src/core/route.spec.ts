import { expect } from 'chai';
import sinon from 'sinon';
import Route from './Route.ts';
import Block from './Block.ts';

describe('Route', () => {
  let route: Route;
  class PageComponent extends Block {
    constructor(props = {}) {
      super('div', {
        ...props,
      });
    }

    public render():string {
      return '<div id="pageComponent">Всем привет<div>';
    }
  }

  const logSpy = sinon.spy(PageComponent.prototype, 'render');

  beforeEach(() => {
    route = new Route('/user', PageComponent, { rootQuery: 'body' });
  });

  afterEach(() => {
    logSpy.restore();
  });

  it('Должен создавать экземпляр компонента', () => {
    route.render();

    expect(document.querySelector('#pageComponent')?.textContent).to.eq('Всем привет');
    sinon.assert.calledOnce(logSpy);
  });
});
