import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPlanComponent } from './components/product-plan/product-plan.component';
import { ProductsByCategoryPipe } from './pipes/products-by-category.pipe';
import { ProductsByIncludedPipe } from './pipes/products-by-included.pipe';
import { ProductsByNamePipe } from './pipes/products-by-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductPlanComponent,
    ProductsByCategoryPipe,
    ProductsByIncludedPipe,
    ProductsByNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
