import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, flag: string): any {
    if(!items) return [];
    if(!searchText) return items;   
    if(flag == 'modify'){
      return items.filter( it => {
        return (
            it.SerialNo==searchText 
        )
      });
    }
    else if(flag == 'cancel'){
      return items.filter( it => {
        return (
            it.SerialNo==searchText 
        )
      });
    }
  }

}
