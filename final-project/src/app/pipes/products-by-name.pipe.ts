import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productsByName'
})
export class ProductsByNamePipe implements PipeTransform {

  transform(products: Product[], name: string): any {
    let filteredProducts: Product[] = []
    if (name && name.length > 0) {
      filteredProducts = products.filter((product: Product) => product.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (filteredProducts.length < 1) return products;
    return filteredProducts;
  }

}
