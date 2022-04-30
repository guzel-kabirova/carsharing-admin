import {ISelectedImg} from './auto-info.interface';
import {IThumbnail} from '../auto-card-page.interface';

export const NO_PICTURE: ISelectedImg = {
  src: '',
  alt: '',
};

export const NO_THUMBNAIL: IThumbnail = {
  size: 0,
  originalname: '',
  mimetype: '',
  path: '',
};
