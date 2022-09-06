import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCommandPage } from './search-command.page';

const routes: Routes = [
  {
    path: '',
    component: SearchCommandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCommandPageRoutingModule {}
