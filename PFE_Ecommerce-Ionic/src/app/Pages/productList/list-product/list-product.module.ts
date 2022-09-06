import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductPageRoutingModule } from './list-product-routing.module';

import { ListProductPage } from './list-product.page';
import {ProductComponent} from "../../../Componenets/description/product/product.component";
import {ProductShareComponent} from "../../../Componenets/share/productShareComponent";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductPageRoutingModule,
    ProductShareComponent
  ],
  declarations: [ListProductPage],
  entryComponents: [ProductComponent]

})
export class ListProductPageModule {}
