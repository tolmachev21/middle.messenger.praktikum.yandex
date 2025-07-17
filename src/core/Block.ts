import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus.ts';

type Props = Record<string, unknown>
type Children = Record<string, Block | Block[]>
type PropsWithChildren = Props | Children
type Events = Record<string, (e: Event) => void>

interface PropsWithEvents extends Props {
    events?: Events
}

export type BlockConstructor<T extends Block = Block> = new (...args: Props[]) => T;

export default abstract class Block<T extends PropsWithChildren = PropsWithChildren> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: PropsWithEvents;

  protected children: Children;

  private readonly _eventBus: () => EventBus<string>;

  private _element: HTMLElement | null = null;

  private readonly _meta: {
    tagName: string,
    props: PropsWithEvents
  };

  private _id: string = nanoid(6);

  constructor(tagName: string = 'div', propsWithChildren: T = {} as T) {
    const _eventBus = new EventBus();
    this._eventBus = () => _eventBus;

    const { props, children } = this._getPropsAndChildren(propsWithChildren);
    this.children = this._makeChildrenProxy(children);

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(_eventBus);
    _eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(_eventBus: EventBus<string>) {
    _eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    _eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName) as HTMLElement;

    if (props?.className) {
      const classes = typeof props.className === 'string' ? props.className.split(' ') : [];
      this._element!.classList.add(...classes);
    }

    if (props.attributes) {
      Object.entries(props.attributes).forEach(([attrName, attrValue]) => {
        this._element!.setAttribute(attrName as string, attrValue as string);
      });
    }
  }

  get element() {
    return this._element!;
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount(oldProps?: PropsWithEvents): void {
    console.log('oldProps', oldProps);
  }

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  public dispatchComponentDidUpdate() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  private _componentDidUpdate(oldProps: PropsWithEvents, newProps: PropsWithEvents) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    if (newProps?.attributes) {
      Object.entries(newProps.attributes).forEach(([attrName, attrValue]) => {
        if (attrName === 'open') {
          this._element!.removeAttribute('close');
        } else if (attrName === 'close') {
          this._element!.removeAttribute('open');
        }
        this._element!.setAttribute(attrName as string, attrValue as string);
      });
    }

    this._render();
  }

  public componentDidUpdate(oldProps: PropsWithEvents, newProps: PropsWithEvents): boolean {
    console.log('oldProps', oldProps);
    console.log('newProps', newProps);
    return true;
  }

  private _getPropsAndChildren(propsWithChildren: Partial<T>): {
      props: PropsWithEvents,
      children: Children
    } {
    const children: Children = {};
    const props: PropsWithEvents = {};

    Object.entries(propsWithChildren).forEach(([key, value]: [string, Block | Block[] | unknown | unknown[]]) => {
      if (Array.isArray(value)) {
        children[key] = [];
        props[key] = [];
        value.forEach((obj: Block | unknown) => {
          if (obj instanceof Block) {
            (children[key] as Block[]).push(obj);
          } else {
            (props[key] as unknown[]).push(obj);
          }
        });

        return;
      }

      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  public setProps(newProps: Partial<T>): void {
    if (!newProps) {
      return;
    }

    const { props, children } = this._getPropsAndChildren(newProps);
    Object.assign(this.children, children);
    Object.assign(this.props, props);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
            this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
            this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value.map((component) => `<div data-id='${component._id}'></div>`);
      } else {
        propsAndStubs[key] = `<div data-id='${value._id}'></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child: Block | Block[]) => {
      if (Array.isArray(child)) {
        child.forEach((component: Block) => {
          const stub = fragment.content.querySelector(`[data-id='${component._id}']`) as HTMLElement;
          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id='${child._id}']`) as HTMLElement;
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  private _render() {
    this._removeEvents();
    const block = this._compile();

    if (this._element!.children.length === 0) {
      this._element!.appendChild(block);
    } else {
      this._element!.replaceChildren(block);
    }

    this._addEvents();
  }

  public render() {
    return '';
  }

  public getContent() {
    setTimeout(() => {
      if (
        this.element?.nodeType === Node.ELEMENT_NODE
      ) {
        this.dispatchComponentDidMount();
      }
    }, 100);

    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const eventBus = this._eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target: Props, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Props, property: string, value: unknown) {
        const oldTarget = { ...target };
        target[property] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _makeChildrenProxy(children: Children) {
    const eventBus = this._eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(children, {
      get(target: Children, property: string) {
        const value = target[property];
        return typeof value === 'function' ? (value as unknown as Function).bind(target) : value;
      },

      set(target: Children, property: string, value: Block | Block[]) {
        const oldTarget = { ...target };
        target[property] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show(): void {
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }
}
