import { Component, OnInit } from '@angular/core';
import { Movie} from "../DOM/movie";
import { Watchlist} from "../DOM/watchlist";
import { MoviesComponent} from "../movies/movies.component";
import {MovieService} from "../movie.service";



@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  watchlist: Watchlist;
  watchlists: Watchlist[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.watchlist = new Watchlist();
  }

  onSubmit(){
    this.movieService.createWatchlist(this.watchlist).subscribe();
  }
}
