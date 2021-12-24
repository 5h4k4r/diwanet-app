import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestsPageRoutingModule } from './suggests-routing.module';

import { SuggestsPage } from './suggests.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SuggestsPageRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ],
  declarations: [SuggestsPage]
})
export class SuggestsPageModule { }
