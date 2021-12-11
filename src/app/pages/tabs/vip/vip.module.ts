import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VipPageRoutingModule } from './vip-routing.module';

import { VipPage } from './vip.page';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VipPageRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ],
  declarations: [VipPage]
})
export class VipPageModule { }
