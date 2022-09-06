import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckEmailPage } from './check-email.page';

const routes: Routes = [
  {
    path: '',
    component: CheckEmailPage
  },
  {
    path: 'reset-password',
    loadChildren: () => import('../../Pages/check-email/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckEmailPageRoutingModule {}
