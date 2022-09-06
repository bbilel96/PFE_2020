import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandHistoryPageRoutingModule } from './command-history-routing.module';

import { CommandHistoryPage } from './command-history.page';
// tslint:disable-next-line:max-line-length
import {CommandhistoryComponent} from "../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component";
import {HistoricShareComponent} from "../../../../../Componenets/share/historicShareComponent";
import {SearchComponent} from "../command_history/search/search.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandHistoryPageRoutingModule,
    HistoricShareComponent
  ],
  declarations: [CommandHistoryPage],
  entryComponents: [CommandhistoryComponent]
})
export class CommandHistoryPageModule {}
