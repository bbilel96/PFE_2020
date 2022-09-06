import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCommandPageRoutingModule } from './search-command-routing.module';

import { SearchCommandPage } from './search-command.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchCommandPageRoutingModule
  ],
  declarations: [SearchCommandPage]
})
export class SearchCommandPageModule {}
