import {ICategory, IThumbnail} from '../auto-card-page/auto-card-page.interface';
import {toUserFriendlyDate} from '../shared/utility/toUserFriendlyDate';

export interface IOrder {
  id: string;
  carId: ICar;
  cityId: ICity | null;
  color: string;
  dateFrom: number;
  dateTo: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  orderStatusId: IStatus | null;
  pointId: IPoint | null;
  price: number;
  rateId: IRate | null;
}

export class OrderModel {
  id: string;
  carId: CarModel;
  location: string;
  color: string;
  dateInterval: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  price: number;
  orderStatus: string;

  constructor(order: IOrder) {
    this.id = order.id;
    this.carId = new CarModel(order.carId);
    this.location = (order.cityId?.name && order.pointId?.address) ? `в ${order.cityId.name}, ${order.pointId.address}` : '';
    this.color = order.color;
    this.dateInterval = `${toUserFriendlyDate(order.dateFrom)} - ${toUserFriendlyDate(order.dateTo)}`;
    this.isFullTank = order.isFullTank;
    this.isNeedChildChair = order.isNeedChildChair;
    this.isRightWheel = order.isRightWheel;
    this.price = order.price;
    this.orderStatus = order.orderStatusId?.name ? order.orderStatusId.name : '';
  }
}

export class CarModel {
  id: string;
  name: string;
  path: string;

  constructor(car: ICar) {
    this.id = car.id || '';
    this.name = car.name && car.number ? `${car.name} ${car.number}` : '';
    this.path = car.thumbnail.path || '';
  }
}

export interface ICar {
  categoryId: ICategory;
  colors: string[];
  description: string;
  id: string;
  name: string;
  number: string;
  priceMax: number;
  priceMin: number;
  tank: number;
  thumbnail: IThumbnail;
}

export interface ICity {
  id: string;
  name: string;
}

export interface IStatus {
  id: string;
  name: string;
}

export interface IPoint {
  id: string;
  name: string;
  address: string;
}

export interface IRate {
  id: string;
  price: number;
  rateTypeId: IRateType;
}

export interface IRateType {
  unit: string;
  name: string;
}

export interface IFilterData {
  category: ICategory[],
  city: ICity[],
  status: IStatus[]
}
