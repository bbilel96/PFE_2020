import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorationPageRoutingModule } from './exploration-routing.module';

import { ExplorationPage } from './exploration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorationPageRoutingModule
  ],
  declarations: [ExplorationPage]
})
export class ExplorationPageModule {}
