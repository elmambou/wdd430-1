import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product = new Product(0, '', '', false);

  constructor(public productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    var value = f.value;
    this.product.name = value.name;
    this.product.category = value.category;

    this.productService.addProduct(this.product);
    this.router.navigate(['products']);
  }

  onCancel() {
    this.router.navigate(['products']);
  }

}
