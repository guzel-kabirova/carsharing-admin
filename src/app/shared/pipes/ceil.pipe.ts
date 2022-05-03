import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ceil',
})
export class CeilPipe implements PipeTransform {
  transform(value: number | null): number {
    return value ? Math.ceil(value) : 0;
  }
}
