import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule { }
