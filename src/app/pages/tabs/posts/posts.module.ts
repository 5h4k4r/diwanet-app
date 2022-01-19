import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostsAddComponent } from './components/posts-add/posts-add.component';
import { TranslationModule } from 'src/app/translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostsPageRoutingModule,
    InfiniteScrollModule,
    TranslationModule,
  ],
  declarations: [PostsPage, PostsAddComponent]
})
export class PostsPageModule { }
