import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuAdminPage } from './side-menu-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuAdminPage,
    children: [
      {
        path: 'block',
        loadChildren: () => import('../block/block.module').then(m => m.BlockPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../admin/block/search/search/search.module').then( m => m.SearchPageModule)
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuAdminPageRoutingModule {}
