import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogUpPage } from './log-up.page';

const routes: Routes = [
  {
    path: '',
    component: LogUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogUpPageRoutingModule {}
