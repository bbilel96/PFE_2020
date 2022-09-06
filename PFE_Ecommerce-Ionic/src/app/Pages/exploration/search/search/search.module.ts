import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {ShareComponent} from '../../../../Componenets/share/shareComponent';
import {ProductShareComponent} from '../../../../Componenets/share/productShareComponent';
import {ProductComponent} from '../../../../Componenets/description/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    ShareComponent,
    FormsModule,
    ProductShareComponent,
    IonicModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage],
  entryComponents: [ProductComponent]
})
export class SearchPageModule {}
