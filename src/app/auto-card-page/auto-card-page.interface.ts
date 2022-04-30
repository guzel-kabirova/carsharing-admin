export interface IFormInfo {
  url: string;
  description: string;
}

export interface IFormSettings {
  name: string;
  colors: string[];
  priceMin: number;
  priceMax: number;
  categoryId: ICategory | null;
}

export interface ICarDto {
  categoryId: ICategory | null;
  thumbnail: IThumbnail;
  name: string;
  priceMin: number;
  priceMax: number;
  colors: string[];
  description: string;
}

export interface IThumbnail {
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface ICategory {
  id: string;
  name: string;
}
