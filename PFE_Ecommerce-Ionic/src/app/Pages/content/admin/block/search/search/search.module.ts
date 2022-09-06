import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {ProductComponent} from "../../../../../../Componenets/description/product/product.component";
import {CustomerDetailsComponent} from "../../../../../../Componenets/customer-details/customer-details.component";
import {CommandhistoryComponent} from "../../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component";
import {CustomerDestailsCommandsShareCompoment} from "../../../../../../Componenets/share/CustomerDestailsCommands";
import {HistoricShareComponent} from "../../../../../../Componenets/share/historicShareComponent";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    CustomerDestailsCommandsShareCompoment,
    HistoricShareComponent
  ],
  declarations: [SearchPage],
  entryComponents: [CommandhistoryComponent, CustomerDetailsComponent]
})
export class SearchPageModule {}
