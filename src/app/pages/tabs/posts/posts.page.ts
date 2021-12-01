import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/backend/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  //#region Fields


  //#endregion


  //#region Properties


  //#endregion


  //#region Constructor

  constructor(
    private postsService: PostsService
  ) { }


  //#endregion



  //#region Functions


  ngOnInit() {
    this.getCustomerPosts();
  }

  async getCustomerPosts(): Promise<void> {
    const posts = await this.postsService.getCustomerPosts();
  }
  //#endregion

}

