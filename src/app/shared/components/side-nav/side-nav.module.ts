import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { SideNavPage } from './side-nav.page';
import { TranslationModule } from 'src/app/translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslationModule,
  ],
  declarations: [SideNavPage],
  exports: [SideNavPage]
})
export class SideNavPageModule { }
