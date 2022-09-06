import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockPageRoutingModule } from './block-routing.module';

import { BlockPage } from './block.page';
import {CommandhistoryComponent} from "../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component";
import {HistoricShareComponent} from "../../../../Componenets/share/historicShareComponent";
import {CustomerDetailsComponent} from "../../../../Componenets/customer-details/customer-details.component";
import {CustomerDestailsCommandsShareCompoment} from "../../../../Componenets/share/CustomerDestailsCommands";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockPageRoutingModule,
      HistoricShareComponent,
      CustomerDestailsCommandsShareCompoment
  ],
  declarations: [BlockPage],
  entryComponents: [CommandhistoryComponent, CustomerDetailsComponent]
})
export class BlockPageModule {}
