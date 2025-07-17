import { expect } from 'chai';
import EventBus from './EventBus.ts';

describe('EventBus', () => {
  let eventBus: EventBus<string>;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('Событие вызывает привязанные к нему обработчик', () => {
    let count = 0;
    eventBus.on('increase count', () => {
      count += 1;
    });

    eventBus.emit('increase count');

    expect(count).to.eq(1);
  });

  it('Можно отвязать обработчик от события', () => {
    let count = 0;
    const callback = () => {
      count += 1;
    };

    eventBus.on('increase count', callback);

    eventBus.emit('increase count');

    eventBus.off('increase count', callback);

    eventBus.emit('increase count');

    expect(count).to.eq(1);
  });
});
