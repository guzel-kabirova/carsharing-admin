import {IInterval, Interval} from './order-page.interface';

export const ROWS_PER_PAGE = 10;

export const INTERVALS: IInterval[] = [
  {id: '0', name: Interval.Today}, {id: '1', name: Interval.Yesterday}, {id: '2', name: Interval.Last7Days},
  {id: '3', name: Interval.Last30Days}, {id: '4', name: Interval.ThisMonth}, {id: '5', name: Interval.LastMonth},
  {id: '6', name: Interval.Last3Months}, {id: '7', name: Interval.Last6Months}, {id: '8', name: Interval.LastYear},
  {id: '9', name: Interval.All},
];
