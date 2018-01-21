import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import {HomeComponent} from "./components/home/home.component";
import { RatingsComponent } from "./components/ratings/ratings.component"

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
