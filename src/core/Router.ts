import Route from './Route.ts';
import { BlockConstructor } from './Block';

export default class Router {
  private static __instance: Router;

  private _rootQuery: string = '';

  private history: History = window.history;

  private routes: Array<Route> = [];

  private _currentRoute: Route | null = null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.addEventListener('popstate', () => this._onRoute(window.location.pathname));

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) {
      throw new Error(`Роут по ${pathname} не зарегистирован`);
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(pathname: string) {
    if (pathname) {
      this.history.replaceState({}, '', pathname);
      this._onRoute(pathname);
      return;
    }
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
