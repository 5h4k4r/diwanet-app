import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslationModule } from 'src/app/translation.module';
import { SelectLocationRoutingModule } from './select-location-routing.module';

import { SelectLocationComponent } from './select-location.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SelectLocationRoutingModule,
    TranslationModule,
  ],
  exports: [],
  declarations: [SelectLocationComponent],
  providers: [],
})
export class SelectLocationModule { }
