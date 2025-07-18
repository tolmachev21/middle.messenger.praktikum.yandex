import { isEqual } from '../utils/index.ts';
import { render } from './renderDOM.ts';
import Block, { BlockConstructor } from './Block';

type PropsWithRootQuery = Record<string, string>

export default class Route {
  private _pathname: string;

  private _blockClass: BlockConstructor;

  private _block: Block | null = null;

  private _props: PropsWithRootQuery;

  constructor(pathname: string, view: BlockConstructor, props: PropsWithRootQuery) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) return;

    if (!this._block) {
      throw new Error(`Cannot found _block ${this._block}`);
    }

    this._block.show();
  }

  public leave() {
    if (!this._block) {
      throw new Error(`Cannot found _block ${this._block}`);
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    render(this._props.rootQuery, this._block);
  }
}
