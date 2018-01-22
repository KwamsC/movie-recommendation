import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import {HomeComponent} from "./home/home.component";
import { RatingsComponent } from "./ratings/ratings.component"
import {MoviesComponent} from "./movies/movies.component";
import { RegisterComponent } from "./register/register.component"

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
