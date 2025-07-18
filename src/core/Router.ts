import Route from './Route.ts';
import { BlockConstructor } from './Block';

export default class Router {
  private static __instance: Router;

  private _rootQuery: string = '';

  private _history: History = window.history;

  private _routes: Array<Route> = [];

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
    this._routes.push(route);
    return this;
  }

  public start() {
    window.addEventListener('popstate', () => this._onRoute(window.location.pathname));

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);
    console.log('pathname', pathname);
    if (!route) {
      throw new Error(`Роут по ${pathname} не зарегистирован`);
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(pathname: string) {
    if (pathname) {
      this._history.replaceState({}, '', pathname);
      this._onRoute(pathname);
      return;
    }
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}
