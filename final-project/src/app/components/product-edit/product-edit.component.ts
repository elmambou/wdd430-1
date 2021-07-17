import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() product: Product;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  onSave(f: NgForm, product: Product) {
    const value = f.value;
    let updatedProduct = product;
    updatedProduct.name = value.name;
    updatedProduct.category = value.category;
    updatedProduct.included = value.included;

    this.productService.updateProduct(product, updatedProduct);
    f.form.markAsPristine();
  }

  onDelete(product) {
    this.productService.deleteProduct(product);
  }

}
