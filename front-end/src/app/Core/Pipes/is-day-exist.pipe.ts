import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDayExist',
  standalone: true
})
export class IsDayExistPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
