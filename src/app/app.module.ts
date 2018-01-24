import { Authguard } from './_guards/authguard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RatingsComponent } from './ratings/ratings.component';
import { RegisterComponent } from './register/register.component';

// Services
import { MessageService } from './message.service';
import { RatingsService } from './ratings.service';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MessagesComponent } from './messages/messages.component';
import { MovieService} from "./movie.service";
import { MoviesComponent } from './movies/movies.component';
import { FormBuilder} from "@angular/forms";
import {AuthenticationService} from "./authentication.service";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AutorizationInterceptorService} from "./autorization-interceptor.service";
import {UnauthorizedInterceptorService} from "./unautorized-interceptor.service";
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';

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
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [ RatingsService,
    MessageService,
    MovieService,
    FormBuilder,
    AuthenticationService,
    AlertService,
    Authguard,
    { provide: HTTP_INTERCEPTORS,
      useClass: AutorizationInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
