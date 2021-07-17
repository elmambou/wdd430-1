import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  subscription?: Subscription;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.subscription = this.productService.productListChangedEvent
      .subscribe((productList: Product[]) => this.products = productList.slice())
  }

}
