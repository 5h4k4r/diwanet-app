import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestsPage } from './suggests.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestsPageRoutingModule { }
