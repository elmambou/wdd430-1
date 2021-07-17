import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productsByCategory'
})
export class ProductsByCategoryPipe implements PipeTransform {

  transform(products: Product[], category: string): any {
    let filteredProducts: Product[] = []
    if (category && category.length > 0) {
      filteredProducts = products.filter((product: Product) => product.category == category);
    }
    return filteredProducts;
  }

}
