import {Provider} from '@angular/core';
import {ICONS_PATH} from './shared/components/icon/icons.path';

export const ICONS_PROVIDER: Provider = {
  provide: ICONS_PATH,
  useValue: 'assets/icons',
};
