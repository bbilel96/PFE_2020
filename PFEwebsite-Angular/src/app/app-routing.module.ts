import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProductComponent} from './add-product/add-product.component';
import {AddExtraComponent} from './add-extra/add-extra/add-extra.component';


const routes: Routes = [
  {
    path: '', component: AddProductComponent,
  },
  {
    path: 'extra', component: AddExtraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
