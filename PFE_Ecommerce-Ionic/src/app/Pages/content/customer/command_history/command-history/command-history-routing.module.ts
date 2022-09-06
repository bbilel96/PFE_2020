import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandHistoryPage } from './command-history.page';

const routes: Routes = [
  {
    path: '',
    component: CommandHistoryPage
  },
  {
    path: 'search',
    loadChildren: () => import('./search-command/search-command.module').then( m => m.SearchCommandPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandHistoryPageRoutingModule {}
