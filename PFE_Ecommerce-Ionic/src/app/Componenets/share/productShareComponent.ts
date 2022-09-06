import {NgModule} from '@angular/core';
import {FooterLogComponent} from '../footer-log/footer-log.component';
import {HeaderLogComponent} from '../header-log/header-log.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductComponent } from '../description/product/product.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [ProductComponent],
    exports: [ProductComponent]
  })
  export class ProductShareComponent {}
