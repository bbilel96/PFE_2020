import {NgModule} from '@angular/core';
import {FooterLogComponent} from '../footer-log/footer-log.component';
import {HeaderLogComponent} from '../header-log/header-log.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ExplorationHeaderComponent} from 'src/app/Componenets/header/exploration.header/exploration.header.component';

@NgModule({
    imports: [
     CommonModule,
     IonicModule
    ],
    declarations: [HeaderLogComponent, FooterLogComponent, ExplorationHeaderComponent],
    exports: [HeaderLogComponent, FooterLogComponent, ExplorationHeaderComponent]
  })
  export class ShareComponent {}
