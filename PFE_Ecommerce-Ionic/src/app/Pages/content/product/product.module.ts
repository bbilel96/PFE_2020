import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { ProductComponent} from '../../../Componenets/description/product/product.component';
import { ShareComponent } from 'src/app/Componenets/share/shareComponent';
import { ListProductComponent } from 'src/app/Componenets/list-product/list-product.component';
import {ExplorationHeaderComponent} from 'src/app/Componenets/header/exploration.header/exploration.header.component';
import {ListProductPage} from "../../productList/list-product/list-product.page";
import {ProductShareComponent} from "../../../Componenets/share/productShareComponent";
import {IonicSelectableModule} from "ionic-selectable";


@NgModule({
  imports: [
    CommonModule,
    ShareComponent,
    FormsModule,
    ProductPageRoutingModule,
    IonicModule,
    ProductShareComponent,
    IonicSelectableModule
  ],
  declarations: [ProductPage],
  entryComponents: [ProductComponent]

})
export class ProductPageModule {}
