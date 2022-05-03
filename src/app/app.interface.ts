export interface IResponse<T> {
  count: number;
  data: T[];
}

export enum OrderStatus {
  New = 'Новые',
  Confirmed = 'Подтвержденные',
  Canceled = 'Отмененные',
  Temporal = 'Временные',
}
