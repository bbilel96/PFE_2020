import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {CustomerService} from './Services/customerService/customer.service';
import {AuthGuardService} from './Services/storage/auth/auth-guard.service';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./Pages/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'log-up',
    loadChildren: () => import('./Pages/log-up/log-up.module').then( m => m.LogUpPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./Pages/exploration/search/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'exploration',
    loadChildren: () => import('./Pages/exploration/exploration.module').then( m => m.ExplorationPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./Pages/content/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./Pages/welcome/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'list-product',
    loadChildren: () => import('./Pages/productList/list-product/list-product.module').then( m => m.ListProductPageModule)
  },
  {
    path: 'customer-side-menu',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Pages/content/customer/sidemenu/side-menu/side-menu.module').then( m => m.SideMenuPageModule)
  },
  {
    path: 'command',
    loadChildren: () => import('./Pages/productList/command/command/command.module').then( m => m.CommandPageModule)
  },
  {
    path: 'command-history',
    loadChildren: () => import('./Pages/content/customer/command_history/command-history/command-history.module').then( m => m.CommandHistoryPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./Pages/content/customer/updateCompte/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'side-menu-admin',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Pages/content/admin/side-menu-admin/side-menu-admin.module').then( m => m.SideMenuAdminPageModule)
  },
  {
    path: 'block',
    loadChildren: () => import('./Pages/content/admin/block/block.module').then( m => m.BlockPageModule)
  },
  {
    path: 'check-email',
    loadChildren: () => import('./Pages/check-email/check-email.module').then( m => m.CheckEmailPageModule)
  },
  {
    path: 'search-command',
    loadChildren: () => import('./Pages/content/customer/command_history/command-history/search-command/search-command.module').then( m => m.SearchCommandPageModule)
  },
  {
    path: 'check-reset',
    loadChildren: () => import('./Pages/check-email/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
