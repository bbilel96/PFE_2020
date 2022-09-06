import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule  } from '@angular/forms';


import { LogUpPageRoutingModule } from './log-up-routing.module';

import { LogUpPage } from './log-up.page';


import { ShareComponent} from 'src/app/Componenets/share/shareComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LogUpPageRoutingModule,
    ShareComponent
  ],
  declarations: [LogUpPage]
})
export class LogUpPageModule {}
