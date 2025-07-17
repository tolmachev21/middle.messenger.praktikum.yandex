import sinon from 'sinon';
import { expect } from 'chai';
import Block from './Block.ts';

describe('Block', () => {
  const PageBlockId = 'pageComponent';
  class Page extends Block {
    constructor(props = {}) {
      super('div', props);
    }

    render() {
      return `<div>
        <span id="${PageBlockId}">{{text}}</span>
      </div>`;
    }
  }

  it('Should create component with state from constructor', () => {
    const text = 'Hello';

    const pageComponent = new Page({ text });

    const spanText = pageComponent.element?.querySelector(`#${PageBlockId}`)?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('Component should be have reactivity', () => {
    const newValue = 'New value';

    const pageComponent = new Page({ text: 'Hello' });

    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent.element?.querySelector(`#${PageBlockId}`)?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });

  it('Компонент должен установить события на элемент', () => {
    const clickHadnlerStub = sinon.stub();
    const pageComponent = new Page({
      events: {
        click: clickHadnlerStub,
      },
    });

    const mouseClickEvent = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(mouseClickEvent);

    expect(clickHadnlerStub.calledOnce).to.be.true;
  });

  it('Component should call dispatchComponentDidMount', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new Page();

    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

    pageComponent.getContent();
    clock.next();

    expect(spyCDM.calledOnce).to.be.true;
  });
});
