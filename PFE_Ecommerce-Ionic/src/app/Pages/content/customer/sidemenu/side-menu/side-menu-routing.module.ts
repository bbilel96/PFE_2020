import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'product',
        loadChildren: () => import('../../../product/product.module').then(m => m.ProductPageModule)
      },
      {
        path: 'command-history',
        loadChildren: () => import('../../command_history/command-history/command-history.module').then( m => m.CommandHistoryPageModule)
      },
      {
        path: 'list-product',
        loadChildren: () => import('../../../../../Pages/productList/list-product/list-product.module').then( m => m.ListProductPageModule)
      },
      {
        path: 'command',
        loadChildren: () => import('../../../../../Pages/productList/command/command/command.module').then( m => m.CommandPageModule)
      },
      {
        path: 'update',
        loadChildren: () => import('../../../../content/customer/updateCompte/update/update.module').then( m => m.UpdatePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../../../../Pages/exploration/search/search/search.module').then( m => m.SearchPageModule)
      }
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/Pages/home/home.module').then(m => m.HomePageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
