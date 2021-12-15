import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostsAddComponent } from './components/posts-add/posts-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostsPageRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [PostsPage, PostsAddComponent]
})
export class PostsPageModule { }
