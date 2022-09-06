import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideMenuAdminPageRoutingModule } from './side-menu-admin-routing.module';

import { SideMenuAdminPage } from './side-menu-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideMenuAdminPageRoutingModule
  ],
  declarations: [SideMenuAdminPage]
})
export class SideMenuAdminPageModule {}
