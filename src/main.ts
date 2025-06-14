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
  if (!localStorage.getItem('user')) {
    try {
      const userString = await query.get('/user');
      const userObj = JSON.parse(userString as string);
      if (typeof userObj === 'object' && userObj !== null && 'id' in userObj) {
        localStorage.setItem('user', userString as string);
      } else {
        localStorage.removeItem('user');
        window.history.pushState({}, '', '/');
      }
    } catch (err) {
      localStorage.removeItem('user');
      window.history.pushState({}, '', '/');
    }
  }

  try {
    router.use('/', Pages.SignInPage)
      .use('/sign-up', Pages.SignUpPage)
      .use('/settings', Pages.ProfilePage)
      .use('/messenger', Pages.ChatsPage)
      .start();
  } catch (err) {
    renderDOM(new Pages.Error404Page({
      onClick: () => router.back('/messenger'),
    }));
  }
});
