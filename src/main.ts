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
  query.get('/user').then((user) => {
    	typeof user === 'string' && localStorage.setItem('user', user);
    	window.history.pushState({}, '', '/messenger');
  }).catch((err) => {
    	console.log('err', err);
	    localStorage.removeItem('user');
	    window.history.pushState({}, '', '/');
  });

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
