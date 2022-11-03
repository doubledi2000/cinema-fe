import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWord'
})
export class LimitWordPipe implements PipeTransform {
  LIMIT_LENGTH_WORD_DEFAULT = 20;

  transform(str?: string, length = this.LIMIT_LENGTH_WORD_DEFAULT): string {
    // if (!!str && str.indexOf(' ') === -1) {
    //   return str.length <= length
    //     ? str
    //     : str.slice(0, LIMIT_LENGTH_WORD_DEFAULT).trim() + '...';
    // }
    return !!str
      ? str.length <= length
        ? str
        : str.substring(0, length).trim() + '...'
      : '';
  }

}
