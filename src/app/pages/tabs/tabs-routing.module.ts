import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'suggests',
        loadChildren: () => import('./suggests/suggests.module').then(m => m.SuggestsPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/suggests',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/suggests',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
