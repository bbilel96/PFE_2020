import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockPage } from './block.page';

const routes: Routes = [
  {
    path: '',
    component: BlockPage
  },
  {
    path: 'search',
    loadChildren: () => import('../../../../Pages/content/admin/block/search/search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockPageRoutingModule {}
