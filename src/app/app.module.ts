import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

// These libraries are used to simulate HTTP Requests from the web, by
//    Intercepting requests and serving them lcally.  Remove when using
//    real datastores
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { RatingsInMemoryService }  from './Mockups/ratings-in-memory.service';  // Delete this and replace with real source


// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RatingsComponent } from './ratings/ratings.component';
import { MovieInMemoryService} from "./Mockups/movie-in-memory.service";

// Services
import { MessageService } from './message.service';
import { RatingsService } from './ratings.service';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MessagesComponent } from './messages/messages.component';
import { MovieService} from "./movie.service";
import { MoviesComponent } from './movies/movies.component';
import { FormBuilder} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    RatingsComponent,
    MovieSearchComponent,
    MessagesComponent,
    MoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
    RatingsInMemoryService, { dataEncapsulation: false }
),
    HttpClientInMemoryWebApiModule.forRoot(
      MovieInMemoryService, { dataEncapsulation: false }
    )

  ],
  providers: [ RatingsService, MessageService, MovieService, FormBuilder ],
  bootstrap: [AppComponent]
})
export class AppModule { }
