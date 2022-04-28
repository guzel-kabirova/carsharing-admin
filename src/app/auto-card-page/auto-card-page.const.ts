import {IFormInfo, IFormSettings} from './auto-card-page.interface';

export const INITIAL_INFO: IFormInfo = {
  url: '',
  description: '',
};

export const INITIAL_SETTINGS: IFormSettings = {
  priceMin: NaN,
  priceMax: NaN,
  categoryId: null,
  name: '',
  colors: [],
};
