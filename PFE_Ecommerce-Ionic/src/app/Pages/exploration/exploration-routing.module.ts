import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorationPage } from './exploration.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorationPage,
    children:[
      {
        path: 'product',
        loadChildren: () => import('../content/product/product.module').then( m => m.ProductPageModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../log-in/log-in.module').then( m => m.LogInPageModule)
      },
      {
        path: 'list-product',
        loadChildren: () => import('../productList/list-product/list-product.module').then( m => m.ListProductPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../Pages/exploration/search/search/search.module').then( m => m.SearchPageModule)
      }

    ]
  
  },
  {
    path: 'search',
    loadChildren: () => import('../../Pages/exploration/search/search/search.module').then( m => m.SearchPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorationPageRoutingModule {}
