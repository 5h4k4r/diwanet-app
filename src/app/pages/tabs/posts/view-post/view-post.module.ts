import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPostPageRoutingModule } from './view-post-routing.module';

import { ViewPostPage } from './view-post.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPostPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ViewPostPage]
})
export class ViewPostPageModule { }
