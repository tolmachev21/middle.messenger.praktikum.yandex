import Handlebars from 'handlebars';
import Router from './core/Router';
import * as Components from './components';
import * as Pages from './pages';
import renderDOM from './core/renderDOM.ts';
import { HTTPTransport } from './core/HttpTransport';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }

  Handlebars.registerPartial(name, template);
});

const query = new HTTPTransport('auth');

export const router = new Router('#app');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const userString = await query.get('/user');
    const userObj = JSON.parse(userString as string);
    if (userObj?.reason) {
      if (window.location.pathname === '/sign-up') {
        window.history.pushState({}, '', '/sign-up');
      } else {
        window.history.pushState({}, '', '/');
      }
    }
    if (userObj?.id && (window.location.pathname === '/' || window.location.pathname === '/sign-up')) window.history.pushState({}, '', '/messenger');
  } catch (err) {
    console.error('err', err);
    router.go('/');
  }

  try {
    router.use('/', Pages.SignInPage)
      .use('/sign-up', Pages.SignUpPage)
      .use('/settings', Pages.ProfilePage)
      .use('/messenger', Pages.ChatsPage)
      .start();
  } catch (err) {
    console.error('err', err);
    renderDOM(new Pages.Error404Page({
      onClick: () => router.back('/messenger'),
    }));
  }
});
