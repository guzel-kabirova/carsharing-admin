import {isPresent} from './isPresent';
import {isArrayFull} from './isArrayFull';

export const selectTrulyObjectProperties = <T extends object, U extends keyof T>(obj: T): Partial<T> => {
  const result: Partial<T> = {};
  const keys = Object.keys(obj) as U[];

  keys.forEach(key => {
    const value = obj[key];
    if (isPresent(value)
      && (Array.isArray(value) && isArrayFull(value)
        || typeof value === 'number' && !isNaN(value)
        || typeof value === 'string' && value.trim() !== ''
        || typeof value === 'object' && !Array.isArray(value)
      )
    ) {
      result[key] = value;
    }
  });
  return result;
};
