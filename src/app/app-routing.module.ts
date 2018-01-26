import { MovieDetailComponent } from './movie-detail/movie-detail.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import {HomeComponent} from "./home/home.component";
import { RatingsComponent } from "./ratings/ratings.component"
import {MoviesComponent} from "./movies/movies.component";
import { RegisterComponent } from "./register/register.component"
import { Authguard } from './_guards/authguard';
import {MovieSearchComponent} from "./movie-search/movie-search.component";
import {MovielistComponent} from "./movielist/movielist.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [Authguard] },
  { path: '', component: HomeComponent },
  { path: 'ratings', component: RatingsComponent, canActivate: [Authguard] },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, canActivate: [Authguard] },
  { path: 'register', component: RegisterComponent},
  { path: 'movies/:id', component: MovieDetailComponent, canActivate: [Authguard]},
  { path: 'search', component: MovieSearchComponent, canActivate: [Authguard]},
  {path: 'list', component: MovielistComponent, canActivate: [Authguard]},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
