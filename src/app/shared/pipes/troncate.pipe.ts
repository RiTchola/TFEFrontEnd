import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'troncate'
})
export class TroncatePipe implements PipeTransform {

    transform(value: string, limit: number = 15): string {
        return value.length > limit ? value.substring(0, limit) + '...' : value;
    }

}
