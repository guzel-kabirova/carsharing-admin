import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {ICONS_PATH} from './shared/components/icon/icons.path';
import {AppInterceptor} from './app.interceptor';
import {environment} from '../environments/environment';

export const API_URL = environment.apiUrl;
export const LOGIN_DETAILS_URL = 'https://gist.github.com/internship-simbirsoft/3d634f32072b1e8514fc9fb19f88acdd';
export const APP_URL = 'https://guzel-kabirova.github.io/carsharing/';

export const ICONS_PROVIDER: Provider = {
  provide: ICONS_PATH,
  useValue: 'assets/icons',
};

export const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
