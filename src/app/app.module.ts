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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RatingsComponent } from './components/ratings/ratings.component';

// Services
import { MessageService } from './services/messageservice/message.service';
import { RatingsService } from './services/ratingsservice/ratings.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    RatingsComponent,
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
) ],
  providers: [ RatingsService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
