import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Subject, Observable, throwError } from 'rxjs';

import { Product } from '../models/product.model';

const apiBaseUrl = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListChangedEvent = new Subject<Product[]>();
  products: Product[] = [];
  categories = ['Fruits and Vegetables', 'Bakery', 'Deli', 'Dairy', 'Refrigerated Foods', 'Frozen Foods', 'Snacks', 'Miscellaneous Foods', 'Non-Food Items']

  constructor(private http: HttpClient) {
    this.http.get<Product[]>(`${apiBaseUrl}/products`).subscribe((productList: Product[]) => {
        let sortedByName = productList.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          else { return 1; }
        })
        let sortedByNameAndCategory = sortedByName.sort((a, b) => {
          if (a.category < b.category) { return -1; }
          else { return 1; }
        })
        this.products = sortedByNameAndCategory;
        this.productListChangedEvent.next(this.products.slice());
    }, (error: any) => { console.log(error); });
  }


  // METHODS

  getProducts(): Product[] {
    return this.products.slice();
  }

  getProduct(id: number): Product {
    for (const product of this.products) {
      if (product.id == id) return product;
    }
    return null;
  }

  addProduct(newProduct: Product) {
    if (!newProduct) return;
    newProduct.id = null;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, product: Product }>(`${apiBaseUrl}/products`, newProduct, { headers: headers })
      .subscribe(
        (responseData) => {
          this.products.push(responseData.product);
          this.productListChangedEvent.next(this.products.slice());
        }
      );
  }

  updateProduct(originalProduct: Product, newProduct: Product) {
    if (!originalProduct || !newProduct) return;
    const position = this.products.indexOf(originalProduct);
    if (position < 0) return;
    newProduct.id = originalProduct.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put<any>(`${apiBaseUrl}/products/${originalProduct.id}`, newProduct, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.products[position] = newProduct;
          this.productListChangedEvent.next(this.products.slice());
        }
      );
  }

  deleteProduct(product: Product) {
    if (!product) return;
    const position = this.products.indexOf(product);
    if (position < 0) return;

    this.http.delete<any>(`${apiBaseUrl}/products/${product.id}`)
      .subscribe(
        (response: Response) => {
          this.products.splice(position, 1);
          this.productListChangedEvent.next(this.products.slice());
        }
      );
  }

}
