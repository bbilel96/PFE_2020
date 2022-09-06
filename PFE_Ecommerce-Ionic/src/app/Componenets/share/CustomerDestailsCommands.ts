import {NgModule} from '@angular/core';
import {FooterLogComponent} from '../footer-log/footer-log.component';
import {HeaderLogComponent} from '../header-log/header-log.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductComponent } from '../description/product/product.component';
import {FormsModule} from '@angular/forms';
import {CommandhistoryComponent} from "../description/command/commandHistory/commandhistory/commandhistory.component";
import {CustomerDetailsComponent} from "../customer-details/customer-details.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [ CustomerDetailsComponent],
    exports:  [ CustomerDetailsComponent]
})
export class CustomerDestailsCommandsShareCompoment {}
