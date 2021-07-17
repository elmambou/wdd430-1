import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-plan',
  templateUrl: './product-plan.component.html',
  styleUrls: ['./product-plan.component.css']
})
export class ProductPlanComponent implements OnInit {
  products: Product[] = [];
  subscription?: Subscription;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.subscription = this.productService.productListChangedEvent
      .subscribe((productList: Product[]) => this.products = productList.slice())
  }

}
