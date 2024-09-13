import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirPage } from './pedir.page';

const routes: Routes = [
  {
    path: '',
    component: PedirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirPageRoutingModule {}
