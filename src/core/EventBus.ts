export default class EventBus<E extends string> {
  private readonly _listeners: Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  public on(eventName: E, callback: Function) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(callback);
  }

  public off(eventName: E, callback: Function) {
    if (!this._listeners[eventName]) {
      throw Error(`Нет такого события для off ${eventName}`);
    }

    this._listeners[eventName] = this._listeners[eventName].filter((listener) => listener !== callback);
  }

  public emit<T extends unknown[] = []>(eventName: E, ...args: T) {
    if (!this._listeners[eventName]) {
      throw Error(`Нет такого события для emit ${eventName}`);
    }

    this._listeners[eventName].forEach((listener) => listener(...args));
  }
}
