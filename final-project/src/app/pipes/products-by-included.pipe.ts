import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'included'
})
export class ProductsByIncludedPipe implements PipeTransform {

  transform(products: Product[]): any {
    let filteredProducts: Product[] = []
    filteredProducts = products.filter((product: Product) => product.included == true);
    return filteredProducts;
  }

}
