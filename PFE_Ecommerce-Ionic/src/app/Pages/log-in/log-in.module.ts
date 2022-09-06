import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule  } from '@angular/forms';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';

import { ShareComponent} from 'src/app/Componenets/share/shareComponent';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LogInPageRoutingModule,
    ShareComponent
  ],
  declarations: [LogInPage]
})
export class LogInPageModule {}
