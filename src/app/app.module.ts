
import { PagerService } from './pager.service';
import { Authguard } from './_guards/authguard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RatingsComponent } from './ratings/ratings.component';
import { RegisterComponent } from './register/register.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MoviesComponent } from './movies/movies.component';
import { WatchlistsComponent } from './watchlists/watchlists.component';

// Services
import { WatchlistService } from './watchlist.service';
import { MessageService } from './message.service';
import { RatingsService } from './ratings.service';
import { MovieService} from "./movie.service";
import { FormBuilder} from "@angular/forms";
import { AuthenticationService } from "./authentication.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AutorizationInterceptorService } from "./autorization-interceptor.service";
import { UnauthorizedInterceptorService } from "./unautorized-interceptor.service";
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
    MoviesComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AlertComponent,
    MovieDetailComponent,
    WatchlistsComponent
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
    WatchlistService,
    FormBuilder,
    AuthenticationService,
    AlertService,
    Authguard,
    PagerService,
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
