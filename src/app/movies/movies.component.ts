import { Count } from './../DOM/count';
import { PagerService} from '../pager.service';
import { Component, OnInit } from '@angular/core';

import { Movie } from '../DOM/movie';
import { MovieService} from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Watchlist} from '../DOM/watchlist';
import { WatchlistService} from "../watchlist.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  watchlist: Watchlist;
  movie: Movie;
  watchlists: Watchlist[];


  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  movies: Movie[];
   movieCount: Count;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private watchlistService: WatchlistService,
              private pagerService: PagerService) { }

  ngOnInit() {
    this.getMovieCount();
    this.getMovies();
    this.getWatchlists();
  }

  getMovieCount(): void {
    this.movieService.getMovieCount().subscribe(countValue => {this.movieCount = countValue;
      this.setPage(1); } );
  }

  getMovies(page: number = 1): void {
    this.movieService.getMovies(page).subscribe(movies => { this.movies = movies; }) ;
  }


  getWatchlists(): void {
    this.watchlistService.getWatchlists().subscribe(watchlists => this.watchlists = watchlists);
  }



  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.movieCount.count, page);

    this.getMovies(page);
}

  sortAsc() {
    this.movies.sort((m1, m2) => {
      if (m1.title > m2.title) {return 1; }
      if (m1.title === m2.title) {return 0; }
      if (m1.title < m2.title) {return -1; }
    }) ;
  }

  sortDesc() {
    this.movies.sort((m1, m2) => {
      if (m1.title > m2.title) {return -1; }
      if (m1.title === m2.title) {return 0; }
      if (m1.title < m2.title) {return 1; }
    }) ;
  }
}
