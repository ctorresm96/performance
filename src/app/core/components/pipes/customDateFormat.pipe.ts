import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDateFormat',
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(
    value: Date | number | string,
    format: string = 'DD/MM/yyyy'
  ): string {
    return moment(value).format(format);
  }
}
