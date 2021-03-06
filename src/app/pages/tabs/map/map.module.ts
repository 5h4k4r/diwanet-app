import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslationModule } from 'src/app/translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    SharedModule,
    TranslationModule,
  ],
  declarations: [MapPage]
})
export class MapPageModule { }
