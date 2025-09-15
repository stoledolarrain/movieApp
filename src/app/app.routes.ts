import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadComponent: () => import('./movies/movies.page').then(m => m.MoviesPage)
  },
  {
    path: 'movie-detail/:id',
    loadComponent: () => import('./movie-detail/movie-detail.page').then(m => m.MovieDetailPage)
  }
];
